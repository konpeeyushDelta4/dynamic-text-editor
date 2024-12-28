import { BaseItem } from "../types/editor";

export const allItems: BaseItem[] = [
  // Equality and Comparison Functions
  {
    value: "eq a='value1' b='value2'",
    description: "Checks if two values are equal",
    type: "function",
    category: "Equality and Comparison",
    docs: "https://docs.example.com/eq",
  },
  {
    value: "gt a='value1' b='value2'",
    description: "Checks if first value is greater than second",
    type: "function",
    category: "Equality and Comparison",
    docs: "https://docs.example.com/eq",
  },
  {
    value: "lt a='value1' b='value2'",
    description: "Checks if first value is less than second",
    type: "function",
    category: "Equality and Comparison",
    docs: "https://docs.example.com/eq",
  },

  // Logical Operations
  {
    value: "and arg1='value1' arg2='value2'",
    description: "Performs logical AND operation between multiple arguments",
    type: "function",
    category: "Logical Operations",
    docs: "https://docs.example.com/eq",
  },
  {
    value: "or arg1='value1' arg2='value2'",
    description: "Performs logical OR operation between multiple arguments",
    type: "function",
    category: "Logical Operations",
    docs: "https://docs.example.com/eq",
  },
  {
    value: "not value='true'",
    description: "Performs logical NOT operation on the value",
    type: "function",
    category: "Logical Operations",
    docs: "https://docs.example.com/eq",
  },

  // String Manipulation
  {
    value: "uppercase str='hello'",
    description: "Converts string to uppercase",
    type: "function",
    category: "String Manipulation",
    docs: "https://docs.example.com/eq",
  },
  {
    value: "lowercase str='HELLO'",
    description: "Converts string to lowercase",
    type: "function",
    category: "String Manipulation",
    docs: "https://docs.example.com/eq",
  },
  {
    value: "trim str='   Hello   '",
    description: "Removes whitespace from both ends of a string",
    type: "function",
    category: "String Manipulation",
    docs: "https://docs.example.com/eq",
  },

  // Flow Variables
  {
    value: "Flow.last_response",
    description: "Gets the last response from the flow",
    type: "variable",
    category: "Flow",
  },
  {
    value: "FLOW.last_utterance",
    description: "Gets the last utterance from the flow",
    type: "variable",
    category: "Flow",
  },
  {
    value: "FLOW.{variable_of_your_choice}",
    description: "Access any custom flow variable",
    type: "variable",
    category: "Flow",
  },

  // Session Variables
  {
    value: "SESSION.status",
    description: "Current session status",
    type: "variable",
    category: "Session",
  },

  // Visitor Variables
  {
    value: "VISITOR.name",
    description: "Name of the current visitor",
    type: "variable",
    category: "Visitor",
  },
  {
    value: "VISITOR.region",
    description: "Region of the current visitor",
    type: "variable",
    category: "Visitor",
  },
  {
    value: "VISITOR.language",
    description: "Preferred language of the visitor",
    type: "variable",
    category: "Visitor",
  },

  // Contact Variables
  {
    value: "CONTACT.name",
    description: "Contact's full name",
    type: "variable",
    category: "Contact",
  },
  {
    value: "CONTACT.email",
    description: "Contact's email address",
    type: "variable",
    category: "Contact",
  },
  {
    value: "CONTACT.phone",
    description: "Contact's phone number",
    type: "variable",
    category: "Contact",
  },
  {
    value: "CONTACT.company",
    description: "Contact's company name",
    type: "variable",
    category: "Contact",
  },
  {
    value: "CONTACT.country",
    description: "Contact's country",
    type: "variable",
    category: "Contact",
  },
  {
    value: "CONTACT.city",
    description: "Contact's city",
    type: "variable",
    category: "Contact",
  },
  {
    value: "CONTACT.region",
    description: "Contact's region",
    type: "variable",
    category: "Contact",
  },
  {
    value: "CONTACT.tags",
    description: "Tags associated with the contact",
    type: "variable",
    category: "Contact",
  },
];
