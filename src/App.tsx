import React, { useState } from "react";
import AIPromptEditor from "./components/AIPromptEditor";
import "./App.css";

function App() {
  const [promptValue, setPromptValue] = useState<string>("Hello {{VISITOR.name}}, welcome to {{CONTACT.company}}!");

  const handlePromptChange = (value: string) => {
    setPromptValue(value);
  };

  return (
    <div className="app-container">
      <h1 className="editor-title">AI Prompt Editor</h1>
      <AIPromptEditor value={promptValue} onChange={handlePromptChange} />
    </div>
  );
}

export default App;
