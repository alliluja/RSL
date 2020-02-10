import {
    CompletionItem,
    CompletionItemKind,
    TextDocumentPositionParams,
    TextDocument,
    Position,
     InsertTextFormat,
     Hover,
     Definition,
     Location,
} from 'vscode-languageserver';

import { DEFAULT_WHITESPACES, DIGITS, STOP_CHARS, t, varType, kwdNum, tokensWithEnd, SkipComment, ObjInfo, intersNum} from './enums';
import { ArrayClass, getDefaults, getCIInfoForArray } from './defaults'
import { getTree, GetFileRequest} from './server';
import { getBankInter} from './inters/bankinter'

let   objCounter:number = 0;

let TYPES: Array<string> = new Array();
    TYPES[varType._variant]      = "variant";
    TYPES[varType._integer]      = "integer";
    TYPES[varType._double]       = "double";
    TYPES[varType._doublel]      = "doublel";
    TYPES[varType._string]       = "string";
    TYPES[varType._bool]         = "bool";
    TYPES[varType._date]         = "date";
    TYPES[varType._time]         = "time";
    TYPES[varType._datetime]     = "datetime";
    TYPES[varType._memaddr]      = "memaddr";
    TYPES[varType._procref]      = "procref";
    TYPES[varType._methodref]    = "methodref";
    TYPES[varType._decimal]      = "decimal";
    TYPES[varType._numeric]      = "numeric";
    TYPES[varType._money]        = "money";
    TYPES[varType._moneyl]       = "moneyl";
    TYPES[varType._specval]      = "specval";

    export function getTypeStr(typeNum:varType): string {
      return TYPES[typeNum];
    }

let KEYWORDS: Array<string> = new Array();
   KEYWORDS[kwdNum._array]      = "array"
   KEYWORDS[kwdNum._end]        = "end"
   KEYWORDS[kwdNum._or]         = "or"
   KEYWORDS[kwdNum._break]      = "break"
   KEYWORDS[kwdNum._file]       = "file"
   KEYWORDS[kwdNum._private]    = "private"
   KEYWORDS[kwdNum._class]      = "class"
   KEYWORDS[kwdNum._for]        = "for"
   KEYWORDS[kwdNum._record]     = "record"
   KEYWORDS[kwdNum._const]      = "const"
   KEYWORDS[kwdNum._if]         = "if"
   KEYWORDS[kwdNum._return]     = "return"
   KEYWORDS[kwdNum._continue]   = "continue"
   KEYWORDS[kwdNum._import]     = "import"
   KEYWORDS[kwdNum._var]        = "var"
   KEYWORDS[kwdNum._cpdos]      = "cpdos"
   KEYWORDS[kwdNum._local]      = "local"
   KEYWORDS[kwdNum._while]      = "while"
   KEYWORDS[kwdNum._cpwin]      = "cpwin"
   KEYWORDS[kwdNum._macro]      = "macro"
   KEYWORDS[kwdNum._with]       = "with"
   KEYWORDS[kwdNum._elif]       = "elif"
   KEYWORDS[kwdNum._not]        = "not"
   KEYWORDS[kwdNum._else]       = "else"
   KEYWORDS[kwdNum._onerror]    = "onerror"
   KEYWORDS[kwdNum._olc]        = "//";
   KEYWORDS[kwdNum._mlc_o]      = "/*";
   KEYWORDS[kwdNum._mlc_c]      = "*/";

