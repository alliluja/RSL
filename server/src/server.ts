import {
    createConnection,
    TextDocuments,
    TextDocument,
    ProposedFeatures,
    InitializeParams,
    DidChangeConfigurationNotification,
    CompletionItem,
    TextDocumentPositionParams,
    Hover,
    Location,
    Definition,
    Position,
} from 'vscode-languageserver';


import
{
    CBase,
} from './common';

import { IFAStruct, IRslSettings, IToken} from  './interfaces';
import { getDefaults, getCIInfoForArray } from './defaults';


let connection = createConnection(ProposedFeatures.all);
let documents                   : TextDocuments = new TextDocuments();
let hasConfigurationCapability  : boolean       = false;
let hasWorkspaceFolderCapability: boolean       = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;
let workFolderOpened            : boolean        = false;
const defaultSettings           : IRslSettings  = { import: "ДА" };
let globalSettings              : IRslSettings  = defaultSettings;
let documentSettings            : Map<string, Thenable<IRslSettings>> = new Map();
let Imports                     : Array<IFAStruct>;

export function GetFileRequest(nameInter:string) {
    if (workFolderOpened && globalSettings.import == "ДА")
        connection.sendRequest("getFile", nameInter);
}

export function getTree():Array<IFAStruct> {return Imports}

function getCurDoc(uri:string):TextDocument {
    let curDocArr = documents.all().filter((value)=>{
        return value.uri == uri;
    });
    return curDocArr.pop();
}

function getCurObj(uri:string):CBase {
    let obj:CBase = undefined;
    for (const iterator of Imports) {
        if (iterator.uri == uri) {
            obj = iterator.object;
            break;
        }
    }
    return obj;
}

function FindObject(tdpp: TextDocumentPositionParams): IFAStruct {
    let uri = tdpp.textDocument.uri;
    let CBaseObject  : CBase    = undefined;
    let findObject   : IFAStruct = undefined;
    let token        : IToken   = undefined;
    let document     : TextDocument = getCurDoc(tdpp.textDocument.uri);
    let tree         : CBase  = getCurObj(tdpp.textDocument.uri);
        if (tree != undefined) {
            let curPos = document.offsetAt(tdpp.position);
            token = tree.getCurrentToken(curPos);
            if (token !== undefined) {
                let objArr = tree.getActualChilds(curPos);
                let objects: Array<CBase> = new Array();
                for (const element of objArr) {
                    if (element.isObject())
                    {
                        element.getChilds().forEach(child=>{
                            if (child.Name === token.str) objects.push(child);
                        });
                    }
                    if (element.Name.toLowerCase() === token.str.toLowerCase()) {
                        objects.push(element);
                    }
                }
                if (objects.length > 1)
                {
                    let minDistanse:number = token.range.start;
                    for (const iterator of objects)
                    {
                        let curDistanse:number = token.range.start - iterator.Range.end;
                        if (curDistanse < minDistanse)
                        {
                            CBaseObject = iterator;
                            minDistanse = curDistanse;
                        }
                    }
                }
                else if (objects.length == 1)
                {
                    CBaseObject = objects.pop();
                }

                if (CBaseObject == undefined)
                {
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
                        if (CBaseObject != undefined) break;
                    }
                }
            }
        }
        findObject = (CBaseObject != undefined)?{object: CBaseObject, uri: uri}: undefined;
    return findObject;
}

connection.onInitialize((params: InitializeParams) => {
    let capabilities = params.capabilities;
    workFolderOpened = (params.rootPath != null)? true: false;
    
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
                "triggerCharacters": [ '.' ]
            },
            // Включим поддержку подсказок при наведении
            hoverProvider: true,
            // Включим поддержку перехода к определению (F12)
            definitionProvider: true
        }
    };
});

