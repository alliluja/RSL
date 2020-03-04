import * as path from 'path';
import { workspace, ExtensionContext, window, DecorationOptions, Range, commands, StatusBarItem, StatusBarAlignment} from 'vscode';

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient';

let client: LanguageClient;
let timeout: NodeJS.Timer | undefined = undefined;
let activeEditor = window.activeTextEditor;
let myStatusBarItem: StatusBarItem;

// create a decorator type that we use to decorate not used variable and macros
const notUsedVar = window.createTextEditorDecorationType({
    opacity: '0.5',
    fontStyle: 'italic'
});

function updateDecorations()
{
    if (!activeEditor)
    {
        return;
    }
    const regEx = /\b(macro|var|const|array|record)\b\s*(\w+)/gi;
    const text = activeEditor.document.getText();
    const decorationArr: DecorationOptions[] = [];
    let match;
    let counterMatches: number = 0;

    while (match = regEx.exec(text))
    {
        const regEx1 = new RegExp(`\\b${match[2]}\\b`, "gi");
        const start = activeEditor.document.positionAt(match.index + match[0].length);
        const end   = activeEditor.document.positionAt(text.length);
        const  range = new Range(start, end);
        while (regEx1.exec(activeEditor.document.getText(range)))
        { 
            ++counterMatches;//посчитаем сколько раз встречается
            if (counterMatches > 1)
                { break; }
        }
        if (counterMatches < 1)
        {
            const offset      = match[0].length - match[2].length;
            const startPos    = activeEditor.document.positionAt(match.index + offset);
            const endPos      = activeEditor.document.positionAt(match.index + offset + match[2].length);
            const decoration  =
            {
                range: new Range(startPos, endPos),
                hoverMessage: 'Объявление **' + match[2] + '**, не было использовано в данном файле'
            };
            decorationArr.push(decoration);
        }
        counterMatches = 0;
    }

    activeEditor.setDecorations(notUsedVar, decorationArr);
}



export function activate(context: ExtensionContext) {
    
	// registerCommands();
    // The server is implemented in node
    let serverModule = context.asAbsolutePath(
        path.join('server', 'out', 'server.js')
    );
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions
        }
    };

    // Options to control the language client
    let clientOptions: LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: [{ scheme: 'file', language: 'rsl' }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
        }
    };

    // Create the language client and start the client.
    client = new LanguageClient(
        'RSTyleLanguage',
        'R-Style Language Server',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
	client.start();
	client.onReady().then(() => {
		client.onRequest("getFile", (nameInter : string) => {
			getFile(nameInter);
        } );
		client.onRequest("getActiveTextEditor", () => {
			return activeEditor.document.uri.toString();
		} );
		client.onRequest("updateStatusBar", (value) => {
			updateStatusBarItem(value);
		} );
		client.onNotification("noRootFolder", ()=> window.showErrorMessage("Импорт макросов недоступен. Для полноценной работы необходимо открыть папку или рабочую область"));
    });
    
    if (activeEditor) {
        triggerUpdateDecorations();
    }

    workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
                triggerUpdateDecorations();
        }
    }, null, context.subscriptions);

    window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);


	// register a command that is invoked when the status bar
	// item is selected
	const myCommandId = 'rsl.showMacroFiles';
	context.subscriptions.push(commands.registerCommand(myCommandId, () => {
        window.showInputBox({placeHolder: "начните вводить название макроса", prompt:"один\nдва\nтри\nчетыре"});
		//window.showInformationMessage(`Блин, не надо было нажимать`);
	}));

	// create a new status bar item that we can now manage
	myStatusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 500);
	myStatusBarItem.command = myCommandId;
	context.subscriptions.push(myStatusBarItem);

	// register some listener that make sure the status bar 
	// item always up-to-date
	// subscriptions.push(window.onDidChangeActiveTextEditor(updateStatusBar));
	// subscriptions.push(window.onDidChangeTextEditorSelection(updateStatusBar));

	// update status bar item once at start
    updateStatusBarItem(0);

}

function updateStatusBarItem(n:number)
{
    if (n > 0) {
        myStatusBarItem.text = `$(file) ${n} макросов`; //https://code.visualstudio.com/api/references/icons-in-labels
        myStatusBarItem.tooltip = "Показать список";
        myStatusBarItem.show();
    } else {
        myStatusBarItem.hide();
    }
}

async function getFile(name):Promise<void>{
    await workspace.findFiles(`**/${name}`, null, 1).then((value)=> {
        if (value.length) {
            workspace.openTextDocument(value[0]);
        }
    });
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}

function triggerUpdateDecorations() {
    if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
    }
    timeout = setTimeout(updateDecorations, 500);
}

