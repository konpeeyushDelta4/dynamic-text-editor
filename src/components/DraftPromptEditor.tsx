import React, { useEffect, useRef, useState, useMemo } from "react";
import { Editor, EditorState, CompositeDecorator, Modifier, SelectionState, ContentState, DraftHandleValue } from "draft-js";
import { styled } from "styled-components";
import { allItems } from "../utils/constants";
import { ContentBlockType, FindEntityCallback } from "../types/editor";

interface DraftPromptEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function findVariableEntities(contentBlock: ContentBlockType, callback: FindEntityCallback) {
  const text = contentBlock.getText();
  const regex = /\{\{[^}]+\}\}/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    callback(match.index, match.index + match[0].length);
  }
}

const VariableSpan: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="variable">{children}</span>;
};

const DraftPromptEditor: React.FC<DraftPromptEditorProps> = ({ value, onChange }) => {
  const decorator = useMemo(
    () =>
      new CompositeDecorator([
        {
          strategy: findVariableEntities,
          component: VariableSpan,
        },
      ]),
    []
  );

  const [editorState, setEditorState] = useState(() => {
    const contentState = ContentState.createFromText(value);
    return EditorState.createWithContent(contentState, decorator);
  });
  const [suggestions, setSuggestions] = useState<typeof allItems>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    const currentContent = editorState.getCurrentContent().getPlainText();
    if (value !== currentContent) {
      const contentState = ContentState.createFromText(value);
      const newEditorState = EditorState.createWithContent(contentState, decorator);
      const selection = editorState.getSelection();
      const stateWithSelection = EditorState.forceSelection(newEditorState, selection);
      setEditorState(stateWithSelection);
    }
  }, [value, decorator]);

  const handleBeforeInput = (char: string): DraftHandleValue => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      return "not-handled";
    }
    return "not-handled";
  };

  const handlePastedText = (text: string): DraftHandleValue => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const newContent = Modifier.replaceText(contentState, selection, text);
    const newEditorState = EditorState.push(editorState, newContent, "insert-characters");

    const newSelection = selection.merge({
      anchorOffset: selection.getStartOffset() + text.length,
      focusOffset: selection.getStartOffset() + text.length,
    });
    const stateWithSelection = EditorState.forceSelection(newEditorState, newSelection);

    handleEditorChange(stateWithSelection);
    return "handled";
  };

  const handleEditorChange = (newState: EditorState) => {
    const selection = newState.getSelection();
    const content = newState.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());
    const text = block.getText();
    const cursorPosition = selection.getStartOffset();

    const beforeCursor = text.slice(0, cursorPosition);
    const match = beforeCursor.match(/\{\{[\w._]*$/);

    if (match) {
      const searchText = match[0].replace(/^\{\{/, "").toLowerCase();
      const filtered = allItems.filter((item) => item.value.toLowerCase().includes(searchText));

      setSuggestions(filtered);
      setShowSuggestions(true);

      if (editorRef.current) {
        const editorBounds = editorRef.current.editor?.getBoundingClientRect();
        const caretBounds = getCaretCoordinates();
        if (editorBounds && caretBounds) {
          setSuggestionPosition({
            top: caretBounds.top - editorBounds.top + 24,
            left: caretBounds.left - editorBounds.left,
          });
        }
      }
    } else {
      setShowSuggestions(false);
    }

    setEditorState(newState);
    onChange(content.getPlainText());
  };

  const handleSuggestionClick = (suggestion: (typeof allItems)[0]) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const text = block.getText();
    const cursorPosition = selection.getStartOffset();

    const beforeCursor = text.slice(0, cursorPosition);
    const match = beforeCursor.match(/\{\{[\w._]*$/);

    if (match) {
      const start = cursorPosition - match[0].length;
      const newSelection = SelectionState.createEmpty(selection.getStartKey()).merge({
        anchorOffset: start,
        focusOffset: cursorPosition,
      });

      const newContent = Modifier.replaceText(contentState, newSelection, `{{${suggestion.value}}}`);

      const newState = EditorState.push(editorState, newContent, "insert-characters");
      const afterInsertSelection = newSelection.merge({
        anchorOffset: start + suggestion.value.length + 4,
        focusOffset: start + suggestion.value.length + 4,
      });
      const stateWithSelection = EditorState.forceSelection(newState, afterInsertSelection);

      setEditorState(stateWithSelection);
      setShowSuggestions(false);
      onChange(newContent.getPlainText());
    }
  };

  return (
    <EditorWrapper>
      <Editor ref={editorRef} editorState={editorState} onChange={handleEditorChange} handleBeforeInput={handleBeforeInput} handlePastedText={handlePastedText} placeholder="Enter your prompt here..." />
      {showSuggestions && (
        <SuggestionsBox style={{ top: suggestionPosition.top, left: suggestionPosition.left }}>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
              <SuggestionLabel>
                <span>{suggestion.value}</span>
                <SuggestionCategory>{suggestion.category}</SuggestionCategory>
              </SuggestionLabel>
              <SuggestionDescription>{suggestion.description}</SuggestionDescription>
            </SuggestionItem>
          ))}
        </SuggestionsBox>
      )}
    </EditorWrapper>
  );
};

function getCaretCoordinates(): { top: number; left: number } | null {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return null;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  return { top: rect.top, left: rect.left };
}

export default DraftPromptEditor;

// Styled components
const EditorWrapper = styled.div`
  position: relative;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  min-height: 300px;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: #1e293b;
  background: #ffffff;

  &:focus-within {
    border-color: #3b82f6;
  }

  .variable {
    background-color: #dbeafe;
    padding: 2px 4px;
    border-radius: 4px;
    color: #2563eb;
  }
`;

const SuggestionsBox = styled.div`
  position: absolute;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  min-width: 300px;
  max-width: 500px;
`;

const SuggestionItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;

  &:hover {
    background-color: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SuggestionLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;

  span {
    font-weight: 500;
    color: #0f172a;
  }
`;

const SuggestionCategory = styled.span`
  font-size: 0.875em;
  color: #64748b;
  background: #f8fafc;
  padding: 2px 8px;
  border-radius: 4px;
`;

const SuggestionDescription = styled.div`
  font-size: 0.875em;
  color: #475569;
`;
