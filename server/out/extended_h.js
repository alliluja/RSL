"use strict";
/**
 * Здесь описания классов, которые надо использовать
 * для интеров, тк инфу из сишников дернуть нереально,
 * для всех интеров придется создать описание самостоятельно
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
/**
 * Базовый класс для описания интеров, используется для констант
 */
class CNode {
    constructor(name, valType, detail, desc, text, format = vscode_languageserver_1.InsertTextFormat.Snippet) {
        this._childs = new Array();
        this._name = name;
        this._description = desc;
        this._insertedText = text;
        this._detail = detail;
        this._descFormat = format;
        this._retType = valType;
        this._objKind = vscode_languageserver_1.CompletionItemKind.Variable;
    }
    Name() { return this._name; }
    returnType() { return this._retType; }
    Info() { return { name: this._name, valueType: this._retType }; }
    CIInfo() { return { label: this._name, documentation: this._description, insertTextFormat: this._descFormat, kind: this._objKind, detail: this._detail, insertText: this._insertedText }; }
    addChild(node) { this._childs.push(node); }
    ChildsInfo() {
        let InfoArray = new Array();
        this._childs.forEach(element => {
            InfoArray.push(element.Info());
        });
        return InfoArray;
    }
    ChildsCIInfo() {
        let CIInfoArray = new Array();
        this._childs.forEach(element => {
            CIInfoArray.push(element.CIInfo());
        });
        return CIInfoArray;
    }
}
exports.CNode = CNode;
/**
 * Функция и возвращаемое ей значение для CompletionItem.
 */
class CNodeFunc extends CNode {
    constructor(name, valType, detail, desc, text, format = vscode_languageserver_1.InsertTextFormat.Snippet, objKind = vscode_languageserver_1.CompletionItemKind.Function) {
        super(name, valType, detail, desc, text, format);
        this._objKind = objKind;
    }
}
exports.CNodeFunc = CNodeFunc;
/**
 * Класс, содержащий методы и свойства для CompletionItem и определения типа переменной.
 */
class CNodeClass extends CNode {
    constructor(name, valType, detail, desc, text, format = vscode_languageserver_1.InsertTextFormat.Snippet) {
        super(name, valType, detail, desc, text, format);
        this._objKind = vscode_languageserver_1.CompletionItemKind.Class;
    }
}
exports.CNodeClass = CNodeClass;
//# sourceMappingURL=extended_h.js.map