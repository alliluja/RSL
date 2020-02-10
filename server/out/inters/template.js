"use strict";
/**
 * Определение функций, классов и констант для BankInter FIXME:
 */
Object.defineProperty(exports, "__esModule", { value: true });
const extended_h_1 = require("../extended_h");
const vscode_languageserver_1 = require("vscode-languageserver");
const defaults_1 = require("../defaults");
/**
 * Содержит функции, классы, переменные
 */
let BankInterArray = new defaults_1.ArrayClass(); //FIXME:
/**
 * Возвращает функции, классы, переменные для BankInter
 */
function getBankInter() { return BankInterArray; } //FIXME:
exports.getBankInter = getBankInter;
function getBankInterCIInfo() {
    let CIArray = new Array();
    let CNodeArray = BankInterArray.getChilds(); //FIXME:
    CNodeArray.forEach(element => {
        CIArray.push(element.CIInfo());
    });
    return CIArray;
}
exports.getBankInterCIInfo = getBankInterCIInfo;
/**
 * Функции интера
 */
let func = new extended_h_1.CNodeFunc("DocToInn", "doctoinn", "Функция DocToInn (doc:FILE, V_Record, ob:V_Integer, pr:V_Integer, INN:V_String, KPP:V_String, FullINN:V_String):V_String", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Функция извлекает из структуры документа значения ИНН\\КПП." }, "DocToInn (${1:doc:FILE}${2:, V_Record}${3:, ob:V_Integer}${4:, pr:V_Integer}${5:, INN:V_String}${6:, KPP:V_String}${7:, FullINN:V_String});$0" /*подставляемый текст*/);
BankInterArray.push(func); //FIXME:
//# sourceMappingURL=template.js.map