let STR_ITEM_KIND: Array<string> = new Array();
   STR_ITEM_KIND[CompletionItemKind.Text]			= "Текст";
   STR_ITEM_KIND[CompletionItemKind.Method]			= "Метод";
   STR_ITEM_KIND[CompletionItemKind.Function]		= "Функция";
   STR_ITEM_KIND[CompletionItemKind.Constructor]	= "Конструктор";
   STR_ITEM_KIND[CompletionItemKind.Field]			= "Поле";
   STR_ITEM_KIND[CompletionItemKind.Variable]		= "Переменная";
   STR_ITEM_KIND[CompletionItemKind.Class]			= "Класс";
   STR_ITEM_KIND[CompletionItemKind.Interface]		= "Интерфейс";
   STR_ITEM_KIND[CompletionItemKind.Module]			= "Модуль";
   STR_ITEM_KIND[CompletionItemKind.Property]		= "Свойство";
   STR_ITEM_KIND[CompletionItemKind.Unit]			= "Unit";
   STR_ITEM_KIND[CompletionItemKind.Value]			= "Значение";
   STR_ITEM_KIND[CompletionItemKind.Enum]			= "Перечисление";
   STR_ITEM_KIND[CompletionItemKind.Keyword]		= "Ключевое слово";
   STR_ITEM_KIND[CompletionItemKind.Snippet]		= "Сниппет";
   STR_ITEM_KIND[CompletionItemKind.Color]			= "Цвет";
   STR_ITEM_KIND[CompletionItemKind.File]			= "Файл";
   STR_ITEM_KIND[CompletionItemKind.Reference]		= "Ссылка";
   STR_ITEM_KIND[CompletionItemKind.Folder]			= "Папка";
   STR_ITEM_KIND[CompletionItemKind.EnumMember]		= "Член перечисления";
   STR_ITEM_KIND[CompletionItemKind.Constant]		= "Константа";
   STR_ITEM_KIND[CompletionItemKind.Struct]			= "Структура";
   STR_ITEM_KIND[CompletionItemKind.Event]			= "Событие";
   STR_ITEM_KIND[CompletionItemKind.Operator]		= "Оператор";
   STR_ITEM_KIND[CompletionItemKind.TypeParameter]	= "Тип параметра";


let INTERS: Array<string> = new Array();
    INTERS[intersNum.bankinter]				= "bankinter";
    INTERS[intersNum.carrydoc]				= "carrydoc";
    INTERS[intersNum.clbinter]				= "clbinter";
    INTERS[intersNum.clninter]				= "clninter";
    INTERS[intersNum.ctginter]				= "ctginter";
    INTERS[intersNum.devinter]				= "devinter";
    INTERS[intersNum.fminter]				= "fminter";
    INTERS[intersNum.rsbusergroupsinter]	= "rsbusergroupsinter";
    INTERS[intersNum.elexchangeinter]		= "elexchangeinter";
    INTERS[intersNum.mcinter]				= "mcinter";
    INTERS[intersNum.currinter]				= "currinter";
    INTERS[intersNum.securityinter]			= "securityinter";
    INTERS[intersNum.rslcommon]				= "rslcommon";
    INTERS[intersNum.toolsinter]			= "toolsinter";

function getStrItemKind(kind:number):string {
   return STR_ITEM_KIND[kind];
}

let CompletionItemArray: Array<CompletionItem> = new Array();

function flushCIArr() {CompletionItemArray.length = 0}

