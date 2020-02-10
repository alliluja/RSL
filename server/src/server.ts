/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

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
} from 'vscode-languageserver';


import
{
    counterReset,
    getCIArr,
    getHover,
    getDefinitionLocation,
	CASTBase,
    Validator,
	IFAStruct
} from './common';

// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. The text document manager
// supports full document sync only
let documents: TextDocuments = new TextDocuments();

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;
let workFolderOpened:boolean = false;
let Imports:Array<IFAStruct>;
let curDoc: TextDocument;
let tree: CASTBase = undefined;
const defaultSettings: RSLSettings = { import: "ДА" };
let globalSettings: RSLSettings = defaultSettings;
let validator:Validator;

// Cache the settings of all open documents
let documentSettings: Map<string, Thenable<RSLSettings>> = new Map();

export function GetFileRequest(nameInter:string) {
	if (workFolderOpened && globalSettings.import == "ДА") connection.sendRequest("getFile", nameInter);
}

connection.onInitialize((params: InitializeParams) => {
	let capabilities = params.capabilities;
	workFolderOpened = (params.rootPath != null)? true: false;
    // Does the client support the `workspace/configuration` request?
    // If not, we will fall back using global settings
    hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    hasDiagnosticRelatedInformationCapability =
        !!(capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation);
    return {
        capabilities: {
            textDocumentSync: documents.syncKind,
            // Tell the client that the server supports code completion
            completionProvider: {
				resolveProvider: true,
				"triggerCharacters": [ '.' ]
			},
			hoverProvider: true,
			definitionProvider: true
        }
    };
});

connection.onInitialized(() => {
    validator = new Validator();
    Imports   = new Array();
    
	if (!workFolderOpened) connection.sendNotification("noRootFolder");
    if (hasConfigurationCapability) {
        // Register for all configuration changes.
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

// The settings
interface RSLSettings {
	// maxNumberOfProblems: number;
	import: string;
}



connection.onDidChangeConfiguration(change => {
    if (hasConfigurationCapability) {
        // Reset all cached document settings
        documentSettings.clear();
    } else {
        globalSettings = <RSLSettings>(
            (change.settings.RSLanguageServer || defaultSettings)
        );
    }

    // Revalidate all open text documents
    documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<RSLSettings> {
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

// Only keep settings for open documents
documents.onDidClose(e => {
	// let index = Imports.findIndex((value)=>{if (value[0] == e.document.uri) return true; else return false;})
	// if (index >= 0) Imports.splice(index, 1);
	// connection.console.log(`Close file: ${e.document.uri.toString()}`);
    documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	connection.console.log(`Open file: ${change.document.uri.toString()}`);
	validateTextDocument(change.document);
});


export function getTree():Array<IFAStruct> {return Imports}


async function validateTextDocument(textDocument: TextDocument): Promise<void> {
    curDoc = textDocument;
    // In this simple example we get the settings for every validate run.
	globalSettings = await getDocumentSettings(textDocument.uri);
	counterReset();
	if (tree == undefined) {
		tree = new CASTBase(textDocument.getText());
		Imports.push({uri: textDocument.uri, object: tree});
	}
	else {
		let isPresent:boolean = false;
		for (let iterator of Imports) {
			if (iterator.uri == textDocument.uri) {
				iterator.object = new CASTBase(textDocument.getText());
				isPresent = true;
				break;
			}
		}
		if (!isPresent) {
			tree = new CASTBase(textDocument.getText());
			Imports.push({uri: textDocument.uri, object: tree});
		}
	}
/*
    // The validator creates diagnostics for all uppercase words length 2 and more
    let text = textDocument.getText();
    let pattern = /\b[A-Z_-\d]{2,}\b/g;
    let m: RegExpExecArray | null;

    let problems = 0;
    let diagnostics: Diagnostic[] = [];
    while ((m = pattern.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        let diagnosic: Diagnostic = {
            severity: DiagnosticSeverity.Warning,
            range: {
                start: textDocument.positionAt(m.index),
                end: textDocument.positionAt(m.index + m[0].length)
            },
            message: `${m[0]} Р’СЃРµ РІ РІРµСЂС…РЅРµРј СЂРµРіРёСЃС‚СЂРµ.`,
            source: 'ex'
        };
        if (hasDiagnosticRelatedInformationCapability) {
            diagnosic.relatedInformation = [
                {
                    location: {
                        uri: textDocument.uri,
                        range: Object.assign({}, diagnosic.range)
                    },
                    message: 'РљР°РєР°СЏ-С‚Рѕ С…СЂРµРЅСЊ'
                },
                {
                    location: {
                        uri: textDocument.uri,
                        range: Object.assign({}, diagnosic.range)
                    },
                    message: 'Particularly for names'
                }
            ];
        }
        diagnostics.push(diagnosic);
    }

    // Send the computed diagnostics to VSCode.
     connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });*/
}

connection.onDidChangeWatchedFiles(_change => {
    // Monitored files have change in VSCode
    connection.console.log('We received an file change event');
});



// This handler provides the initial list of the completion items.
connection.onCompletion(
    (tdpp: TextDocumentPositionParams): CompletionItem[] => {
		// for (let iterator of Imports) {
		// 	iterator[1].setPos(0);
		// 	iterator[1].exec();
        // }
        validator.exec();
        let curDocArr = documents.all().filter((value)=>{
            return value.uri == tdpp.textDocument.uri;
        });
        return getCIArr(tdpp, curDocArr[0]/*, Imports[0][1]*/);
    }
);

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {return item;});

connection.onHover((tdpp: TextDocumentPositionParams): Hover => {
	// for (let iterator of Imports) {
	// 	iterator[1].setPos(0);
	// 	iterator[1].exec();
    // }
    validator.exec();
	let curDocArr = documents.all().filter((value)=>{
		return value.uri == tdpp.textDocument.uri;
	});
	return getHover(tdpp, curDocArr[0]/*, Imports[0][1]*/);});

connection.onDefinition((tdpp: TextDocumentPositionParams) => {
	// let uri:string = params.textDocument.uri; //заменить реальным uri файла, где находится определение
	// let range: Range = {start: { line: 3, character: 1 }, end: { line: 4, character: 10 }};
    // return Location.create(uri, range);
    validator.exec();
	let curDocArr = documents.all().filter((value)=>{
		return value.uri == tdpp.textDocument.uri;
	});
    return getDefinitionLocation(tdpp, curDocArr[0]/*, Imports[0][1]*/);
});
/* 
connection.onDidOpenTextDocument((params) => {
    for (let iterator of Imports) {
		iterator[1].setPos(0);
		iterator[1].exec();
	}
	
	connection.console.log(`Open file: ${params.textDocument.uri}`);
}); */
/*
connection.onDidChangeTextDocument((params) => {
    // The content of a text document did change in VSCode.
    // params.uri uniquely identifies the document.
    // params.contentChanges describe the content changes to the document.
    connection.console.log(`${params.textDocument.uri} changed: ${JSON.stringify(params.contentChanges)}`);
});
connection.onDidCloseTextDocument((params) => {
    // A text document got closed in VSCode.
    // params.uri uniquely identifies the document.
    connection.console.log(`${params.textDocument.uri} closed.`);
});
*/

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
