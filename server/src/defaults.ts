/**
 * Определение дуфолтных функций, классов и констант,
 * которые могут использоваться в любом месте кода без подгрузки какого-либо макроса или интера
 */

import {CNodeClass, CNode, CNodeFunc} from './extended_h'
import { InsertTextFormat, CompletionItemKind, CompletionItem, MarkupKind } from 'vscode-languageserver';


/**
 * Массив дефолтных классов, функций, переменных
 */
export class ArrayClass {
    private _arr : Array<CNode>;
    public constructor() {this._arr = new Array();}
    public push(node:CNode) {this._arr.push(node)}
    public find(name:string):CNode {
        let res:CNode;
        for (let index = 0; index < this._arr.length; index++) {
            if (this._arr[index].Name().toLowerCase() == name.toLowerCase()) {
                res = this._arr[index];
                break;
            }
        }
        return res;
    }
    public getChilds():Array<CNode> {
        return this._arr;
    }
}

/**
 * Возвращает дефолтные функции, классы, переменные
 */
export function getDefaults() {	return DefaultsArray; }
export function getCIInfoForArray(inputArr: ArrayClass):Array<CompletionItem> {
    let CIArray:Array<CompletionItem> = new Array();
    let CNodeArray:Array<CNode> = inputArr.getChilds();
    CNodeArray.forEach(element => {
        CIArray.push(element.CIInfo())
    });
    return CIArray;
}

/**
 * Содержит дефолтные функции, классы, переменные
 */
let DefaultsArray: ArrayClass = new ArrayClass();


/*───────────────────────────────────────────────────────────────────────────────────────────────────*/
/* Описание Класса TBFile*/
let TBfile: CNodeClass = new CNodeClass(
    "TBFile",
    "tbfile",
    "Класс TBFile",
    {kind: MarkupKind.Markdown, value: "Стандартный класс ```TBfile``` предназначен для работы с таблицами баз данных и представляет собой объектную альтернативу стандартной конструкции языка FILE."},
    "TBfile ( ${1:TableName}${2:[, AttrStr]}${3:[, KeyNum]}${4:[, FileName]}${5:[, DicName]} ); $0" /*подставляемый текст*/
);

/* все методы класса TBfile:
addFilter fldoffset getLE ReadBlob Clear fldsize getLT RecSize delete
getdirect getpos rewind dropFilter getEQ insert SetRecordAddr FileName
GetFldInfo next UnPackVarBuff fldindex getGE Nrecords update fldname
getGT PackVarBuff VarSize fldnumber GetKeyInfo prev WriteBlob */

TBfile.addChild(new CNodeFunc(
    "Update",
    "integer",
    "Метод класса TBFile: bFile.Update();",
	{kind: MarkupKind.Markdown, value: "Процедура обновляет текущую запись в файле ```id```, используя значения полей из буфера данных."},
    "Update (${1:id}${2:[, size]}${3:[, bool]})$0",
    InsertTextFormat.Snippet,
    CompletionItemKind.Method
));

TBfile.addChild(new CNodeFunc(
    "Insert",
    "integer",
    "Метод класса TBFile: bFile.Insert();",
	{kind: MarkupKind.Markdown, value: "Процедура помещает в таблицу (файл) новую запись, используя значения полей из буфера данных. \
	Добавление происходит в соответствии с заданными ключевыми последовательностями."},
    "Insert(${1:id}${2:[, string | size]}${3:[, integer]}${4:[, bool]})$0",
    InsertTextFormat.Snippet,
    CompletionItemKind.Method
));

TBfile.addChild(new CNodeFunc(
    "ReWind",
    "integer",
    "Метод класса TBFile: bFile.ReWind();",
	{kind: MarkupKind.Markdown, value: "Процедура переустанавливает таблицу или файл таким образом, что текущая позиция не изменяется,\
	 но изменяется поведение вызванных после ```rewind``` процедур ```next``` или ```prev```: ```next``` извлечет первую запись, а ```prev``` – последнюю."},
    "ReWind()$0",
    InsertTextFormat.Snippet,
    CompletionItemKind.Method
));

TBfile.addChild(new CNodeFunc(
    "Prev",
    "integer",
    "Метод класса TBFile: bFile.Prev();",
    {kind: MarkupKind.Markdown, value: "Процедура считывает из таблицы или файла предыдущую запись или последнюю, если вызывается после процедуры ```rewind```."},
    "Prev()$0",
    InsertTextFormat.Snippet,
    CompletionItemKind.Method
));

