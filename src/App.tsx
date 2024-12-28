import React, { useState } from "react";
import MonacoPromptEditor from "./components/MonacoPromptEditor";
import AIPromptEditor from "./components/AIPromptEditor";
import DraftPromptEditor from "./components/DraftPromptEditor";
import "./App.css";

function App() {
  const [promptValue, setPromptValue] = useState<string>("Hello {{VISITOR.name}}, welcome to {{CONTACT.company}}!");

  const handlePromptChange = (value: string | undefined) => {
    if (value !== undefined) {
      setPromptValue(value);
    }
  };

  return (
    <div className="app-container">
      <h1 className="editor-title">AI Prompt Editor</h1>

      <section className="editor-section">
        <h2>Monaco Editor Version</h2>
        <MonacoPromptEditor value={promptValue} onChange={handlePromptChange} />
      </section>

      <section className="editor-section">
        <h2>CodeMirror Version</h2>
        <AIPromptEditor value={promptValue} onChange={handlePromptChange} />
      </section>

      <section className="editor-section">
        <h2>DraftJS Version</h2>
        <DraftPromptEditor value={promptValue} onChange={handlePromptChange} />
      </section>
    </div>
  );
}

export default App;