export function getCIArr(tdpp:TextDocumentPositionParams, document:TextDocument/*, tree:CASTBase*/):Array<CompletionItem> {
   flushCIArr();

   let tree: CASTBase;
   let arr = getTree();
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
        let obj:CASTBase;
        let objArr = tree.getActualChilds(num);
        objArr.forEach(element => {
            if (element.getName() == token) obj = element;
        });
        if (obj == undefined) { //obj = tree.Find(token); //если не нашли в местных переменных, поищем рекурсивно
            let objTree:Array<IFAStruct> = getTree();
            for (const iterator of objTree) {
                obj = iterator.object.Find(token);
                if (obj != undefined) break;
            }
        }
        if (obj != undefined) {     //нашли эту переменную
            if(obj.Type() != getTypeStr(varType._variant)) {
                let objClass:CASTBase;
                let objTree:Array<IFAStruct> = getTree();
                for (const iterator of objTree) {
					objClass = iterator.object.Find(obj.Type()); //поищем в дереве что-то с таким названием, как тип этой переменной (предполагаем, что это должен быть класс)
                if (objClass != undefined) break;
                }
                if (objClass != undefined && objClass.getObjType() == CompletionItemKind.Class)
                CompletionItemArray = objClass.getChildsCIInfo(true); //получим всю информацию о детях этого класса
                else { //не нашли в открытом файле - будем искать дальше
                    let Def = getDefaults();
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
            getTree().forEach(element => {
                if (element[1] == tree) CompletionItemArray = CompletionItemArray.concat(element[1].getChildsCIInfo(false, num, true));
                else CompletionItemArray = CompletionItemArray.concat(element[1].getChildsCIInfo(true, 0, false));
            });
            CompletionItemArray = CompletionItemArray.concat(getCIInfoForArray(getDefaults())); //все дефолтные классы, функции и переменные
            CompletionItemArray = CompletionItemArray.concat(Inters.getIntersCIInfo());
       }
   }
    return CompletionItemArray;
}

export function getHover(tdpp:TextDocumentPositionParams, document:TextDocument/* , tree:CASTBase */): Hover {
    let result: Hover = {contents: "Скоро будет подсказка", 
    range: {
        start: { line: 0, character: 0 }, 
        end: { line: 0, character: 0 }
    }};

    let tree: CASTBase;
    let arr = getTree();
    for (const iterator of arr) {
        if (iterator.uri == tdpp.textDocument.uri) {
            tree = iterator.object;
            break;
        }
    }
    
    if (tree != undefined) {
        let curPos = document.offsetAt(tdpp.position);
        let curToken:[string, number, number] = tree.getCurrentToken(curPos);
        let obj:CASTBase;
        let objArr = tree.getActualChilds(curPos);
        objArr.forEach(element => {
            if (element.getName() == curToken[0]) obj = element;
        });
        if (obj == undefined) obj = tree.Find(curToken[0]);
        if (obj != undefined)
        {
            let CIInfo = obj.CIInfo();
            result.contents = CIInfo.detail;
            result.range = {
                start: document.positionAt(curToken[1]), 
                end: document.positionAt(curToken[2])
            }
        }
        else return null;
    }
    else return null;
    return result;
}

export function getDefinitionLocation(tdpp:TextDocumentPositionParams, document:TextDocument/*, tree:CASTBase*/): Definition {
    let result:Definition;
    let tree: CASTBase;
    let arr = getTree();
    for (const iterator of arr) {
        if (iterator.uri == tdpp.textDocument.uri) {
            tree = iterator.object;
            break;
        }
    }
    if (tree != undefined) {
        let curPos = document.offsetAt(tdpp.position);
        let curToken:[string, number, number] = tree.getCurrentToken(curPos);
        let obj:CASTBase;
        let objArr = tree.getActualChilds(curPos);
        objArr.forEach(element => {
            if (element.getName() == curToken[0]) obj = element;
        });
        if (obj == undefined) obj = tree.Find(curToken[0]);
        if (obj != undefined)
        {
            let range = obj.getRange();
            let startPos:Position = document.positionAt(range[0]);
            startPos.line++;
            result = Location.create(tdpp.textDocument.uri, {
                start: startPos, 
                end: startPos
            })
        }
        else return null;
    }
    else return null;
    return result;
}

function isCharInString(strToFind: string, strWhereFind: string): number {
    return strWhereFind.indexOf(strToFind);
}

export function counterReset() {objCounter = 0}

function isInArray<T>(node: T, arr: Array<T>): [boolean, number] {
   let res = arr.indexOf(node);
   return [res >=0, res];
}

function InterNamesProcess(str:string): string[] {
    if (str.indexOf("//") >= 0 || str.indexOf("/*") >= 0) { //если в строку как-то попали комментарии - их надо удалить
    //TODO:
    }
    let tmp: string[] = str.split(",");
    let names: string[] = [];
    tmp.forEach(name => {
        name = name.trim();
        if (name[0] == "\"") name = name.substring(1, name.length);
        if (name[name.length-1] == "\"") name = name.substring(0, name.length-1);
        name = name.trim();
        names.push(name);
    });
    return names;
}

class intersResolve {
    private includedInters: Array<intersNum>;

    constructor(){this.includedInters = new Array();}
    includeInter(num:intersNum) {
        if (!isInArray(num, this.includedInters)[t.boolVal])
            this.includedInters.push(num)
    }

    getIntersCIInfo(): CompletionItem[] {
        let CIInfoArray: CompletionItem[] = new Array();
        this.includedInters.forEach(element => {
            let tmpArr: CompletionItem[];
            switch (element) {
                case intersNum.bankinter			: tmpArr = getCIInfoForArray(getBankInter()); break;
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
            if (tmpArr != undefined) CIInfoArray = CIInfoArray.concat(tmpArr);
            
        });
        return CIInfoArray;
    }
}

let Inters: intersResolve = new intersResolve();

export class CASTBase {
    //Свойства
    protected _childs:      Array<CASTBase>;
    protected _source:      string;
    protected _name:        string;
    protected _isPrivate:   boolean;
    protected _pos:         number;
    protected _range:       [number, number];
    protected _ID:          number;
    protected _objKind:     CompletionItemKind;
    protected _varType:     string;
    protected _description: string;
    protected _descFormat:  InsertTextFormat;
    protected _detail:      string;
    protected _insertedText:string;
    protected _paramStr    : string;


    //МЕтоды
    public isPrivate():boolean {return this._isPrivate}

    public Find (name:string):CASTBase {
       let Obj: CASTBase;
       for (let index = 0; index < this._childs.length; index++) {
            if (this._childs[index]._name.toLowerCase() == name.toLowerCase()) Obj =  this._childs[index];
            else if (Obj == undefined) Obj = this._childs[index].Find(name);
            if (Obj != undefined) break;
       }
       return Obj;
    }
    protected getKeywordNum(token: string): [boolean, number] {
        let answer = isInArray(token.toLowerCase(), KEYWORDS);
        return answer;
    }

    public getChildsCIInfo(isCheckPrivate:boolean = false, position: number = 0, isCheckActual:boolean = false):Array<CompletionItem> {
        let answer:Array<CompletionItem> = new Array();
        this._childs.forEach(element => {
            if (isCheckActual){
                if (element.getRange()[1] < position) {
                    if (isCheckPrivate) {
                        if (!element.isPrivate()) answer.push(element.CIInfo());
                    }
                    else answer.push(element.CIInfo());
                }
                else if (element.isActual(position)){
                let CIArr = element.getChildsCIInfo();
                    CIArr.forEach(element => {
                        answer.push(element);
                    });
                }
            }
            else 
                if (isCheckPrivate) {
                    if (!element.isPrivate()) answer.push(element.CIInfo());
                }
                else answer.push(element.CIInfo());
        });
        return answer;
    }

    public async reParsing(){this._pos = 0; this.exec()}

    public exec() {
        this._childs = new Array();
        this.Skip();
        let curToken: string;
        const closeBracket = ")";
        if (this.CurrentChar == "(") {
            let paramString:string = this.CurrentChar;
            this.Next();
            let savePos:number = this.Pos;
            curToken = this.getNextToken();
            if (curToken != ")"){
                this._pos = savePos;
                while (this.CurrentChar != closeBracket.toString() && !this.End) {
                    paramString += this.CurrentChar;
                    this.Next();
                }
                paramString += ")";
                this._pos = savePos;
                this.CreateVariable(true, this._range[0]);
            }
            else paramString = paramString + curToken; //")"
            let stop = false;
            do {
                curToken = this.getNextToken(SkipComment.no);
                if (curToken == ":") this._varType = this.getType(this.getNextToken())[1];
                else if (curToken == "//" || curToken == "/*") {
                    let comment:string = (curToken == "//")? this.GetOLC(): this.GetMLC();
                    this._description = comment;
                    stop = true;
                }
                else { this._pos = savePos; stop = true;}

            } while (!stop)
            this._paramStr = paramString;
        }

        while (!this.End) {
            curToken = this.getNextToken();
            let actionTuple = this.getKeywordNum(curToken);
            if (actionTuple[t.boolVal]) {
                switch (actionTuple[t.numIndex]) {
                    case kwdNum._local:
                    case kwdNum._private:
                        { 
                            curToken = this.getNextToken();
                            let tmp  = this.getKeywordNum(curToken);
                            if (tmp[t.boolVal]){
                                switch (tmp[t.numIndex]) {
                                    case kwdNum._const: this.CreateVariable(true, this._range[0], true); break;
                                    case kwdNum._var  : this.CreateVariable(true, this._range[0]); break;
                                    case kwdNum._macro: this.CreateMacro(true);    break;
                                    case kwdNum._class: this.CreateClass(true);    break;
                                    default: break;
                                }
                            }
                        } break;
                    case kwdNum._const: this.CreateVariable(false, this._range[0], true); break;
                    case kwdNum._var  : this.CreateVariable(false, this._range[0]); break;
                    case kwdNum._macro: this.CreateMacro(false);    break;
                    case kwdNum._import: this.CreateImport();    break;
                    case kwdNum._class: this.CreateClass(false);    break;
                    default: break;
                }
            }
        }
    }


    public constructor(source: string, objKind = undefined, range:[number, number] = [0,0]) {
        this._source        = source;
        this._name          = "base";
        this._description   = "";
        this._descFormat    = InsertTextFormat.PlainText;
        this._detail        = "";
        this._insertedText  = "";
        this._isPrivate     = true;
        this._childs        = new Array();
        this._pos           = 0;
        this._range         = range;
        this._ID            = objCounter++;
        this._objKind       = objKind == undefined? CompletionItemKind.Unit: objKind;
        this._varType   = getTypeStr(varType._variant);
        this._paramStr  = "";
        this.exec();
    }

    public isActual(pos:number):boolean {return (this._range[0] <= pos && pos <= this._range[1])}

    protected getObjectBody(): string {
        let result  : string;
        let token   : string;
        let savePos : number = this.Pos;
        let inToken : number = 1;
        let outToken: number = 0;
        while (inToken != outToken && !this.End) {
            token = this.getNextToken();
            if (isInArray(token, tokensWithEnd)[t.boolVal]) inToken++;
            else if (token.toLowerCase() == "end") outToken++;
        }
        result = this.Source.substring(savePos, this.Pos);
        return result;
    }

    protected CreateClass(isPrivate:boolean) {
          let range:[number, number] = [0,0];
          let parentName:string = "";
        range[0] = this.Pos + this._range[0];
          let name: string = this.getNextToken();
          if (name == "(") {
            parentName = this.getNextToken(); //это имя родительского класса
            this.Next();
            name = this.getNextToken();
          }
        let body:string = this.getObjectBody();
        range[1] = this.Pos + this._range[0];
        let classObj: CASTClass = new CASTClass(body, name, parentName, isPrivate, range);
        this.addChild(classObj);
    }

    protected CreateImport() {
        let token:string = "";
        while (this.CurrentChar != ";" && !this.End) { //получаем строку до ;
            token += this.CurrentChar;
            this.Next();
        }
        let names: string[] = InterNamesProcess(token);
        names.forEach(nameInter => {
            let tpl = isInArray(nameInter.toLowerCase(), INTERS);
            if (tpl[t.boolVal]) {
                Inters.includeInter(tpl[t.numIndex]);
            }
            else { //это не интер, запросим открытие такого файла
                if (!nameInter.endsWith(".mac")) nameInter = nameInter + ".mac";
                GetFileRequest(nameInter);
            }
        });
    }

    protected CreateMacro(isPrivate:boolean) {
        let isMethod = this.getObjType() == CompletionItemKind.Class;
        let range:[number, number] = [0,0];
        range[0] = this.Pos + this._range[0];
        let name: string = this.getNextToken();
        let body:string = this.getObjectBody();
        range[1] = this.Pos + this._range[0];
        let macro: CASTMacro = new CASTMacro(body, name, isPrivate, range, isMethod);
        this.addChild(macro);
    }

    protected CreateVariable(isPrivate:boolean,offset:number, isConstant:boolean = false) {
        let start:number = offset + this.Pos;
        let token  : string  = this.getNextToken();
        let varObject: CASTVar = new CASTVar(token, isPrivate, isConstant, this.getObjType() == CompletionItemKind.Class);
        varObject.setRange(start, start + token.length);
        token = this.getNextToken();
        let stop     : boolean = false;
        let comment  : string  = "";
        let varTypeStr:string = "";
        while (!stop && !this.End) {
            switch (token) {
                case "(":
                case ")": {stop = true;} break; 
                case "//": 
                case "/*": {
                    comment = (token == "//")? this.GetOLC(): this.GetMLC();
                    varObject.setDescription(comment);
                } break;
                case "=":
                case ":": {
                    varTypeStr = this.getNextToken();
                    if (token == "=") varObject.setValue(varTypeStr);
                    if (varObject.Type() == getTypeStr(varType._variant)) {
                        let varTypeTouple = this.getType(varTypeStr);
                        if (varTypeTouple[t.boolVal])
                        {
                            varObject.setType(varTypeTouple[t.numIndex]);
                        }
                    }
                } break;
                case ";": {
                    let savePos = this.Pos;
                    token = this.getNextToken(SkipComment.no);
                    if (token != "//" && token != "/*") this._pos = savePos;
                    else {
                        comment = (token == "//")? this.GetOLC(): this.GetMLC();
                        varObject.setDescription(comment);
                    }
                    stop = true;
                  } break;
                  case ",": {
                     let savePos = this.Pos;
                     token = this.getNextToken(SkipComment.no);
                     if (token != "//" && token != "/*") this._pos = savePos;
                     else {
                         comment = (token == "//")? this.GetOLC(): this.GetMLC();
                         varObject.setDescription(comment);
                     }
                    this.CreateVariable(isPrivate, this._range[0], isConstant);
                    stop = true;
                } break;
            }
            if (!stop) token = this.getNextToken();
        }
        this.addChild(varObject);
    }

    protected setRange(start:number, end:number):void {
        this._range = [start, end];
    }

    public addChild(node:CASTBase){
        this._childs.push(node);
    }

    public getChilds(){
        return this._childs;
    }
    
    public getActualChilds(position:number, isCheckPrivate:boolean = false){
        let answer:Array<CASTBase> = new Array();
        this._childs.forEach(element => {
                if (element.getRange()[1] < position) {
                    if (isCheckPrivate) {
                        if (!element.isPrivate()) answer.push(element);
                    }
                    else answer.push(element);
                }
                else if (element.isActual(position)){
                let CIArr = element.getChilds();
                    CIArr.forEach(element => {
                        answer.push(element);
                    });
                }
        });
        return answer;
    }

    protected CurIndex(index: number): string { return index < this._source.length ? this._source[index] : ""; }

    public get Source(): string { return this._source; }

    protected get Pos(): number { return this._pos; }

    public getPrivate(): boolean { return this._isPrivate; }

    public setPrivate(flag: boolean) { this._isPrivate = flag; }

    public setDescription(comment:string) { this._description = comment; }

    protected get CurrentChar(): string { return this.CurIndex(this.Pos); }

    protected get End(): boolean { return this.CurrentChar == ""; }

    protected Next(): void { if (!this.End) this._pos++; }

    protected IsWhitespace(chr:string): boolean { return DEFAULT_WHITESPACES.isPresent(chr)/* isCharInString(chr, DEFAULT_WHITESPACES) >= 0; */ }

    protected Skip(): void {  while (this.IsWhitespace(this.CurrentChar) && !this.End) this.Next(); }

    protected GetOLC(): string {
        let comment:string = "";
        while (this.CurrentChar != "\r" && !this.End) {
            comment += this.CurrentChar;
            this.Next();
        }
        return comment;
    }

    protected SkipToEndLine(): void { let temp: string = this.GetOLC(); this.Skip(); }

    protected GetMLC(): string {
        let comment:string = "";
        while (!((this.CurrentChar == "*") && (this.CurIndex(this.Pos + 1) == "/")) && !this.End) {
            comment += this.CurrentChar;
            this.Next();
        }
        this.Next(); this.Next();
        return comment;
    }

    protected SkipToEndComment(): void {
        let temp:string = this.GetMLC();
        this.Next(); this.Next(); //пропустить закрывающий символ "/*"
        if (this.IsWhitespace(this.CurrentChar)) this.Skip();
    }

    protected IsToken(chr: string): boolean {
        let answer: [boolean, number] = [false, 0];
        if (chr != "") {
            answer = isInArray(chr.toLowerCase(), KEYWORDS);
            if (answer[t.boolVal] && answer[t.numIndex] != kwdNum._olc && answer[t.numIndex] != kwdNum._mlc_o && answer[t.numIndex] != kwdNum._mlc_c) {
                answer[t.boolVal] = this.IsStopChar();
            }
            else if (!answer[t.boolVal] && this.IsStopChar()) {
                answer[t.boolVal] = true;
            }
        }
        return answer[t.boolVal];
    }

    protected IsStopCharEx(chr:string): boolean { return isCharInString(chr, STOP_CHARS) >= 0; }

    protected IsStopChar(): boolean { return this.IsStopCharEx(this.CurrentChar); }

    protected IsDigit(str:string): boolean { return isCharInString(str, DIGITS) >= 0; }
    
    public getCurrentToken(_position: number, savePosition: boolean = true): [string, number, number ] {
        let savePos = this.Pos;
        this._pos = _position;
        let res: [string, number, number ] = ["", 0, 0];
        while (!this.IsStopChar() && this.CurrentChar != undefined) {
            this._pos--;
        }
        if (this.IsStopChar()) this.Next();
        res[1] = this.Pos; //start token
        res[0]= this.getNextToken(); //token
        res[2] = this.Pos; //end token
        if (savePosition) this._pos = savePos;
        return res;
    }

    public getPrevToken(_position: number, savePosition:boolean = true):string {
       let savePos = this.Pos;
       this._pos = _position;
       this._pos--; 
       let res:string = "";
       if (this.CurrentChar == ".") {
         this._pos--
         while (!this.IsStopChar() && this.CurrentChar != undefined) {
            this._pos--; 
         }
         res = this._source.substring(this.Pos+1, _position-1);
      }
      if (savePosition) this._pos = savePos;
      return res;
    }

    protected getNextToken(skipComment:SkipComment = SkipComment.yes): string {
        this.Skip();
        let token: string = "";
        if (!this.IsStopChar()) {
            if (this.CurrentChar == "\""){
                let stop:boolean = false;
                token = token + this.CurrentChar;
                this.Next();

                while (!stop && !this.End) {
                    stop = (this.CurrentChar == "\"" && this.CurIndex(this._pos-1) != "\\")?true:false;
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
            if (skipComment == SkipComment.yes) {
                if (token == "//")
                {
                  this.SkipToEndLine();
                  token = this.getNextToken(skipComment);
                }
                else if (token == "/*")
                {
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

    private getType(token: string): [boolean, string] {
        token = token.toLowerCase();
        if (token[0] == "@") token = token.substring(1, token.length); //если это какой-то указатель - обрежем собаку

        let answer:[boolean, string] = [false, getTypeStr(varType._variant)];
        let isType:boolean,
            typeNum:number;
            [isType, typeNum] = isInArray(token, TYPES);

        if (!isType) { //не нашли в стандартных типах
            if (token[0] == "\"" || token[0] == "\'") answer = [true, getTypeStr(varType._string)]; //это строка
            else if ((this.IsDigit(token[0]))) answer = [true, getTypeStr(varType._integer)]; //это число
            else if (token.toLowerCase() == "true" || token.toLowerCase() == "false") answer = [true, getTypeStr(varType._bool)]; //это булево
            else {//TODO: надо поискать в именах объявленных и импортированных классов и функций
                let baseObject: Array <IFAStruct> = getTree();
                let obj: CASTBase;
                if (baseObject != undefined) {
                    for (const iterator of baseObject) {
                        obj = iterator.object.Find(token);
                        if (obj != undefined) break;
                    }
                }
                if (obj != undefined) {                      //ищем в текущем файле и всех импортированных
                    answer = [true, obj.Type()];
                }
                else {                                       //иначе ищем в остальных местах
                    let DefArray:ArrayClass = getDefaults();
                    let ans = DefArray.find(token);          //поиск в дефолтах
                    if (ans != undefined) {
                        answer = [true, ans.returnType()];
                    }
                }
            }
        }
        else answer = [true, getTypeStr(typeNum)];
        return answer;
    }

    public getName(): string {return this._name}
    public getRange(): [number, number] {return this._range}
    public getObjType(): CompletionItemKind {return this._objKind}
    public Type():string {return this._varType;}
    public setType(type:string){this._varType = type}
    public CIInfo(): CompletionItem {
        this.updateCIInfo();
        return {data: this._ID,
            label: this._name,
            documentation: this._description,
            insertTextFormat: this._descFormat,
            kind: this._objKind,
            detail: this._detail,
            insertText: this._insertedText}}

    public updateCIInfo():void {
        throw ("Вызов метода базового класса");
    }
}

class CASTVar extends CASTBase{
    private _value   : string;

    constructor(name:string, privateFlag:boolean, isConstant:boolean, isProperty:boolean){
        super("");
        this._name      = name;
        this._value     = "";
        this._isPrivate = privateFlag;
        this._objKind   = isProperty? CompletionItemKind.Property : (isConstant? CompletionItemKind.Constant: CompletionItemKind.Variable);
        this._insertedText = name;
    }
    public setValue(value:string) {
        this._value = value;
    }
    public updateCIInfo():void {
            this._detail = `${getStrItemKind(this._objKind)}: ${this._name}`;
            if (this._value.length > 0) this._detail += ` = ${this._value}`;
            this._detail +=`,\nтип ${this.Type()}`;
    }
    public isActual(pos:number):boolean {return (this._range[1] < pos)}
}

class CASTMacro extends CASTBase{

    constructor(src:string, name:string, privateFlag:boolean, range:[number, number] = [0,0], isMethod:boolean){
        super(src, isMethod? CompletionItemKind.Method: CompletionItemKind.Function, range);
        this._name      = name;
        this._isPrivate = privateFlag;
        this._insertedText = `${name}()`;
        // this._range = range;
    }

    public updateCIInfo():void {
        this._detail = `${getStrItemKind(this._objKind)}: `;
        this._detail += `${this._name}${this._paramStr}.\nВозвращаемый тип: ${this.Type()}`;
    }
}

class CASTClass extends CASTBase{
    protected _parentName:string;

    constructor(src:string, name:string, parentName:string, privateFlag:boolean, range:[number, number] = [0,0]){
        super(src, CompletionItemKind.Class, range);
          this._name          = name;
          this._parentName    = parentName;
        this._isPrivate     = privateFlag;
        this._insertedText  = name;
        // this._range         = range;
        this._varType       = name;
    }

    public updateCIInfo():void {
        this._detail = `${getStrItemKind(this._objKind)}: `;
        this._detail += this._name;
    }
}

export class Validator {
    private status:boolean;
    private importsSize:number;

    constructor() {
        this.status = true;
        this.importsSize = 0;
    }
    
    /**
     * Выполняет повторый парсинг всех подгруженных макросов
     */
    public exec() {
        let Imports = getTree();
        if (this.status || this.importsSize != Imports.length - 1) {
            this.importsSize = Imports.length - 1;
            this.status = false;
            for (let iterator of Imports) {
                iterator.object.reParsing();
            }
        }
    }
}

export interface IFAStruct {
	uri:string;
	object:CASTBase;
}