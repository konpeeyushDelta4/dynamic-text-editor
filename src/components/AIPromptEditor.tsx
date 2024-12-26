import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { styled } from "styled-components";
import { autocompletion } from "@codemirror/autocomplete";
import { createCompletions } from "../utils/completions";
import { promptLanguageSupport } from "../utils/language";
import { promptTheme } from "../utils/theme";

const EditorWrapper = styled.div`
  .cm-editor {
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 300px;
    font-family: "Monaco", "Menlo", monospace;
  }

  .cm-content {
    padding: 10px;
  }

  .cm-line {
    padding: 0 4px;
  }

  /* Variables */
  .cm-variable.Flow,
  .cm-property.Flow {
    color: #2563eb !important;
    background: #dbeafe;
    padding: 2px 4px;
    border-radius: 3px;
  }

  .cm-variable.Session,
  .cm-property.Session {
    color: #7c3aed !important;
    background: #ede9fe;
    padding: 2px 4px;
    border-radius: 3px;
  }

  .cm-variable.Visitor,
  .cm-property.Visitor {
    color: #059669 !important;
    background: #d1fae5;
    padding: 2px 4px;
    border-radius: 3px;
  }

  .cm-variable.Contact,
  .cm-property.Contact {
    color: #dc2626 !important;
    background: #fee2e2;
    padding: 2px 4px;
    border-radius: 3px;
  }

  /* Functions */
  .cm-function.Equality {
    color: #0284c7 !important;
    background: #e0f2fe;
    padding: 2px 4px;
    border-radius: 3px;
  }

  .cm-function.Logical {
    color: #7c2d12 !important;
    background: #ffedd5;
    padding: 2px 4px;
    border-radius: 3px;
  }

  .cm-function.String {
    color: #4338ca !important;
    background: #e0e7ff;
    padding: 2px 4px;
    border-radius: 3px;
  }

  /* Other syntax elements */
  .cm-bracket {
    color: #64748b !important;
  }

  .cm-parameter {
    color: #475569 !important;
    font-style: italic;
  }

  .cm-string {
    color: #166534 !important;
  }

  /* Completion popup styling */
  .cm-tooltip-autocomplete {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    max-height: 300px;
    overflow-y: auto;
  }

  .cm-tooltip-autocomplete ul li {
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-bottom: 1px solid #f1f5f9;
  }

  .cm-tooltip-autocomplete ul li:last-child {
    border-bottom: none;
  }

  .cm-tooltip-autocomplete ul li[aria-selected] {
    background-color: #f8fafc;
  }

  .cm-completionLabel {
    color: #1e293b;
    font-weight: 500;
  }

  .cm-completionDetail {
    color: #64748b;
    font-size: 0.9em;
  }

  .cm-completionInfo {
    color: #475569;
    font-size: 0.9em;
    margin-top: 2px;
  }

  /* Dynamic variable styling */
  .variableStart,
  .variableEnd {
    color: #64748b !important;
  }

  /* Variable wrapper styling */
  .cm-variable-wrapper {
    background: #bfdfff;
    border: 1px solid #e2e8f0;
  }

  /* Variable parts styling */
  .cm-variable-bracket {
    color: #64748b !important;
  }

  /* Variable prefix styling */
  .cm-variable-prefix.Flow {
    color: #2563eb !important;
  }

  .cm-variable-prefix.Session {
    color: #7c3aed !important;
  }

  .cm-variable-prefix.Visitor {
    color: #059669 !important;
  }

  .cm-variable-prefix.Contact {
    color: #dc2626 !important;
  }

  /* Variable value styling */
  .cm-variable-value.Flow {
    color: #2563eb !important;
    background: #dbeafe;
    padding: 2px 4px;
    border-radius: 3px;
  }

  /* Function styling */
  .function.Equality {
    color: #0284c7 !important;
    background: #e0f2fe;
    padding: 2px 4px;
    border-radius: 3px;
  }

  .function.Logical {
    color: #7c2d12 !important;
    background: #ffedd5;
    padding: 2px 4px;
    border-radius: 3px;
  }

  .function.String {
    color: #4338ca !important;
    background: #e0e7ff;
    padding: 2px 4px;
    border-radius: 3px;
  }
`;

interface AIPromptEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const AIPromptEditor: React.FC<AIPromptEditorProps> = ({ value, onChange }) => {
  const extensions = React.useMemo(
    () => [
      promptLanguageSupport(),
      promptTheme,
      autocompletion({
        override: [createCompletions()],
        defaultKeymap: true,
        maxRenderedOptions: 50,
        activateOnTyping: true,
      }),
    ],
    []
  );

  return (
    <EditorWrapper>
      <CodeMirror value={value} onChange={onChange} extensions={extensions} theme="light" height="300px" autoFocus={true} />
    </EditorWrapper>
  );
};

export default AIPromptEditor;
