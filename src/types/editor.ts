export interface BaseItem {
  value: string;
  description: string;
  type: "variable" | "function";
  category: string;
}

export interface Variable extends BaseItem {
  type: "variable";
}

export interface Function extends BaseItem {
  type: "function";
}

export interface CompletionItem {
  type: "variable" | "function";
  label: string;
  detail?: string;
  info?: string;
  category: string;
}
