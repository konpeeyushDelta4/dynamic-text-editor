import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { color } from "@uiw/react-codemirror";

export const promptTheme: Extension = EditorView.theme({
  "&": {
    fontSize: "14px",
    height: "100%",
    width: "100%",
  },
  ".cm-variable-wrapper": {
    display: "inline-block",
    borderRadius: "4px",
    padding: "2px 0",
    margin: "0 2px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
  },
  ".cm-variable-bracket": {
    color: "#64748b !important",
  },
  // Variable prefix styles
  ".cm-variable-prefix.Flow": {
    color: "#2563eb !important",
  },
  ".cm-variable-prefix.Session": {
    color: "#7c3aed !important",
  },
  ".cm-variable-prefix.Visitor": {
    color: "#059669 !important",
  },
  ".cm-variable-prefix.Contact": {
    color: "#dc2626 !important",
  },
  // Variable value styles
  ".cm-variable-value.Flow": {
    color: "#2563eb !important",
    background: "#dbeafe",
    padding: "2px 4px",
    borderRadius: "3px",
  },
  ".cm-variable-value.Session": {
    color: "#7c3aed !important",
    background: "#ede9fe",
    padding: "2px 4px",
    borderRadius: "3px",
  },
  ".cm-variable-value.Visitor": {
    color: "#059669 !important",
    background: "#d1fae5",
    padding: "2px 4px",
    borderRadius: "3px",
  },
  ".cm-variable-value.Contact": {
    color: "#dc2626 !important",
    background: "#fee2e2",
    padding: "2px 4px",
    borderRadius: "3px",
  },
  // Function styles
  ".cm-function.Equality": {
    color: "#0284c7 !important",
    background: "#e0f2fe",
    padding: "2px 4px",
    borderRadius: "3px",
  },
  ".cm-function.Logical": {
    color: "#7c2d12 !important",
    background: "#ffedd5",
    padding: "2px 4px",
    borderRadius: "3px",
  },
  ".cm-function.String": {
    color: "#4338ca !important",
    background: "#e0e7ff",
    padding: "2px 4px",
    borderRadius: "3px",
  },
  ".cm-parameter": {
    color: "#475569 !important",
    fontStyle: "italic",
  },
  ".cm-string": {
    color: "#166534 !important",
  },
});
