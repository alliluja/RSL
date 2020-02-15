"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Константы.
 */
exports.DEFAULT_WHITESPACES = " \n\r\t";
exports.STOP_CHARS = ".,():;=<>![]" + exports.DEFAULT_WHITESPACES;
exports.DIGITS = "0123456789";
exports.OLC = "//";
exports.MLC_O = "/*";
exports.MLC_C = "*/";
/**
 * Для GetNextToken.
 */
var SkipComment;
(function (SkipComment) {
    SkipComment[SkipComment["yes"] = 0] = "yes";
    SkipComment[SkipComment["no"] = 1] = "no";
})(SkipComment = exports.SkipComment || (exports.SkipComment = {}));
/**
 * Нумерация типов переменных.
 */
var varType;
(function (varType) {
    varType[varType["_variant"] = 0] = "_variant";
    varType[varType["_integer"] = 1] = "_integer";
    varType[varType["_double"] = 2] = "_double";
    varType[varType["_doublel"] = 3] = "_doublel";
    varType[varType["_string"] = 4] = "_string";
    varType[varType["_bool"] = 5] = "_bool";
    varType[varType["_date"] = 6] = "_date";
    varType[varType["_time"] = 7] = "_time";
    varType[varType["_datetime"] = 8] = "_datetime";
    varType[varType["_memaddr"] = 9] = "_memaddr";
    varType[varType["_procref"] = 10] = "_procref";
    varType[varType["_methodref"] = 11] = "_methodref";
    varType[varType["_decimal"] = 12] = "_decimal";
    varType[varType["_numeric"] = 13] = "_numeric";
    varType[varType["_money"] = 14] = "_money";
    varType[varType["_moneyl"] = 15] = "_moneyl";
    varType[varType["_specval"] = 16] = "_specval";
})(varType = exports.varType || (exports.varType = {}));
/**
 * Нумерация ключевых слов.
 */
var kwdNum;
(function (kwdNum) {
    kwdNum[kwdNum["_array"] = 0] = "_array";
    kwdNum[kwdNum["_end"] = 1] = "_end";
    kwdNum[kwdNum["_or"] = 2] = "_or";
    kwdNum[kwdNum["_break"] = 3] = "_break";
    kwdNum[kwdNum["_file"] = 4] = "_file";
    kwdNum[kwdNum["_private"] = 5] = "_private";
    kwdNum[kwdNum["_class"] = 6] = "_class";
    kwdNum[kwdNum["_for"] = 7] = "_for";
    kwdNum[kwdNum["_record"] = 8] = "_record";
    kwdNum[kwdNum["_const"] = 9] = "_const";
    kwdNum[kwdNum["_if"] = 10] = "_if";
    kwdNum[kwdNum["_return"] = 11] = "_return";
    kwdNum[kwdNum["_continue"] = 12] = "_continue";
    kwdNum[kwdNum["_import"] = 13] = "_import";
    kwdNum[kwdNum["_var"] = 14] = "_var";
    kwdNum[kwdNum["_cpdos"] = 15] = "_cpdos";
    kwdNum[kwdNum["_local"] = 16] = "_local";
    kwdNum[kwdNum["_while"] = 17] = "_while";
    kwdNum[kwdNum["_cpwin"] = 18] = "_cpwin";
    kwdNum[kwdNum["_macro"] = 19] = "_macro";
    kwdNum[kwdNum["_with"] = 20] = "_with";
    kwdNum[kwdNum["_elif"] = 21] = "_elif";
    kwdNum[kwdNum["_not"] = 22] = "_not";
    kwdNum[kwdNum["_else"] = 23] = "_else";
    kwdNum[kwdNum["_onerror"] = 24] = "_onerror";
    kwdNum[kwdNum["_olc"] = 25] = "_olc";
    kwdNum[kwdNum["_mlc_o"] = 26] = "_mlc_o";
    kwdNum[kwdNum["_mlc_c"] = 27] = "_mlc_c";
})(kwdNum = exports.kwdNum || (exports.kwdNum = {}));
var intersNum;
(function (intersNum) {
    intersNum[intersNum["bankinter"] = 0] = "bankinter";
    intersNum[intersNum["carrydoc"] = 1] = "carrydoc";
    intersNum[intersNum["clbinter"] = 2] = "clbinter";
    intersNum[intersNum["clninter"] = 3] = "clninter";
    intersNum[intersNum["ctginter"] = 4] = "ctginter";
    intersNum[intersNum["devinter"] = 5] = "devinter";
    intersNum[intersNum["fminter"] = 6] = "fminter";
    intersNum[intersNum["rsbusergroupsinter"] = 7] = "rsbusergroupsinter";
    intersNum[intersNum["elexchangeinter"] = 8] = "elexchangeinter";
    intersNum[intersNum["mcinter"] = 9] = "mcinter";
    intersNum[intersNum["currinter"] = 10] = "currinter";
    intersNum[intersNum["securityinter"] = 11] = "securityinter";
    intersNum[intersNum["rslcommon"] = 12] = "rslcommon";
    intersNum[intersNum["toolsinter"] = 13] = "toolsinter";
})(intersNum = exports.intersNum || (exports.intersNum = {}));
//# sourceMappingURL=enums.js.map