TBfile.addChild(new CNodeFunc(
    "Next",
    "integer",
    "Метод класса TBFile: bFile.Next();",
    {kind: MarkupKind.Markdown, value: "Процедура считывает из таблицы или файла следующую за текущей запись или первую запись, если вызывается после процедуры ```rewind```."},
    "Next()$0",
    InsertTextFormat.Snippet,
    CompletionItemKind.Method
));

TBfile.addChild(new CNodeFunc(
    "getLE",
    "integer",
    "Метод класса TBFile: bFile.getLE();",
    {kind: MarkupKind.Markdown, value: "Осуществляет поиск записи таблицы, значение ключа для которой меньше или равно указанному"},
    "getLE();$0",
    InsertTextFormat.Snippet,
    CompletionItemKind.Method
));

TBfile.addChild(new CNodeFunc(
    "getLT",
    "integer",
    "Метод класса TBFile: bFile.getLT();",
    {kind: MarkupKind.Markdown, value: "Осуществляет поиск записи таблицы, значение ключа для которой меньше указанного"},
    "getLT();$0",
    InsertTextFormat.Snippet,
    CompletionItemKind.Method
    ));

TBfile.addChild(new CNodeFunc(
    "getEQ",
    "integer",
    "Метод класса TBFile: bFile.getEQ();",
    {kind: MarkupKind.Markdown, value: "Осуществляет поиск записи таблицы, значение ключа для которой равно указанному"},
    "getEQ();$0",
    InsertTextFormat.Snippet,
    CompletionItemKind.Method
    ));

TBfile.addChild(new CNodeFunc(
    "getGE",
    "integer",
    "Метод класса TBFile: bFile.getGE()",
    {kind: MarkupKind.Markdown, value: "Осуществляет поиск записи таблицы, значение ключа для которой больше или равно указанному"},
    "getGE();$0",
    InsertTextFormat.Snippet,
    CompletionItemKind.Method
    ));

TBfile.addChild(new CNodeFunc(
    "getGT",
    "integer",
    "Метод класса TBFile: bFile.getGT()",
    {kind: MarkupKind.Markdown, value: "Осуществляет поиск записи таблицы, значение ключа для которой больше указанного"},
    "getGT();$0",
    InsertTextFormat.Snippet,
    CompletionItemKind.Method
    ));

TBfile.addChild(new CNodeFunc(
    "Clear",
    "integer",
    "Метод класса TBFile: bFile.Clear()",
    {kind: MarkupKind.Markdown, value: "Обнуляет буфер записи таблицы базы данных "},
    "Clear();$0",
    InsertTextFormat.Snippet,
    CompletionItemKind.Method
    ));

TBfile.addChild(new CNodeFunc(
    "Delete",
    "integer",
    "Метод класса TBFile: bFile.Delete();",
    {kind: MarkupKind.Markdown, value: "Удаляет текущую запись из файла БД"},
    "Delete();$0",
    InsertTextFormat.Snippet,
    CompletionItemKind.Method
    ));

TBfile.addChild(new CNode(
    "Rec",
    "variable",
    "Свойство класса TBFile: bFile.Rec",
    {kind: MarkupKind.Markdown, value: "Ссылка на объект типа ```RECORD```, при обращении к которому осуществляется доступ к полям записи."},
    "Rec.$0"
    ));

TBfile.addChild(new CNode(
    "KeyNum",
    "integer",
    "Свойство класса TBFile: bFile.KeyNum",
    {kind: MarkupKind.Markdown, value: "Устанавливает или возвращает текущий индекс в таблице."},
    "KeyNum($0)",
    InsertTextFormat.Snippet
    ));

DefaultsArray.push(TBfile);

/*───────────────────────────────────────────────────────────────────────────────────────────────────*/
/*Конец описания класса TBFile*/

/* Описание Класса TArray*/
let TArray: CNodeClass = new CNodeClass(
    "TArray",
    "tarray",
    "Класс TArray",
    {kind: MarkupKind.Markdown, value: "Стандартный класс TArray языка RSL используется для реализации динамического массива. Динамический массив ```TArray``` представляет собой объектную альтернативу стандартной конструкции языка ```ARRAY```. "},
    "TArray ($0);" /*подставляемый текст*/
);

