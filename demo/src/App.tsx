import { useState } from "react";
import { DraftPromptEditor } from "../../src";
import { defaultSuggestions } from "../../src/utils/constants";
import "../../src/App.css";

function App() {
  const [promptValue, setPromptValue] = useState<string>("Hello {{VISITOR.name}}, welcome to {{CONTACT.company}}!");

  return (
    <div className="app-container">
      <h1>Dynamic Prompt Editor Demo</h1>
      <section className="editor-section">
        <h2>Basic Usage</h2>
        <DraftPromptEditor value={promptValue} onChange={setPromptValue} suggestions={defaultSuggestions} />
      </section>
    </div>
  );
}

export default App;
