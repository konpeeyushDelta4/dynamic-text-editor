# Dynamic Text Editor

A modern, flexible rich text editor built on top of Quill.js with React. This package provides two main ways to integrate the editor: a React Hook (`useDynamicTextEditor`) and a Component (`<DynamicTextEditor/>`).

## Installation

```bash
npm install dynamic-text-editor quill
# or
yarn add dynamic-text-editor quill
```

Make sure to include the required Quill.js CSS files in your project:

```typescript
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
```

## Features

- 🎨 Two themes: Snow and Bubble
- 🌓 Dark mode support
- 🛠 Customizable toolbar
- 📱 Responsive design
- 🎯 TypeScript support
- 🔄 Real-time content updates

## Usage

### 1. Hook Usage (`useDynamicTextEditor`)

The hook approach provides more flexibility and control over the editor's container.

```typescript
import { useDynamicTextEditor } from "dynamic-text-editor";

const MyEditor = () => {
  const { quillRef } = useDynamicTextEditor({
    theme: "snow", // or "bubble"
    toolbar: [["bold", "italic"]], // Customize toolbar options
    placeholder: "Start typing...",
    onChange: (value) => console.log(value),
    onFocus: () => console.log("Editor focused"),
    onBlur: () => console.log("Editor blurred"),
  });

  return <div ref={quillRef} className="min-h-[200px]" />;
};
```

#### Hook Props

| Prop        | Type                    | Default | Description            |
| ----------- | ----------------------- | ------- | ---------------------- |
| theme       | "snow" \| "bubble"      | "snow"  | Editor theme           |
| toolbar     | ToolbarConfig[]         | -       | Toolbar configuration  |
| placeholder | string                  | -       | Placeholder text       |
| onChange    | (value: string) => void | -       | Content change handler |
| onFocus     | () => void              | -       | Focus event handler    |
| onBlur      | () => void              | -       | Blur event handler     |

### 2. Component Usage (`<DynamicTextEditor/>`)

The component approach provides a more straightforward integration with additional styling options.

```typescript
import { DynamicTextEditor } from "dynamic-text-editor";
import type { DynamicTextEditorRef } from "dynamic-text-editor";

const MyEditor = () => {
  const editorRef = useRef<DynamicTextEditorRef>(null);

  return (
    <DynamicTextEditor
      ref={editorRef}
      theme="snow"
      toolbar={[["bold", "italic"]]}
      placeholder="Start typing..."
      onChange={(value) => console.log(value)}
      className="transition-all duration-200"
      containerClassName="min-h-[200px] rounded-lg"
    />
  );
};
```

#### Component Props

| Prop               | Type                    | Default | Description            |
| ------------------ | ----------------------- | ------- | ---------------------- |
| theme              | "snow" \| "bubble"      | "snow"  | Editor theme           |
| toolbar            | ToolbarConfig[]         | -       | Toolbar configuration  |
| placeholder        | string                  | -       | Placeholder text       |
| onChange           | (value: string) => void | -       | Content change handler |
| onFocus            | () => void              | -       | Focus event handler    |
| onBlur             | () => void              | -       | Blur event handler     |
| className          | string                  | -       | Editor class name      |
| containerClassName | string                  | -       | Container class name   |

## Toolbar Configuration

You can customize the toolbar by passing an array of options. Here's an example of a full-featured toolbar:

```typescript
const toolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"],
];
```

## Local Development

1. Clone the repository:

```bash
git clone <repository-url>
cd dynamic-text-editor-test
```

2. Install dependencies:

```bash
npm install
```

3. Update your package.json:

```json
{
  "dependencies": {
    "dynamic-text-editor": "^1.0.0", 
    "quill": "^1.3.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "vite": "^4.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

4. Run the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Styling

The editor supports both themes (Snow and Bubble) and can be customized using Tailwind CSS or regular CSS. Here's an example of custom styling:

```typescript
// Snow theme with dark mode
<DynamicTextEditor
  theme="snow"
  containerClassName={`
    min-h-[200px] rounded-lg
    ${isDarkMode
      ? "border-gray-600 [&_.ql-toolbar]:!bg-[#2c2d31] [&_.ql-toolbar]:!border-gray-600 [&_.ql-container]:!border-gray-600 [&_.ql-editor]:!text-gray-200 [&_.ql-editor]:!bg-[#25262b]"
      : "border-gray-200 [&_.ql-toolbar]:!bg-gray-50 [&_.ql-container]:!bg-white"
    }
  `}
/>

// Bubble theme with dark mode
<DynamicTextEditor
  theme="bubble"
  containerClassName={`
    min-h-[200px] rounded-lg
    ${isDarkMode
      ? "[&_.ql-editor]:!border-gray-600 [&_.ql-editor]:!bg-[#25262b] [&_.ql-editor]:!text-gray-200"
      : "[&_.ql-editor]:!border [&_.ql-editor]:!border-gray-200 [&_.ql-editor]:!rounded-lg [&_.ql-editor]:!bg-white"
    }
  `}
/>
```

