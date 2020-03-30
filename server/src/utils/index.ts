import {
  CompletionItemKind,
  SymbolKind,
  TextDocument,
  Range
} from 'vscode-languageserver';
import { IRange } from '../interfaces';

export function convertIRange(doc: TextDocument, rng: IRange): Range {
  return {
    start: doc.positionAt(rng.start),
    end: doc.positionAt(rng.end)
  };
}

export function fromCompletionItemKind(k: CompletionItemKind): SymbolKind {
  switch (k) {
    // case CompletionItemKind.Text: return SymbolKind.Text;
    case CompletionItemKind.Method:
      return SymbolKind.Method;
    case CompletionItemKind.Function:
      return SymbolKind.Function;
    case CompletionItemKind.Constructor:
      return SymbolKind.Constructor;
    case CompletionItemKind.Field:
      return SymbolKind.Field;
    case CompletionItemKind.Variable:
      return SymbolKind.Variable;
    case CompletionItemKind.Class:
      return SymbolKind.Class;
    case CompletionItemKind.Interface:
      return SymbolKind.Interface;
    case CompletionItemKind.Module:
      return SymbolKind.Module;
    case CompletionItemKind.Property:
      return SymbolKind.Property;
    // case CompletionItemKind.Unit: return SymbolKind.Unit;
    // case CompletionItemKind.Value: return SymbolKind.Value;
    case CompletionItemKind.Enum:
      return SymbolKind.Enum;
    // case CompletionItemKind.Keyword: return SymbolKind.Keyword;
    // case CompletionItemKind.Snippet: return SymbolKind.Snippet;
    // case CompletionItemKind.Color: return SymbolKind.Color;
    case CompletionItemKind.File:
      return SymbolKind.File;
    // case CompletionItemKind.Reference: return SymbolKind.Reference;
    // case CompletionItemKind.Folder: return SymbolKind.Folder;
    case CompletionItemKind.EnumMember:
      return SymbolKind.EnumMember;
    case CompletionItemKind.Constant:
      return SymbolKind.Constant;
    case CompletionItemKind.Struct:
      return SymbolKind.Struct;
    case CompletionItemKind.Event:
      return SymbolKind.Event;
    case CompletionItemKind.Operator:
      return SymbolKind.Operator;
    case CompletionItemKind.TypeParameter:
      return SymbolKind.TypeParameter;
    default:
      throw new Error(`not supported CompletionItemKind ${k}`);
  }
}
