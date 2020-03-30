import { CBase } from './common';
import {
  CompletionItemKind,
  TextDocument,
  SymbolInformation
} from 'vscode-languageserver';
import { fromCompletionItemKind, convertIRange } from './utils';

function getSymbolName(node: CBase) {
  const nodeType = node.ObjKind !== CompletionItemKind.Class ? node.Type : '';
  const typeDelim = nodeType ? ': ' : '';

  return `${node.Name}${typeDelim}${nodeType}`;
}

export function getSymbols(
  document: TextDocument,
  node: CBase,
  parent?: CBase
): (SymbolInformation | undefined)[] {
  let info: SymbolInformation | undefined;

  try {
    info = {
      kind: fromCompletionItemKind(node.ObjKind),
      location: {
        range: convertIRange(document, node.Range),
        uri: document.uri
      },
      name: getSymbolName(node),
      containerName: parent?.Name
    };
  } catch (e) {
    // do not show not supported node kind
  }
  console.log(JSON.stringify(info));

  const innerSymbols = node.getChilds().reduce((symbols, child) => {
    if (child instanceof CBase) {
      const syms = getSymbols(document, child);
      symbols.push(...syms);
    }
    return symbols;
  }, []);

  return [info, ...innerSymbols];
}
