"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
const common_1 = require("./common");
const defaults_1 = require("./defaults");
let connection = vscode_languageserver_1.createConnection(vscode_languageserver_1.ProposedFeatures.all);
let documents = new vscode_languageserver_1.TextDocuments();
let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;
let workFolderOpened = false;
const defaultSettings = { import: "ДА" };
let globalSettings = defaultSettings;
let documentSettings = new Map();
let validator;
let Imports;
function GetFileRequest(nameInter) {
    if (workFolderOpened && globalSettings.import == "ДА")
        connection.sendRequest("getFile", nameInter);
}
exports.GetFileRequest = GetFileRequest;
function getTree() { return Imports; }
exports.getTree = getTree;
function getCurDoc(uri) {
    let curDocArr = documents.all().filter((value) => {
        return value.uri == uri;
    });
    return curDocArr.pop();
}
function getCurObj(uri) {
    let obj = undefined;
    for (const iterator of Imports) {
        if (iterator.uri == uri) {
            obj = iterator.object;
            break;
        }
    }
    return obj;
}
function FindObject(tdpp) {
    let uri = tdpp.textDocument.uri;
    let CBaseObject = undefined;
    let findObject = undefined;
    let token = undefined;
    let document = getCurDoc(tdpp.textDocument.uri);
    let tree = getCurObj(tdpp.textDocument.uri);
    if (tree != undefined) {
        let curPos = document.offsetAt(tdpp.position);
        token = tree.getCurrentToken(curPos);
        if (token !== undefined) {
            let objArr = tree.getActualChilds(curPos);
            let objects = new Array();
            for (const element of objArr) {
                if (element.isObject()) {
                    element.getChilds().forEach(child => {
                        if (child.Name === token.str)
                            objects.push(child);
                    });
                }
                if (element.Name === token.str) {
                    objects.push(element);
                }
            }
            if (objects.length > 1) {
                let minDistanse = token.range.start;
                for (const iterator of objects) {
                    let curDistanse = token.range.start - iterator.Range.end;
                    if (curDistanse < minDistanse) {
                        CBaseObject = iterator;
                        minDistanse = curDistanse;
                    }
                }
            }
            else if (objects.length == 1) {
                CBaseObject = objects.pop();
            }
            if (CBaseObject == undefined) {
                for (const iterator of Imports) {
                    if (iterator.uri != tdpp.textDocument.uri) {
                        let objArr = iterator.object.getActualChilds(0);
                        for (const element of objArr) {
                            if (element.Name === token.str) {
                                CBaseObject = element;
                                uri = iterator.uri;
                                break;
                            }
                        }
                    }
                    if (CBaseObject != undefined)
                        break;
                }
            }
        }
    }
    findObject = (CBaseObject != undefined) ? { object: CBaseObject, range: CBaseObject.Range, uri: uri } : undefined;
    return findObject;
}
connection.onInitialize((params) => {
    let capabilities = params.capabilities;
    workFolderOpened = (params.rootPath != null) ? true : false;
    hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    hasDiagnosticRelatedInformationCapability =
        !!(capabilities.textDocument &&
            capabilities.textDocument.publishDiagnostics &&
            capabilities.textDocument.publishDiagnostics.relatedInformation);
    return {
        capabilities: {
            textDocumentSync: documents.syncKind,
            // Включим поддержку автодополнения
            completionProvider: {
                resolveProvider: true,
                "triggerCharacters": ['.']
            },
            // Включим поддержку подсказок при наведении
            hoverProvider: true,
            // Включим поддержку перехода к определению (F12)
            definitionProvider: true
        }
    };
});
connection.onInitialized(() => {
    validator = new common_1.Validator();
    Imports = new Array();
    if (!workFolderOpened)
        connection.sendNotification("noRootFolder"); //не открыта папка, надо ругнуться
    if (hasConfigurationCapability) {
        connection.client.register(vscode_languageserver_1.DidChangeConfigurationNotification.type, undefined);
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders(_event => {
            connection.console.log('Workspace folder change event received.');
        });
    }
});
connection.onDidChangeConfiguration(change => {
    if (hasConfigurationCapability) {
        documentSettings.clear();
    }
    else {
        globalSettings = ((change.settings.RSLanguageServer || defaultSettings));
    }
    documents.all().forEach(validateTextDocument);
});
function getDocumentSettings(resource) {
    if (!hasConfigurationCapability) {
        return Promise.resolve(globalSettings);
    }
    let result = documentSettings.get(resource);
    if (!result) {
        result = connection.workspace.getConfiguration({
            scopeUri: resource,
            section: 'RSLanguageServer'
        });
        documentSettings.set(resource, result);
    }
    return result;
}
documents.onDidClose(e => {
    // let index = Imports.findIndex((value)=>{if (value[0] == e.document.uri) return true; else return false;})
    // if (index >= 0) Imports.splice(index, 1);
    // connection.console.log(`Close file: ${e.document.uri.toString()}`);
    // пока закомментил, Code нахрена то периодически сам закрывает файлы
    documentSettings.delete(e.document.uri);
});
documents.onDidChangeContent(change => {
    connection.console.log(`Парсинг файла: ${change.document.uri.toString()}`);
    validateTextDocument(change.document);
});
function validateTextDocument(textDocument) {
    return __awaiter(this, void 0, void 0, function* () {
        globalSettings = yield getDocumentSettings(textDocument.uri);
        let isPresent = false;
        for (let iterator of Imports) {
            if (iterator.uri == textDocument.uri) {
                iterator.object = new common_1.CBase(textDocument.getText(), 0);
                isPresent = true;
                break;
            }
        }
        if (!isPresent) {
            Imports.push({ uri: textDocument.uri, object: new common_1.CBase(textDocument.getText(), 0) });
        }
    });
}
connection.onDidChangeWatchedFiles(_change => {
    connection.console.log('We received an file change event');
});
connection.onCompletion((tdpp) => {
    validator.exec();
    let CompletionItemArray = new Array();
    let document = getCurDoc(tdpp.textDocument.uri);
    let obj = FindObject(tdpp);
    let curPos = document.offsetAt(tdpp.position);
    if (obj != undefined) { //нашли эту переменную
        if (obj.object.Type !== "variant") {
            let objClass;
            for (const iterator of Imports) {
                // objClass = iterator.object.RecursiveFind(obj.object.Type); //поищем в дереве что-то с таким названием, как тип этой переменной (предполагаем, что это должен быть класс)
                let objArr = iterator.object.getActualChilds(iterator.uri == tdpp.textDocument.uri ? curPos : 0);
                for (const objIter of objArr) {
                    if (objIter.Name == obj.object.Type) {
                        objClass = objIter;
                        break;
                    }
                }
                if (objClass != undefined)
                    break;
            }
            if (objClass != undefined /* && objClass.ObjKind === CompletionItemKind.Class */) {
                CompletionItemArray = objClass.ChildsCIInfo(true); //получим всю информацию о детях этого класса
                // else { //не нашли в открытом файле - будем искать дальше
                //     let Def = getDefaults();
                //     let ans = Def.find(obj.object.Type);
                //     if (ans != undefined) {
                //         CompletionItemArray = ans.ChildsCIInfo();
                //     }
            }
        }
    }
    else {
        Imports.forEach(element => {
            if (element.uri == tdpp.textDocument.uri)
                CompletionItemArray = CompletionItemArray.concat(element.object.ChildsCIInfo(false, curPos, true));
            else
                CompletionItemArray = CompletionItemArray.concat(element.object.ChildsCIInfo(true, 0, false));
        });
        CompletionItemArray = CompletionItemArray.concat(defaults_1.getCIInfoForArray(defaults_1.getDefaults())); //все дефолтные классы, функции и переменные
        CompletionItemArray = CompletionItemArray.concat(common_1.IntersCIInfo());
    }
    return CompletionItemArray;
});
connection.onCompletionResolve((item) => { return item; });
connection.onHover((tdpp) => {
    validator.exec();
    let hover = undefined;
    let document = getCurDoc(tdpp.textDocument.uri);
    let obj = FindObject(tdpp);
    let token = getCurObj(tdpp.textDocument.uri).getCurrentToken(document.offsetAt(tdpp.position));
    if (obj != undefined) {
        let CIInfo = obj.object.CIInfo;
        let comment = (CIInfo.documentation.toString().length > 0) ? ` \n\r${CIInfo.documentation.toString()}` : "";
        hover = {
            contents: `${CIInfo.detail}${comment}`,
            range: { start: document.positionAt(token.range.start),
                end: document.positionAt(token.range.end) }
        };
    }
    return hover != undefined ? hover : null;
});
connection.onDefinition((tdpp) => {
    validator.exec();
    let obj = FindObject(tdpp);
    let result = undefined;
    if (obj != undefined) {
        let document = getCurDoc(obj.uri);
        let range = obj.object.Range;
        let startPos = document.positionAt(range.start);
        let endPos = document.positionAt(range.start + obj.object.Name.length);
        result = vscode_languageserver_1.Location.create(obj.uri, {
            start: startPos,
            end: endPos
        });
    }
    return (result !== undefined) ? result : null; //getDefinitionLocation(tdpp, getCurDoc(tdpp.textDocument.uri));
});
documents.listen(connection);
connection.listen();
/*

export function getDefinitionLocation(tdpp: TextDocumentPositionParams, document: TextDocument): Definition {
    let result: Definition;
    let tree: CBase;
    let arr = getTree();
    for (const iterator of arr) {
        if (iterator.uri == tdpp.textDocument.uri) {
            tree = iterator.object;
            break;
        }
    }
    if (tree != undefined) {
        let curPos = document.offsetAt(tdpp.position);
        let curToken: [string, number, number] = tree.getCurrentToken(curPos);
        let obj: CBase;
        let objArr = tree.getActualChilds(curPos);
        objArr.forEach(element => {
            if (element.getName() == curToken[0]) obj = element;
        });
        if (obj == undefined) obj = tree.Find(curToken[0]);
        if (obj != undefined) {
            let range = obj.getRange();
            let startPos: Position = document.positionAt(range[0]);
            startPos.line++;
            result = Location.create(tdpp.textDocument.uri, {
                start: startPos,
                end: startPos
            })
        }
        else return null;
    }
    else return null;
    return result;
}
*/ 
//# sourceMappingURL=server.js.map