TArray.addChild(new CNode(
    "MarshalByVal",
    "bool",
    "Свойство класса TArray",
    {kind: MarkupKind.Markdown, value: "Определяет, каким образом объекты этого класса передаются в RSCOM. Если свойству присвоено значение TRUE, то объекты передаются по значению. По умолчанию свойство имеет значение FALSE, и, соответственно, объекты класса ```TArray по умолчанию передаются по ссылке.```"},
    "MarshalByVal(${1|true,false|});$0"
    ));

TArray.addChild(new CNodeFunc(
    "Sort",
    "integer",
    "Метод класса TArray",
    {kind: MarkupKind.Markdown, value: "Выполняет сортировку массива ```в соответствии с порядком```, определяемым пользовательским обработчиком. В случае успешного завершения возвращает ```TRUE```. При неудаче – ```FALSE```. Причиной неудачи могут быть неверно заданные параметры."},
    "Sort(${1:callback}, ${2:data});$0"
    ));

DefaultsArray.push(TArray);
/*───────────────────────────────────────────────────────────────────────────────────────────────────*/
/*Конец описания класса TArray*/


/* Описание стандартных фунций*/
let func: CNodeFunc = new CNodeFunc(
    "GetInt",
    "integer",
    "Функция GetInt ( id [, prompt, len [, hide ] ] )",
    {kind: MarkupKind.Markdown, value: "Процедура присваивает введенное пользователем значение переменной типа Integer с именем ```id```. По умолчанию ширина поля ввода равна 12 символам."},
    "GetInt ( ${1:id} ${2:, prompt, len ${3:, hide}} );$0" /*подставляемый текст*/
);
DefaultsArray.push(func);

func = new CNodeFunc(
    "GetDouble",
    "double",
    "Функция GetDouble ( id [, prompt, len [, hide [, pos ] ] ] )",
    {kind: MarkupKind.Markdown, value: "Процедура присваивает введенное пользователем значение переменной типа Double с именем ```id```. По умолчанию ширина поля ввода равна 24 символам."},
    "GetDouble ( ${1:id} ${2:, prompt, len ${3:, hide ${4:, pos}}});$0" /*подставляемый текст*/
);
DefaultsArray.push(func);

func = new CNodeFunc(
	"GetValue",
	"variable",
	"Функция GetValue(param.ReqFindClient.AddressFIAS.RegionCode, \"\");",
	{kind: MarkupKind.Markdown, value: "Получить значение параметра"},
	"GetValue( ${1:value}, ${2:\"\"} );$0" /*подставляемый текст*/
);
DefaultsArray.push(func);

/*ListChapter */





















/*───────────────────────────────────────────────────────────────────────────────────────────────────*/
/*Конец описания стандартных фунций*/


