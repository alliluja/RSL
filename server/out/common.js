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
const enums_1 = require("./enums");
const defaults_1 = require("./defaults");
const server_1 = require("./server");
const bankinter_1 = require("./inters/bankinter");
let objCounter = 0;
let TYPES = new Array();
TYPES[enums_1.varType._variant] = "variant";
TYPES[enums_1.varType._integer] = "integer";
TYPES[enums_1.varType._double] = "double";
TYPES[enums_1.varType._doublel] = "doublel";
TYPES[enums_1.varType._string] = "string";
TYPES[enums_1.varType._bool] = "bool";
TYPES[enums_1.varType._date] = "date";
TYPES[enums_1.varType._time] = "time";
TYPES[enums_1.varType._datetime] = "datetime";
TYPES[enums_1.varType._memaddr] = "memaddr";
TYPES[enums_1.varType._procref] = "procref";
TYPES[enums_1.varType._methodref] = "methodref";
TYPES[enums_1.varType._decimal] = "decimal";
TYPES[enums_1.varType._numeric] = "numeric";
TYPES[enums_1.varType._money] = "money";
TYPES[enums_1.varType._moneyl] = "moneyl";
TYPES[enums_1.varType._specval] = "specval";
function getTypeStr(typeNum) {
    return TYPES[typeNum];
}
exports.getTypeStr = getTypeStr;
let KEYWORDS = new Array();
KEYWORDS[enums_1.kwdNum._array] = "array";
KEYWORDS[enums_1.kwdNum._end] = "end";
KEYWORDS[enums_1.kwdNum._or] = "or";
KEYWORDS[enums_1.kwdNum._break] = "break";
KEYWORDS[enums_1.kwdNum._file] = "file";
KEYWORDS[enums_1.kwdNum._private] = "private";
KEYWORDS[enums_1.kwdNum._class] = "class";
KEYWORDS[enums_1.kwdNum._for] = "for";
KEYWORDS[enums_1.kwdNum._record] = "record";
KEYWORDS[enums_1.kwdNum._const] = "const";
KEYWORDS[enums_1.kwdNum._if] = "if";
KEYWORDS[enums_1.kwdNum._return] = "return";
KEYWORDS[enums_1.kwdNum._continue] = "continue";
KEYWORDS[enums_1.kwdNum._import] = "import";
KEYWORDS[enums_1.kwdNum._var] = "var";
KEYWORDS[enums_1.kwdNum._cpdos] = "cpdos";
KEYWORDS[enums_1.kwdNum._local] = "local";
KEYWORDS[enums_1.kwdNum._while] = "while";
KEYWORDS[enums_1.kwdNum._cpwin] = "cpwin";
KEYWORDS[enums_1.kwdNum._macro] = "macro";
KEYWORDS[enums_1.kwdNum._with] = "with";
KEYWORDS[enums_1.kwdNum._elif] = "elif";
KEYWORDS[enums_1.kwdNum._not] = "not";
KEYWORDS[enums_1.kwdNum._else] = "else";
KEYWORDS[enums_1.kwdNum._onerror] = "onerror";
KEYWORDS[enums_1.kwdNum._olc] = "//";
KEYWORDS[enums_1.kwdNum._mlc_o] = "/*";
KEYWORDS[enums_1.kwdNum._mlc_c] = "*/";
let STR_ITEM_KIND = new Array();
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Text] = "Текст";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Method] = "Метод";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Function] = "Функция";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Constructor] = "Конструктор";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Field] = "Поле";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Variable] = "Переменная";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Class] = "Класс";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Interface] = "Интерфейс";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Module] = "Модуль";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Property] = "Свойство";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Unit] = "Unit";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Value] = "Значение";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Enum] = "Перечисление";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Keyword] = "Ключевое слово";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Snippet] = "Сниппет";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Color] = "Цвет";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.File] = "Файл";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Reference] = "Ссылка";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Folder] = "Папка";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.EnumMember] = "Член перечисления";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Constant] = "Константа";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Struct] = "Структура";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Event] = "Событие";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.Operator] = "Оператор";
STR_ITEM_KIND[vscode_languageserver_1.CompletionItemKind.TypeParameter] = "Тип параметра";
let INTERS = new Array();
INTERS[enums_1.intersNum.bankinter] = "bankinter";
INTERS[enums_1.intersNum.carrydoc] = "carrydoc";
INTERS[enums_1.intersNum.clbinter] = "clbinter";
INTERS[enums_1.intersNum.clninter] = "clninter";
INTERS[enums_1.intersNum.ctginter] = "ctginter";
INTERS[enums_1.intersNum.devinter] = "devinter";
INTERS[enums_1.intersNum.fminter] = "fminter";
INTERS[enums_1.intersNum.rsbusergroupsinter] = "rsbusergroupsinter";
INTERS[enums_1.intersNum.elexchangeinter] = "elexchangeinter";
INTERS[enums_1.intersNum.mcinter] = "mcinter";
INTERS[enums_1.intersNum.currinter] = "currinter";
INTERS[enums_1.intersNum.securityinter] = "securityinter";
INTERS[enums_1.intersNum.rslcommon] = "rslcommon";
INTERS[enums_1.intersNum.toolsinter] = "toolsinter";
function getStrItemKind(kind) {
    return STR_ITEM_KIND[kind];
}
let CompletionItemArray = new Array();
function flushCIArr() { CompletionItemArray.length = 0; }
function getCIArr(tdpp, document /*, tree:CASTBase*/) {
    flushCIArr();
    let tree;
    let arr = server_1.getTree();
    for (const iterator of arr) {
        if (iterator.uri == tdpp.textDocument.uri) {
            tree = iterator.object;
            break;
        }
    }
    if (tree != undefined) { //может придти и такое
        let num = document.offsetAt(tdpp.position);
        let token = tree.getPrevToken(num);
        if (token.length > 0) { //Если предыдущий символ точка - вернется токен перед ней, иначе - пусто
            //необходимо взять тип данной переменной и по типу поискать в интерах, дефолтных классах и распарсенных классах, макросах и переменных,
            //в массив CompletionItemArray записать CIInfo найденного объекта
            let obj;
            let objArr = tree.getActualChilds(num);
            objArr.forEach(element => {
                if (element.getName() == token)
                    obj = element;
            });
            if (obj == undefined) { //obj = tree.Find(token); //если не нашли в местных переменных, поищем рекурсивно
                let objTree = server_1.getTree();
                for (const iterator of objTree) {
                    obj = iterator.object.Find(token);
                    if (obj != undefined)
                        break;
                }
            }
            if (obj != undefined) { //нашли эту переменную
                if (obj.Type() != getTypeStr(enums_1.varType._variant)) {
                    let objClass;
                    let objTree = server_1.getTree();
                    for (const iterator of objTree) {
                        objClass = iterator.object.Find(obj.Type()); //поищем в дереве что-то с таким названием, как тип этой переменной (предполагаем, что это должен быть класс)
                        if (objClass != undefined)
                            break;
                    }
                    if (objClass != undefined && objClass.getObjType() == vscode_languageserver_1.CompletionItemKind.Class)
                        CompletionItemArray = objClass.getChildsCIInfo(true); //получим всю информацию о детях этого класса
                    else { //не нашли в открытом файле - будем искать дальше
                        let Def = defaults_1.getDefaults();
                        let ans = Def.find(obj.Type());
                        if (ans != undefined) {
                            CompletionItemArray = ans.ChildsCIInfo();
                        }
                    }
                }
            }
        }
        else { //Надо вернуть все подгруженные интеры, дефолтные классы и распарсенные классы, макросы и переменные
            //которые объявлены выше указанной позиции
            server_1.getTree().forEach(element => {
                if (element[1] == tree)
                    CompletionItemArray = CompletionItemArray.concat(element[1].getChildsCIInfo(false, num, true));
                else
                    CompletionItemArray = CompletionItemArray.concat(element[1].getChildsCIInfo(true, 0, false));
            });
            CompletionItemArray = CompletionItemArray.concat(defaults_1.getCIInfoForArray(defaults_1.getDefaults())); //все дефолтные классы, функции и переменные
            CompletionItemArray = CompletionItemArray.concat(Inters.getIntersCIInfo());
        }
    }
    return CompletionItemArray;
}
exports.getCIArr = getCIArr;
function getHover(tdpp, document /* , tree:CASTBase */) {
    let result = { contents: "Скоро будет подсказка",
        range: {
            start: { line: 0, character: 0 },
            end: { line: 0, character: 0 }
        } };
    let tree;
    let arr = server_1.getTree();
    for (const iterator of arr) {
        if (iterator.uri == tdpp.textDocument.uri) {
            tree = iterator.object;
            break;
        }
    }
    if (tree != undefined) {
        let curPos = document.offsetAt(tdpp.position);
        let curToken = tree.getCurrentToken(curPos);
        let obj;
        let objArr = tree.getActualChilds(curPos);
        objArr.forEach(element => {
            if (element.getName() == curToken[0])
                obj = element;
        });
        if (obj == undefined)
            obj = tree.Find(curToken[0]);
        if (obj != undefined) {
            let CIInfo = obj.CIInfo();
            result.contents = CIInfo.detail;
            result.range = {
                start: document.positionAt(curToken[1]),
                end: document.positionAt(curToken[2])
            };
        }
        else
            return null;
    }
    else
        return null;
    return result;
}
exports.getHover = getHover;
function getDefinitionLocation(tdpp, document /*, tree:CASTBase*/) {
    let result;
    let tree;
    let arr = server_1.getTree();
    for (const iterator of arr) {
        if (iterator.uri == tdpp.textDocument.uri) {
            tree = iterator.object;
            break;
        }
    }
    if (tree != undefined) {
        let curPos = document.offsetAt(tdpp.position);
        let curToken = tree.getCurrentToken(curPos);
        let obj;
        let objArr = tree.getActualChilds(curPos);
        objArr.forEach(element => {
            if (element.getName() == curToken[0])
                obj = element;
        });
        if (obj == undefined)
            obj = tree.Find(curToken[0]);
        if (obj != undefined) {
            let range = obj.getRange();
            let startPos = document.positionAt(range[0]);
            startPos.line++;
            result = vscode_languageserver_1.Location.create(tdpp.textDocument.uri, {
                start: startPos,
                end: startPos
            });
        }
        else
            return null;
    }
    else
        return null;
    return result;
}
exports.getDefinitionLocation = getDefinitionLocation;
function isCharInString(strToFind, strWhereFind) {
    return strWhereFind.indexOf(strToFind);
}
function counterReset() { objCounter = 0; }
exports.counterReset = counterReset;
function isInArray(node, arr) {
    let res = arr.indexOf(node);
    return [res >= 0, res];
}
function InterNamesProcess(str) {
    if (str.indexOf("//") >= 0 || str.indexOf("/*") >= 0) { //если в строку как-то попали комментарии - их надо удалить
        //TODO:
    }
    let tmp = str.split(",");
    let names = [];
    tmp.forEach(name => {
        name = name.trim();
        if (name[0] == "\"")
            name = name.substring(1, name.length);
        if (name[name.length - 1] == "\"")
            name = name.substring(0, name.length - 1);
        name = name.trim();
        names.push(name);
    });
    return names;
}
class intersResolve {
    constructor() { this.includedInters = new Array(); }
    includeInter(num) {
        if (!isInArray(num, this.includedInters)[enums_1.t.boolVal])
            this.includedInters.push(num);
    }
    getIntersCIInfo() {
        let CIInfoArray = new Array();
        this.includedInters.forEach(element => {
            let tmpArr;
            switch (element) {
                case enums_1.intersNum.bankinter:
                    tmpArr = defaults_1.getCIInfoForArray(bankinter_1.getBankInter());
                    break;
                //TODO: доделать остальные интеры
                // case intersNum.carrydoc				: tmpArr = getCIInfoForArray(); break;
                // case intersNum.clbinter				: tmpArr = getCIInfoForArray(); break;
                // case intersNum.clninter				: tmpArr = getCIInfoForArray(); break;
                // case intersNum.ctginter				: tmpArr = getCIInfoForArray(); break;
                // case intersNum.devinter				: tmpArr = getCIInfoForArray(); break;
                // case intersNum.fminter				: tmpArr = getCIInfoForArray(); break;
                // case intersNum.rsbusergroupsinter	: tmpArr = getCIInfoForArray(); break;
                // case intersNum.elexchangeinter		: tmpArr = getCIInfoForArray(); break;
                // case intersNum.mcinter				: tmpArr = getCIInfoForArray(); break;
                // case intersNum.currinter				: tmpArr = getCIInfoForArray(); break;
                // case intersNum.securityinter			: tmpArr = getCIInfoForArray(); break;
                // case intersNum.rslcommon				: tmpArr = getCIInfoForArray(); break;
                // case intersNum.toolsinter			: tmpArr = getCIInfoForArray(); break;
                //default: throw("неверный номер интера");
            }
            if (tmpArr != undefined)
                CIInfoArray = CIInfoArray.concat(tmpArr);
        });
        return CIInfoArray;
    }
}
let Inters = new intersResolve();
class CASTBase {
    //МЕтоды
    isPrivate() { return this._isPrivate; }
    Find(name) {
        let Obj;
        for (let index = 0; index < this._childs.length; index++) {
            if (this._childs[index]._name.toLowerCase() == name.toLowerCase())
                Obj = this._childs[index];
            else if (Obj == undefined)
                Obj = this._childs[index].Find(name);
            if (Obj != undefined)
                break;
        }
        return Obj;
    }
    getKeywordNum(token) {
        let answer = isInArray(token.toLowerCase(), KEYWORDS);
        return answer;
    }
    getChildsCIInfo(isCheckPrivate = false, position = 0, isCheckActual = false) {
        let answer = new Array();
        this._childs.forEach(element => {
            if (isCheckActual) {
                if (element.getRange()[1] < position) {
                    if (isCheckPrivate) {
                        if (!element.isPrivate())
                            answer.push(element.CIInfo());
                    }
                    else
                        answer.push(element.CIInfo());
                }
                else if (element.isActual(position)) {
                    let CIArr = element.getChildsCIInfo();
                    CIArr.forEach(element => {
                        answer.push(element);
                    });
                }
            }
            else if (isCheckPrivate) {
                if (!element.isPrivate())
                    answer.push(element.CIInfo());
            }
            else
                answer.push(element.CIInfo());
        });
        return answer;
    }
    reParsing() {
        return __awaiter(this, void 0, void 0, function* () { this._pos = 0; this.exec(); });
    }
    exec() {
        this._childs = new Array();
        this.Skip();
        let curToken;
        const closeBracket = ")";
        if (this.CurrentChar == "(") {
            let paramString = this.CurrentChar;
            this.Next();
            let savePos = this.Pos;
            curToken = this.getNextToken();
            if (curToken != ")") {
                this._pos = savePos;
                while (this.CurrentChar != closeBracket.toString() && !this.End) {
                    paramString += this.CurrentChar;
                    this.Next();
                }
                paramString += ")";
                this._pos = savePos;
                this.CreateVariable(true, this._range[0]);
            }
            else
                paramString = paramString + curToken; //")"
            let stop = false;
            do {
                curToken = this.getNextToken(enums_1.SkipComment.no);
                if (curToken == ":")
                    this._varType = this.getType(this.getNextToken())[1];
                else if (curToken == "//" || curToken == "/*") {
                    let comment = (curToken == "//") ? this.GetOLC() : this.GetMLC();
                    this._description = comment;
                    stop = true;
                }
                else {
                    this._pos = savePos;
                    stop = true;
                }
            } while (!stop);
            this._paramStr = paramString;
        }
        while (!this.End) {
            curToken = this.getNextToken();
            let actionTuple = this.getKeywordNum(curToken);
            if (actionTuple[enums_1.t.boolVal]) {
                switch (actionTuple[enums_1.t.numIndex]) {
                    case enums_1.kwdNum._local:
                    case enums_1.kwdNum._private:
                        {
                            curToken = this.getNextToken();
                            let tmp = this.getKeywordNum(curToken);
                            if (tmp[enums_1.t.boolVal]) {
                                switch (tmp[enums_1.t.numIndex]) {
                                    case enums_1.kwdNum._const:
                                        this.CreateVariable(true, this._range[0], true);
                                        break;
                                    case enums_1.kwdNum._var:
                                        this.CreateVariable(true, this._range[0]);
                                        break;
                                    case enums_1.kwdNum._macro:
                                        this.CreateMacro(true);
                                        break;
                                    case enums_1.kwdNum._class:
                                        this.CreateClass(true);
                                        break;
                                    default: break;
                                }
                            }
                        }
                        break;
                    case enums_1.kwdNum._const:
                        this.CreateVariable(false, this._range[0], true);
                        break;
                    case enums_1.kwdNum._var:
                        this.CreateVariable(false, this._range[0]);
                        break;
                    case enums_1.kwdNum._macro:
                        this.CreateMacro(false);
                        break;
                    case enums_1.kwdNum._import:
                        this.CreateImport();
                        break;
                    case enums_1.kwdNum._class:
                        this.CreateClass(false);
                        break;
                    default: break;
                }
            }
        }
    }
    constructor(source, objKind = undefined, range = [0, 0]) {
        this._source = source;
        this._name = "base";
        this._description = "";
        this._descFormat = vscode_languageserver_1.InsertTextFormat.PlainText;
        this._detail = "";
        this._insertedText = "";
        this._isPrivate = true;
        this._childs = new Array();
        this._pos = 0;
        this._range = range;
        this._ID = objCounter++;
        this._objKind = objKind == undefined ? vscode_languageserver_1.CompletionItemKind.Unit : objKind;
        this._varType = getTypeStr(enums_1.varType._variant);
        this._paramStr = "";
        this.exec();
    }
    isActual(pos) { return (this._range[0] <= pos && pos <= this._range[1]); }
    getObjectBody() {
        let result;
        let token;
        let savePos = this.Pos;
        let inToken = 1;
        let outToken = 0;
        while (inToken != outToken && !this.End) {
            token = this.getNextToken();
            if (isInArray(token, enums_1.tokensWithEnd)[enums_1.t.boolVal])
                inToken++;
            else if (token.toLowerCase() == "end")
                outToken++;
        }
        result = this.Source.substring(savePos, this.Pos);
        return result;
    }
    CreateClass(isPrivate) {
        let range = [0, 0];
        let parentName = "";
        range[0] = this.Pos + this._range[0];
        let name = this.getNextToken();
        if (name == "(") {
            parentName = this.getNextToken(); //это имя родительского класса
            this.Next();
            name = this.getNextToken();
        }
        let body = this.getObjectBody();
        range[1] = this.Pos + this._range[0];
        let classObj = new CASTClass(body, name, parentName, isPrivate, range);
        this.addChild(classObj);
    }
    CreateImport() {
        let token = "";
        while (this.CurrentChar != ";" && !this.End) { //получаем строку до ;
            token += this.CurrentChar;
            this.Next();
        }
        let names = InterNamesProcess(token);
        names.forEach(nameInter => {
            let tpl = isInArray(nameInter.toLowerCase(), INTERS);
            if (tpl[enums_1.t.boolVal]) {
                Inters.includeInter(tpl[enums_1.t.numIndex]);
            }
            else { //это не интер, запросим открытие такого файла
                if (!nameInter.endsWith(".mac"))
                    nameInter = nameInter + ".mac";
                server_1.GetFileRequest(nameInter);
            }
        });
    }
    CreateMacro(isPrivate) {
        let isMethod = this.getObjType() == vscode_languageserver_1.CompletionItemKind.Class;
        let range = [0, 0];
        range[0] = this.Pos + this._range[0];
        let name = this.getNextToken();
        let body = this.getObjectBody();
        range[1] = this.Pos + this._range[0];
        let macro = new CASTMacro(body, name, isPrivate, range, isMethod);
        this.addChild(macro);
    }
    CreateVariable(isPrivate, offset, isConstant = false) {
        let start = offset + this.Pos;
        let token = this.getNextToken();
        let varObject = new CASTVar(token, isPrivate, isConstant, this.getObjType() == vscode_languageserver_1.CompletionItemKind.Class);
        varObject.setRange(start, start + token.length);
        token = this.getNextToken();
        let stop = false;
        let comment = "";
        let varTypeStr = "";
        while (!stop && !this.End) {
            switch (token) {
                case "(":
                case ")":
                    {
                        stop = true;
                    }
                    break;
                case "//":
                case "/*":
                    {
                        comment = (token == "//") ? this.GetOLC() : this.GetMLC();
                        varObject.setDescription(comment);
                    }
                    break;
                case "=":
                case ":":
                    {
                        varTypeStr = this.getNextToken();
                        if (token == "=")
                            varObject.setValue(varTypeStr);
                        if (varObject.Type() == getTypeStr(enums_1.varType._variant)) {
                            let varTypeTouple = this.getType(varTypeStr);
                            if (varTypeTouple[enums_1.t.boolVal]) {
                                varObject.setType(varTypeTouple[enums_1.t.numIndex]);
                            }
                        }
                    }
                    break;
                case ";":
                    {
                        let savePos = this.Pos;
                        token = this.getNextToken(enums_1.SkipComment.no);
                        if (token != "//" && token != "/*")
                            this._pos = savePos;
                        else {
                            comment = (token == "//") ? this.GetOLC() : this.GetMLC();
                            varObject.setDescription(comment);
                        }
                        stop = true;
                    }
                    break;
                case ",":
                    {
                        let savePos = this.Pos;
                        token = this.getNextToken(enums_1.SkipComment.no);
                        if (token != "//" && token != "/*")
                            this._pos = savePos;
                        else {
                            comment = (token == "//") ? this.GetOLC() : this.GetMLC();
                            varObject.setDescription(comment);
                        }
                        this.CreateVariable(isPrivate, this._range[0], isConstant);
                        stop = true;
                    }
                    break;
            }
            if (!stop)
                token = this.getNextToken();
        }
        this.addChild(varObject);
    }
    setRange(start, end) {
        this._range = [start, end];
    }
    addChild(node) {
        this._childs.push(node);
    }
    getChilds() {
        return this._childs;
    }
    getActualChilds(position, isCheckPrivate = false) {
        let answer = new Array();
        this._childs.forEach(element => {
            if (element.getRange()[1] < position) {
                if (isCheckPrivate) {
                    if (!element.isPrivate())
                        answer.push(element);
                }
                else
                    answer.push(element);
            }
            else if (element.isActual(position)) {
                let CIArr = element.getChilds();
                CIArr.forEach(element => {
                    answer.push(element);
                });
            }
        });
        return answer;
    }
    CurIndex(index) { return index < this._source.length ? this._source[index] : ""; }
    get Source() { return this._source; }
    get Pos() { return this._pos; }
    getPrivate() { return this._isPrivate; }
    setPrivate(flag) { this._isPrivate = flag; }
    setDescription(comment) { this._description = comment; }
    get CurrentChar() { return this.CurIndex(this.Pos); }
    get End() { return this.CurrentChar == ""; }
    Next() { if (!this.End)
        this._pos++; }
    IsWhitespace(chr) { return enums_1.DEFAULT_WHITESPACES.isPresent(chr); /* isCharInString(chr, DEFAULT_WHITESPACES) >= 0; */ }
    Skip() { while (this.IsWhitespace(this.CurrentChar) && !this.End)
        this.Next(); }
    GetOLC() {
        let comment = "";
        while (this.CurrentChar != "\r" && !this.End) {
            comment += this.CurrentChar;
            this.Next();
        }
        return comment;
    }
    SkipToEndLine() { let temp = this.GetOLC(); this.Skip(); }
    GetMLC() {
        let comment = "";
        while (!((this.CurrentChar == "*") && (this.CurIndex(this.Pos + 1) == "/")) && !this.End) {
            comment += this.CurrentChar;
            this.Next();
        }
        this.Next();
        this.Next();
        return comment;
    }
    SkipToEndComment() {
        let temp = this.GetMLC();
        this.Next();
        this.Next(); //пропустить закрывающий символ "/*"
        if (this.IsWhitespace(this.CurrentChar))
            this.Skip();
    }
    IsToken(chr) {
        let answer = [false, 0];
        if (chr != "") {
            answer = isInArray(chr.toLowerCase(), KEYWORDS);
            if (answer[enums_1.t.boolVal] && answer[enums_1.t.numIndex] != enums_1.kwdNum._olc && answer[enums_1.t.numIndex] != enums_1.kwdNum._mlc_o && answer[enums_1.t.numIndex] != enums_1.kwdNum._mlc_c) {
                answer[enums_1.t.boolVal] = this.IsStopChar();
            }
            else if (!answer[enums_1.t.boolVal] && this.IsStopChar()) {
                answer[enums_1.t.boolVal] = true;
            }
        }
        return answer[enums_1.t.boolVal];
    }
    IsStopCharEx(chr) { return isCharInString(chr, enums_1.STOP_CHARS) >= 0; }
    IsStopChar() { return this.IsStopCharEx(this.CurrentChar); }
    IsDigit(str) { return isCharInString(str, enums_1.DIGITS) >= 0; }
    getCurrentToken(_position, savePosition = true) {
        let savePos = this.Pos;
        this._pos = _position;
        let res = ["", 0, 0];
        while (!this.IsStopChar() && this.CurrentChar != undefined) {
            this._pos--;
        }
        if (this.IsStopChar())
            this.Next();
        res[1] = this.Pos; //start token
        res[0] = this.getNextToken(); //token
        res[2] = this.Pos; //end token
        if (savePosition)
            this._pos = savePos;
        return res;
    }
    getPrevToken(_position, savePosition = true) {
        let savePos = this.Pos;
        this._pos = _position;
        this._pos--;
        let res = "";
        if (this.CurrentChar == ".") {
            this._pos--;
            while (!this.IsStopChar() && this.CurrentChar != undefined) {
                this._pos--;
            }
            res = this._source.substring(this.Pos + 1, _position - 1);
        }
        if (savePosition)
            this._pos = savePos;
        return res;
    }
    getNextToken(skipComment = enums_1.SkipComment.yes) {
        this.Skip();
        let token = "";
        if (!this.IsStopChar()) {
            if (this.CurrentChar == "\"") {
                let stop = false;
                token = token + this.CurrentChar;
                this.Next();
                while (!stop && !this.End) {
                    stop = (this.CurrentChar == "\"" && this.CurIndex(this._pos - 1) != "\\") ? true : false;
                    token = token + this.CurrentChar;
                    this.Next();
                }
            }
            else {
                while (!this.IsToken(token) && !this.End) {
                    token = token + this.CurrentChar;
                    this.Next();
                }
            }
            if (skipComment == enums_1.SkipComment.yes) {
                if (token == "//") {
                    this.SkipToEndLine();
                    token = this.getNextToken(skipComment);
                }
                else if (token == "/*") {
                    this.SkipToEndComment();
                    token = this.getNextToken(skipComment);
                }
            }
        }
        else {
            token = this.CurrentChar;
            this.Next();
        }
        return token;
    }
    getType(token) {
        token = token.toLowerCase();
        if (token[0] == "@")
            token = token.substring(1, token.length); //если это какой-то указатель - обрежем собаку
        let answer = [false, getTypeStr(enums_1.varType._variant)];
        let isType, typeNum;
        [isType, typeNum] = isInArray(token, TYPES);
        if (!isType) { //не нашли в стандартных типах
            if (token[0] == "\"" || token[0] == "\'")
                answer = [true, getTypeStr(enums_1.varType._string)]; //это строка
            else if ((this.IsDigit(token[0])))
                answer = [true, getTypeStr(enums_1.varType._integer)]; //это число
            else if (token.toLowerCase() == "true" || token.toLowerCase() == "false")
                answer = [true, getTypeStr(enums_1.varType._bool)]; //это булево
            else { //TODO: надо поискать в именах объявленных и импортированных классов и функций
                let baseObject = server_1.getTree();
                let obj;
                if (baseObject != undefined) {
                    for (const iterator of baseObject) {
                        obj = iterator.object.Find(token);
                        if (obj != undefined)
                            break;
                    }
                }
                if (obj != undefined) { //ищем в текущем файле и всех импортированных
                    answer = [true, obj.Type()];
                }
                else { //иначе ищем в остальных местах
                    let DefArray = defaults_1.getDefaults();
                    let ans = DefArray.find(token); //поиск в дефолтах
                    if (ans != undefined) {
                        answer = [true, ans.returnType()];
                    }
                }
            }
        }
        else
            answer = [true, getTypeStr(typeNum)];
        return answer;
    }
    getName() { return this._name; }
    getRange() { return this._range; }
    getObjType() { return this._objKind; }
    Type() { return this._varType; }
    setType(type) { this._varType = type; }
    CIInfo() {
        this.updateCIInfo();
        return { data: this._ID,
            label: this._name,
            documentation: this._description,
            insertTextFormat: this._descFormat,
            kind: this._objKind,
            detail: this._detail,
            insertText: this._insertedText };
    }
    updateCIInfo() {
        throw ("Вызов метода базового класса");
    }
}
exports.CASTBase = CASTBase;
class CASTVar extends CASTBase {
    constructor(name, privateFlag, isConstant, isProperty) {
        super("");
        this._name = name;
        this._value = "";
        this._isPrivate = privateFlag;
        this._objKind = isProperty ? vscode_languageserver_1.CompletionItemKind.Property : (isConstant ? vscode_languageserver_1.CompletionItemKind.Constant : vscode_languageserver_1.CompletionItemKind.Variable);
        this._insertedText = name;
    }
    setValue(value) {
        this._value = value;
    }
    updateCIInfo() {
        this._detail = `${getStrItemKind(this._objKind)}: ${this._name}`;
        if (this._value.length > 0)
            this._detail += ` = ${this._value}`;
        this._detail += `,\nтип ${this.Type()}`;
    }
    isActual(pos) { return (this._range[1] < pos); }
}
class CASTMacro extends CASTBase {
    constructor(src, name, privateFlag, range = [0, 0], isMethod) {
        super(src, isMethod ? vscode_languageserver_1.CompletionItemKind.Method : vscode_languageserver_1.CompletionItemKind.Function, range);
        this._name = name;
        this._isPrivate = privateFlag;
        this._insertedText = `${name}()`;
        // this._range = range;
    }
    updateCIInfo() {
        this._detail = `${getStrItemKind(this._objKind)}: `;
        this._detail += `${this._name}${this._paramStr}.\nВозвращаемый тип: ${this.Type()}`;
    }
}
class CASTClass extends CASTBase {
    constructor(src, name, parentName, privateFlag, range = [0, 0]) {
        super(src, vscode_languageserver_1.CompletionItemKind.Class, range);
        this._name = name;
        this._parentName = parentName;
        this._isPrivate = privateFlag;
        this._insertedText = name;
        // this._range         = range;
        this._varType = name;
    }
    updateCIInfo() {
        this._detail = `${getStrItemKind(this._objKind)}: `;
        this._detail += this._name;
    }
}
class Validator {
    constructor() {
        this.status = true;
        this.importsSize = 0;
    }
    /**
     * Выполняет повторый парсинг всех подгруженных макросов
     */
    exec() {
        let Imports = server_1.getTree();
        if (this.status || this.importsSize != Imports.length - 1) {
            this.importsSize = Imports.length - 1;
            this.status = false;
            for (let iterator of Imports) {
                iterator.object.reParsing();
            }
        }
    }
}
exports.Validator = Validator;
//# sourceMappingURL=common.js.map