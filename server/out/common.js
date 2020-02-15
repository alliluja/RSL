"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
const enums_1 = require("./enums");
const defaults_1 = require("./defaults");
const server_1 = require("./server");
const bankinter_1 = require("./inters/bankinter");
const interfaces_1 = require("./interfaces");
class CArray {
    constructor() { this._it = new Array(); }
    is(it) {
        let res = this._it.indexOf(it.toLowerCase());
        return { first: res >= 0, second: res };
    }
    str(num) { return this._it[num]; }
}
class CEnds extends CArray {
    constructor() {
        super();
        this._it[0] = "class";
        this._it[1] = "macro";
        this._it[2] = "if";
        this._it[3] = "for";
        this._it[4] = "while";
    }
}
class Ctypes extends CArray {
    constructor() {
        super();
        this._it[enums_1.varType._variant] = "variant";
        this._it[enums_1.varType._integer] = "integer";
        this._it[enums_1.varType._double] = "double";
        this._it[enums_1.varType._doublel] = "doublel";
        this._it[enums_1.varType._string] = "string";
        this._it[enums_1.varType._bool] = "bool";
        this._it[enums_1.varType._date] = "date";
        this._it[enums_1.varType._time] = "time";
        this._it[enums_1.varType._datetime] = "datetime";
        this._it[enums_1.varType._memaddr] = "memaddr";
        this._it[enums_1.varType._procref] = "procref";
        this._it[enums_1.varType._methodref] = "methodref";
        this._it[enums_1.varType._decimal] = "decimal";
        this._it[enums_1.varType._numeric] = "numeric";
        this._it[enums_1.varType._money] = "money";
        this._it[enums_1.varType._moneyl] = "moneyl";
        this._it[enums_1.varType._specval] = "specval";
    }
}
class Ckeywords extends CArray {
    constructor() {
        super();
        this._it[enums_1.kwdNum._array] = "array";
        this._it[enums_1.kwdNum._end] = "end";
        this._it[enums_1.kwdNum._or] = "or";
        this._it[enums_1.kwdNum._break] = "break";
        this._it[enums_1.kwdNum._file] = "file";
        this._it[enums_1.kwdNum._private] = "private";
        this._it[enums_1.kwdNum._class] = "class";
        this._it[enums_1.kwdNum._for] = "for";
        this._it[enums_1.kwdNum._record] = "record";
        this._it[enums_1.kwdNum._const] = "const";
        this._it[enums_1.kwdNum._if] = "if";
        this._it[enums_1.kwdNum._return] = "return";
        this._it[enums_1.kwdNum._continue] = "continue";
        this._it[enums_1.kwdNum._import] = "import";
        this._it[enums_1.kwdNum._var] = "var";
        this._it[enums_1.kwdNum._cpdos] = "cpdos";
        this._it[enums_1.kwdNum._local] = "local";
        this._it[enums_1.kwdNum._while] = "while";
        this._it[enums_1.kwdNum._cpwin] = "cpwin";
        this._it[enums_1.kwdNum._macro] = "macro";
        this._it[enums_1.kwdNum._with] = "with";
        this._it[enums_1.kwdNum._elif] = "elif";
        this._it[enums_1.kwdNum._not] = "not";
        this._it[enums_1.kwdNum._else] = "else";
        this._it[enums_1.kwdNum._onerror] = "onerror";
        this._it[enums_1.kwdNum._olc] = enums_1.OLC;
        this._it[enums_1.kwdNum._mlc_o] = enums_1.MLC_O;
        this._it[enums_1.kwdNum._mlc_c] = enums_1.MLC_C;
    }
}
class Cstr_item_kind extends CArray {
    constructor() {
        super();
        this._it[vscode_languageserver_1.CompletionItemKind.Text] = "Текст";
        this._it[vscode_languageserver_1.CompletionItemKind.Method] = "Метод";
        this._it[vscode_languageserver_1.CompletionItemKind.Function] = "Функция";
        this._it[vscode_languageserver_1.CompletionItemKind.Constructor] = "Конструктор";
        this._it[vscode_languageserver_1.CompletionItemKind.Field] = "Поле";
        this._it[vscode_languageserver_1.CompletionItemKind.Variable] = "Переменная";
        this._it[vscode_languageserver_1.CompletionItemKind.Class] = "Класс";
        this._it[vscode_languageserver_1.CompletionItemKind.Interface] = "Интерфейс";
        this._it[vscode_languageserver_1.CompletionItemKind.Module] = "Модуль";
        this._it[vscode_languageserver_1.CompletionItemKind.Property] = "Свойство";
        this._it[vscode_languageserver_1.CompletionItemKind.Unit] = "Unit";
        this._it[vscode_languageserver_1.CompletionItemKind.Value] = "Значение";
        this._it[vscode_languageserver_1.CompletionItemKind.Enum] = "Перечисление";
        this._it[vscode_languageserver_1.CompletionItemKind.Keyword] = "Ключевое слово";
        this._it[vscode_languageserver_1.CompletionItemKind.Snippet] = "Сниппет";
        this._it[vscode_languageserver_1.CompletionItemKind.Color] = "Цвет";
        this._it[vscode_languageserver_1.CompletionItemKind.File] = "Файл";
        this._it[vscode_languageserver_1.CompletionItemKind.Reference] = "Ссылка";
        this._it[vscode_languageserver_1.CompletionItemKind.Folder] = "Папка";
        this._it[vscode_languageserver_1.CompletionItemKind.EnumMember] = "Член перечисления";
        this._it[vscode_languageserver_1.CompletionItemKind.Constant] = "Константа";
        this._it[vscode_languageserver_1.CompletionItemKind.Struct] = "Структура";
        this._it[vscode_languageserver_1.CompletionItemKind.Event] = "Событие";
        this._it[vscode_languageserver_1.CompletionItemKind.Operator] = "Оператор";
        this._it[vscode_languageserver_1.CompletionItemKind.TypeParameter] = "Тип параметра";
    }
}
class Cinters extends CArray {
    constructor() {
        super();
        this._it[enums_1.intersNum.bankinter] = "bankinter";
        this._it[enums_1.intersNum.carrydoc] = "carrydoc";
        this._it[enums_1.intersNum.clbinter] = "clbinter";
        this._it[enums_1.intersNum.clninter] = "clninter";
        this._it[enums_1.intersNum.ctginter] = "ctginter";
        this._it[enums_1.intersNum.devinter] = "devinter";
        this._it[enums_1.intersNum.fminter] = "fminter";
        this._it[enums_1.intersNum.rsbusergroupsinter] = "rsbusergroupsinter";
        this._it[enums_1.intersNum.elexchangeinter] = "elexchangeinter";
        this._it[enums_1.intersNum.mcinter] = "mcinter";
        this._it[enums_1.intersNum.currinter] = "currinter";
        this._it[enums_1.intersNum.securityinter] = "securityinter";
        this._it[enums_1.intersNum.rslcommon] = "rslcommon";
        this._it[enums_1.intersNum.toolsinter] = "toolsinter";
    }
}
class intersResolve {
    constructor() { this.includedInters = new Array(); }
    includeInter(num) {
        if (this.includedInters.indexOf(num) < 0)
            this.includedInters.push(num);
    }
    getCIInfo() {
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
/** Возвращает строковое значение типа объекта*/
function getStrItemKind(kind) { return STR_ITEM_KIND.str(kind); }
/** Возвращает строковое значение типа переменной*/
function getTypeStr(typeNum) { return TYPES.str(typeNum); }
/** Возвращает CIInfo для включенных интеров*/
function IntersCIInfo() { return Inters.getCIInfo(); }
exports.IntersCIInfo = IntersCIInfo;
function InterNamesProcess(str) {
    if (str.includes(enums_1.OLC) || str.includes(enums_1.MLC_O)) { //если в строку как-то попали комментарии - их надо удалить
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
let Inters = new intersResolve();
let tokensWithEnd = new CEnds();
let TYPES = new Ctypes();
let KEYWORDS = new Ckeywords();
let STR_ITEM_KIND = new Cstr_item_kind();
let INTERS = new Cinters();
class CVar extends interfaces_1.CAbstractBase {
    constructor(name, privateFlag, isConstant, isProperty) {
        super();
        this.value = "";
        this.name = name;
        this.private_ = privateFlag;
        this.objKind = isProperty ? vscode_languageserver_1.CompletionItemKind.Property : (isConstant ? vscode_languageserver_1.CompletionItemKind.Constant : vscode_languageserver_1.CompletionItemKind.Variable);
        this.insertedText = name;
    }
    setValue(value) { this.value = value; }
    updateCIInfo() {
        this.detail = `${getStrItemKind(this.objKind)}: ${this.name}`;
        if (this.value.length > 0)
            this.detail += ` = ${this.value}`;
        this.detail += `,\nтип ${this.varType_}`;
    }
    isActual(pos) { return (this.range.end < pos); }
    reParsing() { }
}
exports.CVar = CVar;
/** Родительский класс для макросов и классов*/
class CBase extends interfaces_1.CAbstractBase {
    constructor(src, offset, objKind = vscode_languageserver_1.CompletionItemKind.Unit) {
        super();
        this.childs = new Array();
        this.source = src;
        this.paramStr = "";
        this.position = 0;
        this.savedPos = 0;
        this.offset = offset;
        this.objKind = objKind;
        this.parse();
    }
    updateCIInfo() { }
    isActual(pos) { return (this.range.start < pos && pos < this.range.end); }
    RecursiveFind(name) {
        let Obj = undefined;
        for (const iterator of this.childs) {
            if (iterator.Name.toLowerCase() == name.toLowerCase())
                Obj = iterator;
            else if (Obj == undefined)
                Obj = iterator.RecursiveFind(name);
            if (Obj != undefined)
                break;
        }
        return Obj;
    }
    reParsing() { this.position = 0; this.parse(); }
    getChilds() { return this.childs; }
    addChild(node) { this.childs.push(node); }
    setType(type) { this.varType_ = type; }
    getActualChilds(position) {
        // let isCheckPrivate: boolean = (position == 0)? true: false;
        let answer = new Array();
        //position = (position == 0)? this.source.length - 3 : position;
        if (position != 0) //Ищем в текущем файле
            this.childs.forEach(parent => {
                if (parent.range.end < position)
                    answer.push(parent);
                if (parent.isActual(position)) //пробуем взять только актуальные 
                 {
                    if (parent.isObject()) {
                        parent.childs.forEach(child => {
                            answer.push(child);
                        });
                    }
                }
            });
        else //ищем в другом файле, надо выдать все не приватные элементы
            this.childs.forEach(parent => {
                if (!parent.Private)
                    answer.push(parent);
            });
        return answer;
    }
    getCurrentToken(_position, savePosition = true) {
        let res = undefined;
        if (_position > 0) {
            this.SavePos();
            this.position = _position - 1;
            if (!enums_1.DEFAULT_WHITESPACES.includes(this.CurrentChar)) {
                if (this.CurrentChar === ".")
                    this.position--;
                while (!this.IsStopChar() && this.CurrentChar != undefined) {
                    this.position--;
                }
                if (this.IsStopChar())
                    this.Next();
                res = this.NextToken();
            }
            if (savePosition)
                this.RestorePos();
        }
        return res;
    }
    ChildsCIInfo(isCheckPrivate = false, position = 0, isCheckActual = false) {
        let answer = new Array();
        this.childs.forEach(element => {
            if (isCheckActual) {
                if (element.Range.end < position) {
                    if (isCheckPrivate) {
                        if (!element.Private)
                            answer.push(element.CIInfo);
                    }
                    else
                        answer.push(element.CIInfo);
                }
                else if (element.isActual(position)) {
                    let CIArr = element.ChildsCIInfo();
                    CIArr.forEach(element => {
                        answer.push(element);
                    });
                }
            }
            else if (isCheckPrivate) {
                if (!element.Private)
                    answer.push(element.CIInfo);
            }
            else
                answer.push(element.CIInfo);
        });
        if (this.ObjKind === vscode_languageserver_1.CompletionItemKind.Class) {
            let cast = this; //пытаюсь преобразовать из базового типа в тот который должен быть
            let parent;
            if (cast.getParentName().length) {
                for (const iterator of server_1.getTree()) {
                    parent = iterator.object.RecursiveFind(cast.getParentName());
                    if (parent != undefined)
                        break;
                }
                if (parent != undefined) {
                    parent.childs.forEach(child => {
                        if (!child.Private)
                            answer.push(child.CIInfo);
                    });
                }
            }
        }
        return answer;
    }
    getKeywordNum(token) { return KEYWORDS.is(token.toLowerCase()); }
    CurIndex(index) { return index < this.source.length ? this.source[index] : ""; }
    get CurrentChar() { return this.CurIndex(this.position); }
    get Pos() { return this.position; }
    get End() { return this.CurrentChar == ""; }
    Next() { if (!this.End)
        this.position++; }
    Skip() { while (enums_1.DEFAULT_WHITESPACES.includes(this.CurrentChar) && !this.End)
        this.Next(); }
    IsStopChar() { return enums_1.STOP_CHARS.includes(this.CurrentChar); }
    RestorePos() { this.position = this.savedPos; }
    SavePos() { this.savedPos = this.position; }
    getObjectBody() {
        let result;
        let token;
        let savePos = this.Pos;
        let inToken = 1;
        let outToken = 0;
        while (inToken != outToken && !this.End) {
            token = this.NextToken().str;
            if (tokensWithEnd.is(token).first)
                inToken++;
            else if (token.toLowerCase() == "end")
                outToken++;
        }
        result = this.source.substring(savePos, this.Pos);
        return result;
    }
    NextToken(skipComment = enums_1.SkipComment.yes) {
        this.Skip();
        let savedPosition = this.Pos;
        let token = "";
        if (!this.IsStopChar()) {
            if (this.CurrentChar == "\"") {
                let stop = false;
                token = token + this.CurrentChar;
                this.Next();
                while (!stop && !this.End) {
                    stop = (this.CurrentChar == "\"" && this.CurIndex(this.position - 1) != "\\") ? true : false;
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
                if (token == enums_1.OLC) {
                    this.SkipToEndComment(true);
                    token = this.NextToken(skipComment).str;
                }
                else if (token == enums_1.MLC_O) {
                    this.SkipToEndComment();
                    token = this.NextToken(skipComment).str;
                }
            }
        }
        else {
            token = this.CurrentChar;
            this.Next();
        }
        let range = { start: savedPosition, end: savedPosition + token.length };
        let answer = { str: token, range };
        return answer;
    }
    IsToken(chr) {
        let answer = { first: false, second: 0 };
        if (chr != "") {
            answer = KEYWORDS.is(chr.toLowerCase());
            if (answer.first && answer.second != enums_1.kwdNum._olc && answer.second != enums_1.kwdNum._mlc_o && answer.second != enums_1.kwdNum._mlc_c) {
                answer.first = this.IsStopChar();
            }
            else if (!answer.first && this.IsStopChar()) {
                answer.first = true;
            }
        }
        return answer.first;
    }
    CreateVariable(isPrivate, offset, isConstant = false) {
        let token = this.NextToken();
        let varObject = new CVar(token.str, isPrivate, isConstant, this.ObjKind === vscode_languageserver_1.CompletionItemKind.Class);
        varObject.setRange({ start: token.range.start + offset, end: token.range.end + offset });
        token = this.NextToken();
        let stop = false;
        let comment = "";
        let varTypeStr = "";
        while (!stop && !this.End) {
            switch (token.str) {
                case "(":
                case ")":
                    {
                        stop = true;
                    }
                    break;
                case enums_1.OLC:
                case enums_1.MLC_O:
                    {
                        comment = (token.str == enums_1.OLC) ? this.GetOLC() : this.GetMLC();
                        varObject.Description(comment);
                    }
                    break;
                case "=":
                case ":":
                    {
                        varTypeStr = this.NextToken().str;
                        if (token.str == "=")
                            varObject.setValue(varTypeStr);
                        if (varObject.Type === getTypeStr(enums_1.varType._variant)) {
                            let varTypeTouple = this.GetDataType(varTypeStr);
                            if (varTypeTouple.first) {
                                varObject.setType(varTypeTouple.second);
                            }
                        }
                    }
                    break;
                case ",":
                case ";":
                    {
                        let sToken = token.str;
                        this.SavePos();
                        token = this.NextToken(enums_1.SkipComment.no);
                        if (token.str != enums_1.OLC && token.str != enums_1.MLC_O)
                            this.RestorePos();
                        else {
                            comment = (token.str == enums_1.OLC) ? this.GetOLC() : this.GetMLC();
                            varObject.Description(comment);
                        }
                        if (sToken == ",")
                            this.CreateVariable(isPrivate, this.offset /* this.range.start */, isConstant);
                        stop = true;
                    }
                    break;
            }
            if (!stop)
                token = this.NextToken();
        }
        this.addChild(varObject);
    }
    GetOLC() {
        let comment = "";
        while (this.CurrentChar != "\r" && !this.End) {
            comment += this.CurrentChar;
            this.Next();
        }
        return comment;
    }
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
    SkipToEndComment(isOLC = false) {
        if (isOLC) {
            this.GetOLC();
        }
        else {
            this.GetMLC();
            this.Next();
            this.Next(); //пропустить закрывающий символ "/*"
        }
        this.Skip();
    }
    GetDataType(token) {
        token = token.toLowerCase();
        if (token[0] == "@")
            token = token.substring(1, token.length); //если это какой-то указатель - обрежем собаку
        let answer = { first: false, second: getTypeStr(enums_1.varType._variant) };
        let tmp = TYPES.is(token);
        let isType = tmp.first, typeNum = tmp.second;
        if (!isType) { //не нашли в стандартных типах
            if (token[0] == "\"" || token[0] == "\'") { //это строка
                answer.first = true;
                answer.second = getTypeStr(enums_1.varType._string);
            }
            else if (enums_1.DIGITS.includes(token[0])) { //это число
                answer.first = true;
                answer.second = getTypeStr(enums_1.varType._integer);
            }
            else if (token.toLowerCase() == "true" || token.toLowerCase() == "false") { //это булево
                answer.first = true;
                answer.second = getTypeStr(enums_1.varType._bool);
            }
            else { //надо поискать в именах объявленных и импортированных классов и функций FIXME: переделать
                let baseObject = server_1.getTree();
                let obj;
                if (baseObject != undefined) {
                    for (const iterator of baseObject) {
                        obj = iterator.object.RecursiveFind(token); //FIXME: убрать рекурсивный поиск
                        if (obj != undefined)
                            break;
                    }
                }
                if (obj != undefined) { //ищем в текущем файле и всех импортированных
                    answer.first = true;
                    answer.second = obj.Type;
                }
                else { //иначе ищем в остальных местах
                    let DefArray = defaults_1.getDefaults();
                    let ans = DefArray.find(token); //поиск в дефолтах
                    if (ans != undefined) {
                        answer.first = true;
                        answer.second = ans.returnType();
                    }
                }
            }
        }
        else {
            answer.first = true;
            answer.second = getTypeStr(typeNum);
        }
        return answer;
    }
    CreateMacro(isPrivate) {
        let isMethod = (this.ObjKind == vscode_languageserver_1.CompletionItemKind.Class);
        let range = { start: this.Pos + this.range.start, end: 0 };
        let name = this.NextToken().str;
        let body = this.getObjectBody();
        range.end = this.Pos + this.range.start;
        let macro = new CMacro(body, name, isPrivate, range, isMethod);
        this.addChild(macro);
    }
    CreateClass(isPrivate) {
        let range = { start: this.Pos + this.range.start, end: 0 };
        let parentName = "";
        let name = this.NextToken().str;
        if (name == "(") {
            parentName = this.NextToken().str; //это имя родительского класса
            this.Next();
            name = this.NextToken().str;
        }
        let body = this.getObjectBody();
        range.end = this.Pos + this.range.start;
        let classObj = new CClass(body, name, parentName, isPrivate, range);
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
            let tpl = INTERS.is(nameInter.toLowerCase());
            if (tpl.first) {
                Inters.includeInter(tpl.second);
            }
            else { //это не интер, запросим открытие такого файла
                if (!nameInter.endsWith(".mac"))
                    nameInter = nameInter + ".mac";
                server_1.GetFileRequest(nameInter);
            }
        });
    }
    parse() {
        this.childs = new Array();
        this.Skip();
        let curToken;
        const closeBracket = ")";
        if (this.CurrentChar == "(") {
            let paramString = this.CurrentChar;
            this.Next();
            let savePos = this.Pos;
            curToken = this.NextToken().str;
            if (curToken != ")") {
                this.position = savePos;
                while (this.CurrentChar != closeBracket.toString() && !this.End) {
                    paramString += this.CurrentChar;
                    this.Next();
                }
                paramString += ")";
                this.position = savePos;
                this.CreateVariable(true, this.offset);
            }
            else
                paramString = paramString + curToken; //")"
            let stop = false;
            do {
                curToken = this.NextToken(enums_1.SkipComment.no).str;
                if (curToken == ":")
                    this.setType(this.GetDataType(this.NextToken().str).second);
                else if (curToken == enums_1.OLC || curToken == enums_1.MLC_O) {
                    let comment = (curToken == enums_1.OLC) ? this.GetOLC() : this.GetMLC();
                    this.Description(comment);
                    stop = true;
                }
                else {
                    this.position = savePos;
                    stop = true;
                }
            } while (!stop);
            this.paramStr = paramString;
        }
        while (!this.End) {
            curToken = this.NextToken().str;
            let actionTuple = this.getKeywordNum(curToken);
            if (actionTuple.first) {
                switch (actionTuple.second) {
                    case enums_1.kwdNum._local:
                    case enums_1.kwdNum._private:
                        {
                            curToken = this.NextToken().str;
                            let tmp = this.getKeywordNum(curToken);
                            if (tmp.first) {
                                switch (tmp.second) {
                                    case enums_1.kwdNum._const:
                                        this.CreateVariable(true, this.offset /* this.range.start */, true);
                                        break;
                                    case enums_1.kwdNum._var:
                                        this.CreateVariable(true, this.offset /* this.range.start */);
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
                        this.CreateVariable(false, this.offset /* this.range.start */, true);
                        break;
                    case enums_1.kwdNum._var:
                        this.CreateVariable(false, this.offset /* this.range.start */);
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
}
exports.CBase = CBase;
/** Базовый класс для макросов*/
class CMacro extends CBase {
    constructor(src, name, privateFlag, range, isMethod) {
        super(src, range.start + name.length + 1, isMethod ? vscode_languageserver_1.CompletionItemKind.Method : vscode_languageserver_1.CompletionItemKind.Function);
        this.name = name;
        this.private_ = privateFlag;
        this.range = range;
        this.insertedText = `${name}()`;
    }
    updateCIInfo() {
        this.detail = `${getStrItemKind(this.objKind)}: `;
        this.detail += `${this.name}${this.paramStr}.\nВозвращаемый тип: ${this.Type}`;
    }
}
/** Базовый класс для классов*/
class CClass extends CBase {
    constructor(src, name, parentName, privateFlag, range) {
        super(src, range.start, vscode_languageserver_1.CompletionItemKind.Class);
        this.name = name;
        this.parentName = parentName;
        this.private_ = privateFlag;
        this.insertedText = name;
        this.varType_ = name;
        this.range = range;
        if (parentName.length > 0) {
            //TODO: подгрузить методы и свойства родительского класса
        }
    }
    getParentName() { return this.parentName; }
    updateCIInfo() {
        this.detail = `${getStrItemKind(this.objKind)}: `;
        this.detail += this.name;
    }
}
/**
 * Выполняет проверку необходимости заново распарсить все файлы.
 * Впервые произошло обращение к объекту класса или
 * если размер массива Импортированных модулей изменился
 * производится повторый парсинг всех подгруженных макросов
 */
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