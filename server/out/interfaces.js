"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
/**
 * Абстрактный базовый класс, отсюда будем танцевать при парсинге
 */
class CAbstractBase {
    /**
     * Конструктор
     */
    constructor() {
        this.name = "";
        this.private_ = false;
        this.range = { start: 0, end: 0 };
        this.objKind = vscode_languageserver_1.CompletionItemKind.Unit;
        this.varType_ = "variant";
        this.description = "";
        this.detail = "";
        this.insertedText = "";
    }
    /**
     * возвращает флаг приватности
     */
    get Private() { return this.private_; }
    /**
     * Устанавливает флаг приватности
     */
    set Private(flag) { this.private_ = flag; }
    /**
     * Возвращает имя
     */
    get Name() { return this.name; }
    /**
     * Возвращает тип значения переменной или возвращаемый тип для макроса
     */
    get Type() { return this.varType_; }
    /**
     * Устанавливает тип переменной
     */
    setType(type) { this.varType_ = type; }
    /**
     * Возвращает диапазон блока
     */
    get Range() { return this.range; }
    /**
     * Устанавливает диапазон блока
     */
    setRange(range) { this.range = range; }
    /**
     * Возвращает тип объекта
     */
    get ObjKind() { return this.objKind; }
    /**
     * Возвращает инфо объекта для автодополнения
     */
    get CIInfo() {
        this.updateCIInfo();
        return {
            label: this.name,
            documentation: this.description,
            insertTextFormat: vscode_languageserver_1.InsertTextFormat.PlainText,
            kind: this.objKind,
            detail: this.detail,
            insertText: this.insertedText
        };
    }
    /**
     * Возвращает является ли данный элемент функцией, методом или классом
     */
    isObject() {
        return this.objKind === vscode_languageserver_1.CompletionItemKind.Class || this.objKind === vscode_languageserver_1.CompletionItemKind.Function || this.objKind === vscode_languageserver_1.CompletionItemKind.Method;
    }
    /**
     * Устанавливает описание для автодополнения
     */
    Description(desc) { this.description = desc; }
    /**
     * Рекурсивный поиск внутри объекта
     */
    RecursiveFind(name) { return undefined; }
}
exports.CAbstractBase = CAbstractBase;
//# sourceMappingURL=interfaces.js.map