/* Описание спецпеременных*/
let specVar: CNode = new CNode(
    "MFO_Bank",
    "integer",
    "Спецпеременная {MFO_Bank}",
    {kind: MarkupKind.Markdown, value: "БИК банка."},
    "{MFO_Bank}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "KU_Bank",
    "integer",
    "Спецпеременная {KU_Bank}",
    {kind: MarkupKind.Markdown, value: "Код участника банка."},
    "{KU_Bank}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "CORAC_Bank",
    "integer",
    "Спецпеременная {CORAC_Bank}",
    {kind: MarkupKind.Markdown, value: "Корсчет банка в РЦ."},
    "{CORAC_Bank}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "NumDprt",
    "integer",
    "Спецпеременная {NumDprt}",
    {kind: MarkupKind.Markdown, value: "Номер отделения банка."},
    "{NumDprt}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "MFO_RCC",
    "integer",
    "Спецпеременная {MFO_RCC}",
    {kind: MarkupKind.Markdown, value: "БИК банка."},
    "{MFO_RCC}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "KU_RCC",
    "integer",
    "Спецпеременная {KU_RCC}",
    {kind: MarkupKind.Markdown, value: "Код участника РЦ банка."},
    "{KU_RCC}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "Name_Bank",
    "string",
    "Спецпеременная {Name_Bank}",
    {kind: MarkupKind.Markdown, value: "Название банка."},
    "{Name_Bank}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "DEBETRATE",
    "integer",
    "Спецпеременная {DEBETRATE}",
    {kind: MarkupKind.Markdown, value: "Дебетовый счет переоценки."},
    "{DEBETRATE}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "KREDITRATE",
    "integer",
    "Спецпеременная {KREDITRATE}",
    {kind: MarkupKind.Markdown, value: "Кредитовый счет переоценки."},
    "{KREDITRATE}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "CALCRATE",
    "integer",
    "Спецпеременная {CALCRATE}",
    {kind: MarkupKind.Markdown, value: "Счет переоценки рублевых покрытий."},
    "{CALCRATE}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "BASECASH",
    "integer",
    "Спецпеременная {BASECASH}",
    {kind: MarkupKind.Markdown, value: "Счет кассы."},
    "{BASECASH}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "CASHDEP",
    "integer",
    "Спецпеременная {CASHDEP}",
    {kind: MarkupKind.Markdown, value: "Счет кассы вкладчиков."},
    "{CASHDEP}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "TRANDEP",
    "integer",
    "Спецпеременная {TRANDEP}",
    {kind: MarkupKind.Markdown, value: "Транзитный счет вкладчиков."},
    "{TRANDEP}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "IOBAccount",
    "integer",
    "Спецпеременная {IOBAccount}",
    {kind: MarkupKind.Markdown, value: "Счет корреспонденции с очередями."},
    "{IOBAccount}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "OBalance_Index1",
    "integer",
    "Спецпеременная {OBalance_Index1}",
    {kind: MarkupKind.Markdown, value: "Балансовый счет очереди №1."},
    "{OBalance_Index1}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "OBalance_Index2",
    "integer",
    "Спецпеременная {OBalance_Index2}",
    {kind: MarkupKind.Markdown, value: "Балансовый счет очереди №2."},
    "{OBalance_Index2}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "OBalance_IndexU",
    "integer",
    "Спецпеременная {OBalance_IndexU}",
    {kind: MarkupKind.Markdown, value: "Балансовый счет очереди корсчета."},
    "{OBalance_IndexU}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "OBalance_Sys",
    "integer",
    "Спецпеременная {OBalance_Sys}",
    {kind: MarkupKind.Markdown, value: "Системный счет корреспонденции с очередями."},
    "{OBalance_Sys}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "FIO_Book",
    "string",
    "Спецпеременная {FIO_Book}",
    {kind: MarkupKind.Markdown, value: "ФИО главного бухгалтера."},
    "{FIO_Book}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "Name_Boss",
    "string",
    "Спецпеременная {Name_Boss}",
    {kind: MarkupKind.Markdown, value: "Должность управляющего."},
    "{Name_Boss}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "FIO_Boss",
    "string",
    "Спецпеременная {FIO_Boss}",
    {kind: MarkupKind.Markdown, value: "ФИО управляющего."},
    "{FIO_Boss}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "curdate",
    "date",
    "Спецпеременная {curdate}",
    {kind: MarkupKind.Markdown, value: "Дата текущего операционного дня."},
    "{curdate}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "oper",
    "integer",
    "Спецпеременная {oper}",
    {kind: MarkupKind.Markdown, value: "Номер исполнителя, с которым пользователь зарегистрировался в системе."},
    "{oper}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "Version",
    "integer",
    "Спецпеременная {Version}",
    {kind: MarkupKind.Markdown, value: "Номер версии системы."},
    "{Version}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "ModuleNum",
    "integer",
    "Спецпеременная {ModuleNum}",
    {kind: MarkupKind.Markdown, value: "Номер текущего модуля."},
    "{ModuleNum}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "BatchMode",
    "bool",
    "Спецпеременная {BatchMode}",
    {kind: MarkupKind.Markdown, value: "Признак работы в пакетном режиме."},
    "{BatchMode}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "OperDprt",
    "integer",
    "Спецпеременная {OperDprt}",
    {kind: MarkupKind.Markdown, value: "Код филиала, к которому относится операционист."},
    "{OperDprt}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "Post_Addr",
    "string",
    "Спецпеременная {Post_Addr}",
    {kind: MarkupKind.Markdown, value: "Почтовый адрес банка."},
    "{Post_Addr}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);

specVar = new CNode(
    "CreditsOn",
    "bool",
    "Спецпеременная {CreditsOn}",
    {kind: MarkupKind.Markdown, value: "Дополнительная функция - кредиты."},
    "{CreditsOn}", /*подставляемый текст*/
    InsertTextFormat.PlainText
);
DefaultsArray.push(specVar);
