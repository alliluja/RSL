/**
 * Определение функций, классов и констант для BankInter FIXME:
 */

import {CNodeClass, CNode, CNodeFunc} from '../extended_h'
import { InsertTextFormat, CompletionItemKind, CompletionItem, MarkupKind } from 'vscode-languageserver';
import {ArrayClass} from '../defaults'

/**
 * Содержит функции, классы, переменные
 */
let BankInterArray: ArrayClass = new ArrayClass(); //FIXME:

/**
 * Возвращает функции, классы, переменные для BankInter
 */
export function getBankInter() {	return BankInterArray; } //FIXME:
export function getBankInterCIInfo():Array<CompletionItem> { //FIXME:
    let CIArray:Array<CompletionItem> = new Array();
    let CNodeArray:Array<CNode> = BankInterArray.getChilds(); //FIXME:
    CNodeArray.forEach(element => {
        CIArray.push(element.CIInfo())
    });
    return CIArray;
}

/**
 * Функции интера
 */
let func: CNodeFunc = new CNodeFunc(
    "DocToInn",
    "doctoinn",
    "Функция DocToInn (doc:FILE, V_Record, ob:V_Integer, pr:V_Integer, INN:V_String, KPP:V_String, FullINN:V_String):V_String",
    {kind: MarkupKind.Markdown, value: "Функция извлекает из структуры документа значения ИНН\\КПП."},
    "DocToInn (${1:doc:FILE}${2:, V_Record}${3:, ob:V_Integer}${4:, pr:V_Integer}${5:, INN:V_String}${6:, KPP:V_String}${7:, FullINN:V_String});$0" /*подставляемый текст*/
);
BankInterArray.push(func); //FIXME:
