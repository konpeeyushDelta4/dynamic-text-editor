import React, { useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { styled } from "styled-components";
import { allItems } from "../utils/constants";
import { IEditorModel, IPosition } from "../types/monaco";
import DocsIcon from "./icons/DocsIcon";

interface MonacoPromptEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

const MonacoPromptEditor: React.FC<MonacoPromptEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;

    // Disable context menu
    editor.onContextMenu((e) => {
      e.event.preventDefault();
      e.event.stopPropagation();
    });

    // Register completion provider
    monaco.languages.register({ id: "promptLanguage" });
    monaco.languages.setMonarchTokensProvider("promptLanguage", {
      tokenizer: {
        root: [
          [/\{\{/, "variable.bracket"],
          [/\}\}/, "variable.bracket"],
          [/(FLOW|SESSION|VISITOR|CONTACT)\./, "variable.prefix"],
          [/\b(eq|gt|lt|and|or|not|uppercase|lowercase|trim)\b/, "function"],
          [/'[^']*'/, "string"],
          [/[\w._]+/, "variable.value"],
        ],
      },
    });

    // Enhanced completion provider
    monaco.languages.registerCompletionItemProvider("promptLanguage", {
      provideCompletionItems: (model: IEditorModel, position: IPosition) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const match = textUntilPosition.match(/\{\{[\w._]*$/);
        if (!match) return { suggestions: [] };

        const suggestions = allItems.map((item) => ({
          label: {
            label: item.value,
            description: item.category,
            detail: item.description,
          },
          kind: item.type === "function" ? monaco.languages.CompletionItemKind.Function : monaco.languages.CompletionItemKind.Variable,
          insertText: item.value + (textUntilPosition.endsWith("}}") ? "" : "}}"),
          detail: `${item.description} ${item.docs ? "📄" : ""}`,
          documentation: {
            value: `
**${item.value}**

${item.description}

${item.docs ? `[View Documentation](${item.docs})` : ""}
            `.trim(),
            isTrusted: true,
          },
          command: item.docs
            ? {
                id: "editor.action.openLink",
                title: "Open Documentation",
                arguments: [item.docs],
              }
            : undefined,
          sortText: item.value.toLowerCase().startsWith(match[0].replace("{{", "")) ? "0" : "1",
        }));

        return { suggestions };
      },
      triggerCharacters: ["{", "."],
    });

    // Custom theme
    monaco.editor.defineTheme("promptTheme", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "variable.bracket", foreground: "64748b" },
        { token: "variable.prefix.flow", foreground: "2563eb" },
        { token: "variable.prefix.session", foreground: "7c3aed" },
        { token: "variable.prefix.visitor", foreground: "059669" },
        { token: "variable.prefix.contact", foreground: "dc2626" },
        { token: "function", foreground: "0284c7" },
        { token: "string", foreground: "166534" },
      ],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#1e293b",
        "editor.lineHighlightBackground": "#f8fafc",
        "editorSuggestWidget.background": "#ffffff",
        "editorSuggestWidget.border": "#e2e8f0",
        "editorSuggestWidget.selectedBackground": "#f1f5f9",
      },
    });
  };

  return (
    <EditorWrapper>
      <Editor
        height="300px"
        defaultLanguage="promptLanguage"
        theme="promptTheme"
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          lineNumbers: "off",
          folding: false,
          glyphMargin: false,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          suggestOnTriggerCharacters: true,
          quickSuggestions: {
            other: true,
            comments: false,
            strings: true,
          },
          wordBasedSuggestions: "off",
          parameterHints: { enabled: true },
          suggest: {
            showIcons: true,
            showStatusBar: true,
            preview: true,
            previewMode: "prefix",
            maxVisibleSuggestions: 12,
            insertMode: "insert",
            snippetsPreventQuickSuggestions: false,
            showInlineDetails: true,
          },
          contextmenu: false,
        }}
      />
    </EditorWrapper>
  );
};

export default MonacoPromptEditor;

const EditorWrapper = styled.div`
  .monaco-editor {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }

  .monaco-editor.focused {
    border-color: #3b82f6;
  }

  /* Enhanced suggestion widget styling */
  .monaco-editor .suggest-widget {
    border: none !important;
    box-shadow: 0 8px 16px -4px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.1);
    border-radius: 8px;
    overflow: hidden;
    min-width: 380px !important;
  }

  .monaco-editor .suggest-widget .monaco-list {
    background: #ffffff;
  }

  .monaco-editor .suggest-widget .monaco-list-row {
    padding: 8px 12px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    min-height: 44px;
  }

  .monaco-editor .suggest-widget .monaco-list-row.focused {
    background-color: #f1f5f9 !important;
  }

  .monaco-editor .suggest-widget .monaco-list-row:hover {
    background-color: #f8fafc !important;
  }

  /* Suggestion item styling */
  .monaco-editor .suggest-widget .monaco-list-row .suggest-icon {
    width: 20px;
    height: 20px;
    margin-top: 2px;
  }

  .monaco-editor .suggest-widget .monaco-list-row .details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .monaco-editor .suggest-widget .monaco-list-row .label-name {
    font-size: 0.9375rem;
    font-weight: 500;
    color: #1e293b;
    line-height: 1.4;
  }

  .monaco-editor .suggest-widget .monaco-list-row .label-description {
    font-size: 0.8125rem;
    color: #64748b;
    line-height: 1.4;
  }

  .monaco-editor .suggest-widget .monaco-list-row .label-detail {
    font-size: 0.8125rem;
    color: #94a3b8;
    margin-top: 2px;
    line-height: 1.4;
  }

  .monaco-editor .suggest-widget .monaco-list-row .docs-button {
    display: flex;
    align-items: center;
    padding: 4px;
    color: #3b82f6;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: auto;
    opacity: 0;
    transition: all 0.2s;
  }

  .monaco-editor .suggest-widget .monaco-list-row:hover .docs-button {
    opacity: 1;
  }

  .monaco-editor .suggest-widget .monaco-list-row .docs-button:hover {
    background-color: #eff6ff;
  }

  /* Documentation hover styles */
  .monaco-editor .monaco-hover {
    border: none !important;
    box-shadow: 0 8px 16px -4px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.1);
    border-radius: 8px;
    padding: 12px;
  }

  .monaco-editor .monaco-hover .markdown-hover {
    font-size: 0.875rem;
    color: #1e293b;
  }

  .monaco-editor .monaco-hover .markdown-hover strong {
    color: #0f172a;
  }

  .monaco-editor .monaco-hover .markdown-hover a {
    color: #3b82f6;
    text-decoration: none;
  }

  .monaco-editor .monaco-hover .markdown-hover a:hover {
    text-decoration: underline;
  }

  /* Dynamic content styling */
  .monaco-editor .variable-bracket {
    color: #64748b !important;
    font-weight: 500;
  }

  .monaco-editor .variable-prefix {
    font-weight: 500;
  }

  .monaco-editor .flow-variable {
    color: #2563eb !important;
    background: #dbeafe;
    padding: 2px 4px;
    border-radius: 3px;
  }

  .monaco-editor .session-variable {
    color: #7c3aed !important;
    background: #ede9fe;
    padding: 2px 4px;
    border-radius: 3px;
  }

  .monaco-editor .visitor-variable {
    color: #059669 !important;
    background: #d1fae5;
    padding: 2px 4px;
    border-radius: 3px;
  }

  .monaco-editor .contact-variable {
    color: #dc2626 !important;
    background: #fee2e2;
    padding: 2px 4px;
    border-radius: 3px;
  }
`;
