import { ContentBlock } from "draft-js";

export interface BaseItem {
  value: string;
  description: string;
  type: "variable" | "function";
  category: string;
  docs?: string;
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

export interface ContentBlockType extends ContentBlock {
  getText(): string;
}

export type FindEntityCallback = (start: number, end: number) => void;