connection.onInitialized(() => {
    Imports   = new Array();
    
    if (!workFolderOpened) connection.sendNotification("noRootFolder"); //не открыта папка, надо ругнуться
    if (hasConfigurationCapability) {
        connection.client.register(
            DidChangeConfigurationNotification.type,
            undefined
        );
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
    } else {
        globalSettings = <IRslSettings>(
            (change.settings.RSLanguageServer || defaultSettings)
        );
    }

    documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<IRslSettings> {
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
    documentSettings.delete(e.document.uri);
});

documents.onDidChangeContent(change => {
    connection.console.log(`Парсинг файла: ${change.document.uri.toString()}`);
    validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
    globalSettings = await getDocumentSettings(textDocument.uri);

    let isPresent:boolean = false;
    for (let iterator of Imports) {
        if (iterator.uri == textDocument.uri) {
            iterator.object = new CBase(textDocument.getText(), 0);
            isPresent = true;
            break;
        }
    }
    if (!isPresent) {
        Imports.push({uri: textDocument.uri, object: new CBase(textDocument.getText(), 0)});
    }
}

connection.onDidChangeWatchedFiles(_change => {
    connection.console.log('We received an file change event');
});

function isNotCommentOrString(tdpp: TextDocumentPositionParams):boolean
{
    return true; //TODO: сделать проверку, что курсор не стоит в комментарии или в ""
}

connection.onCompletion((tdpp: TextDocumentPositionParams): CompletionItem[] => {
    let CompletionItemArray : Array<CompletionItem>  = new Array();
    let document            : TextDocument           = getCurDoc(tdpp.textDocument.uri);
    let obj                 : IFAStruct               = FindObject(tdpp);
    let curPos = document.offsetAt(tdpp.position);
    
    if (isNotCommentOrString(tdpp))
    {
        if (obj != undefined) {     //нашли эту переменную
            if (obj.object.Type !== "variant") {
                let objClass: CBase;
                for (const iterator of Imports) {
                    let objArr = iterator.object.getActualChilds(iterator.uri == tdpp.textDocument.uri? curPos: 0);
                    for (const objIter of objArr)
                    {
                        if (objIter.Name == obj.object.Type)
                        {
                            objClass = objIter;
                            break;
                        }
                    }
                    if (objClass != undefined) break;
                }
                if (objClass != undefined){
                    CompletionItemArray = objClass.ChildsCIInfo(true); //получим всю информацию о детях
                }
            }
        }
        else
        {
            Imports.forEach(element => {
                    let actualChilds = element.object.getActualChilds(element.uri == tdpp.textDocument.uri? curPos: 0);
                    for (const child of actualChilds) {
                        CompletionItemArray.push(child.CIInfo);
                    }
            });
            CompletionItemArray = CompletionItemArray.concat(getCIInfoForArray(getDefaults())); //все дефолтные классы, функции и переменные
        }
    }
    return CompletionItemArray;
});

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {return item;});

connection.onHover((tdpp: TextDocumentPositionParams): Hover => {
    let hover    : Hover        =  undefined;
    let document : TextDocument = getCurDoc(tdpp.textDocument.uri);
    let obj      : IFAStruct     = FindObject(tdpp);
    let token    : IToken       = getCurObj(tdpp.textDocument.uri).getCurrentToken(document.offsetAt(tdpp.position));
    if (obj != undefined) {
        let CIInfo = obj.object.CIInfo;
        let comment:string = (CIInfo.documentation.toString().length > 0)? ` \n\r${CIInfo.documentation.toString()}`: "";
        hover = {
            contents: `${CIInfo.detail}${comment}`,
            range : { start: document.positionAt(token.range.start),
                      end  : document.positionAt(token.range.end) }
        }
    }
    return hover != undefined? hover: null;
});

connection.onDefinition((tdpp: TextDocumentPositionParams) => {
    let obj     : IFAStruct     = FindObject(tdpp);
    let result  : Definition   = undefined;
    if (obj != undefined) {
            let document: TextDocument = getCurDoc(obj.uri);
            let range = obj.object.Range;
            let startPos: Position = document.positionAt(range.start);
            let endPos  : Position = document.positionAt(range.start + obj.object.Name.length);
            result = Location.create(obj.uri, {
                start: startPos,
                end  : endPos
            })
    }
    return (result !== undefined)? result: null;
});

documents.listen(connection);

connection.listen();