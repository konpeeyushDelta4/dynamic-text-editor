import { useState } from "react";
import DraftPromptEditor from "./components/DraftPromptEditor";
// import { BaseEditorItem } from "./types/editor";
import "./App.css";
import { defaultSuggestions } from "./utils/constants";

const exampleSuggestions = defaultSuggestions;

function App() {
  const [promptValue, setPromptValue] = useState<string>("Hello {{VISITOR.name}}, welcome to {{CONTACT.company}}!");

  // Custom renderer example
  // const renderCustomItem = (item: BaseEditorItem, isSelected: boolean) => (
  //   <div
  //     style={{
  //       padding: "8px",
  //       backgroundColor: isSelected ? "#f0f9ff" : "transparent",
  //     }}
  //   >
  //     <div style={{ fontWeight: "bold" }}>{item.label}</div>
  //     <div style={{ fontSize: "0.9em", color: "#666" }}>{item.description}</div>
  //   </div>
  // );

  return (
    <div className="app-container">
      <h1>Dynamic Prompt Editor</h1>

      <section className="editor-section">
        <h2>Basic Usage</h2>
        <DraftPromptEditor value={promptValue} onChange={setPromptValue} suggestions={exampleSuggestions} />
      </section>

      <section className="editor-section">
        <h2>Custom Styling</h2>
        <DraftPromptEditor
          value={promptValue}
          onChange={setPromptValue}
          suggestions={exampleSuggestions}
          className="custom-editor"
          classNames={{
            root: "custom-editor",
            variable: "custom-editor__variable",
            suggestions: "custom-editor__suggestions",
            suggestion: "custom-editor__suggestion",
            suggestionSelected: "custom-editor__suggestion--selected",
            category: "custom-editor__category",
            description: "custom-editor__description",
          }}
        />
      </section>

      <section className="editor-section">
        <h2>Custom Rendering</h2>
        <DraftPromptEditor value={promptValue} onChange={setPromptValue} suggestions={exampleSuggestions} />
      </section>
    </div>
  );
}

export default App;
