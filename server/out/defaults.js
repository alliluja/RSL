"use strict";
/**
 * Определение дуфолтных функций, классов и констант,
 * которые могут использоваться в любом месте кода без подгрузки какого-либо макроса или интера
 */
Object.defineProperty(exports, "__esModule", { value: true });
const extended_h_1 = require("./extended_h");
const vscode_languageserver_1 = require("vscode-languageserver");
/**
 * Массив дефолтных классов, функций, переменных
 */
class ArrayClass {
    constructor() { this._arr = new Array(); }
    push(node) { this._arr.push(node); }
    find(name) {
        let res;
        for (let index = 0; index < this._arr.length; index++) {
            if (this._arr[index].Name().toLowerCase() == name.toLowerCase()) {
                res = this._arr[index];
                break;
            }
        }
        return res;
    }
    getChilds() {
        return this._arr;
    }
}
exports.ArrayClass = ArrayClass;
/**
 * Возвращает дефолтные функции, классы, переменные
 */
function getDefaults() { return DefaultsArray; }
exports.getDefaults = getDefaults;
function getCIInfoForArray(inputArr) {
    let CIArray = new Array();
    let CNodeArray = inputArr.getChilds();
    CNodeArray.forEach(element => {
        CIArray.push(element.CIInfo());
    });
    return CIArray;
}
exports.getCIInfoForArray = getCIInfoForArray;
/**
 * Содержит дефолтные функции, классы, переменные
 */
let DefaultsArray = new ArrayClass();
/*───────────────────────────────────────────────────────────────────────────────────────────────────*/
/* Описание Класса TBFile*/
let TBfile = new extended_h_1.CNodeClass("TBFile", "tbfile", "Класс TBFile", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Стандартный класс ```TBfile``` предназначен для работы с таблицами баз данных и представляет собой объектную альтернативу стандартной конструкции языка FILE." }, "TBfile ( ${1:TableName}${2:[, AttrStr]}${3:[, KeyNum]}${4:[, FileName]}${5:[, DicName]} ); $0" /*подставляемый текст*/);
/* все методы класса TBfile:
addFilter fldoffset getLE ReadBlob Clear fldsize getLT RecSize delete
getdirect getpos rewind dropFilter getEQ insert SetRecordAddr FileName
GetFldInfo next UnPackVarBuff fldindex getGE Nrecords update fldname
getGT PackVarBuff VarSize fldnumber GetKeyInfo prev WriteBlob */
TBfile.addChild(new extended_h_1.CNodeFunc("Update", "integer", "Метод класса TBFile: bFile.Update();", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Процедура обновляет текущую запись в файле ```id```, используя значения полей из буфера данных." }, "Update (${1:id}${2:[, size]}${3:[, bool]})$0", vscode_languageserver_1.InsertTextFormat.Snippet, vscode_languageserver_1.CompletionItemKind.Method));
TBfile.addChild(new extended_h_1.CNodeFunc("Insert", "integer", "Метод класса TBFile: bFile.Insert();", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Процедура помещает в таблицу (файл) новую запись, используя значения полей из буфера данных. \
	Добавление происходит в соответствии с заданными ключевыми последовательностями." }, "Insert(${1:id}${2:[, string | size]}${3:[, integer]}${4:[, bool]})$0", vscode_languageserver_1.InsertTextFormat.Snippet, vscode_languageserver_1.CompletionItemKind.Method));
TBfile.addChild(new extended_h_1.CNodeFunc("ReWind", "integer", "Метод класса TBFile: bFile.ReWind();", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Процедура переустанавливает таблицу или файл таким образом, что текущая позиция не изменяется,\
	 но изменяется поведение вызванных после ```rewind``` процедур ```next``` или ```prev```: ```next``` извлечет первую запись, а ```prev``` – последнюю." }, "ReWind()$0", vscode_languageserver_1.InsertTextFormat.Snippet, vscode_languageserver_1.CompletionItemKind.Method));
TBfile.addChild(new extended_h_1.CNodeFunc("Prev", "integer", "Метод класса TBFile: bFile.Prev();", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Процедура считывает из таблицы или файла предыдущую запись или последнюю, если вызывается после процедуры ```rewind```." }, "Prev()$0", vscode_languageserver_1.InsertTextFormat.Snippet, vscode_languageserver_1.CompletionItemKind.Method));
TBfile.addChild(new extended_h_1.CNodeFunc("Next", "integer", "Метод класса TBFile: bFile.Next();", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Процедура считывает из таблицы или файла следующую за текущей запись или первую запись, если вызывается после процедуры ```rewind```." }, "Next()$0", vscode_languageserver_1.InsertTextFormat.Snippet, vscode_languageserver_1.CompletionItemKind.Method));
TBfile.addChild(new extended_h_1.CNodeFunc("getLE", "integer", "Метод класса TBFile: bFile.getLE();", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Осуществляет поиск записи таблицы, значение ключа для которой меньше или равно указанному" }, "getLE();$0", vscode_languageserver_1.InsertTextFormat.Snippet, vscode_languageserver_1.CompletionItemKind.Method));
TBfile.addChild(new extended_h_1.CNodeFunc("getLT", "integer", "Метод класса TBFile: bFile.getLT();", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Осуществляет поиск записи таблицы, значение ключа для которой меньше указанного" }, "getLT();$0", vscode_languageserver_1.InsertTextFormat.Snippet, vscode_languageserver_1.CompletionItemKind.Method));
TBfile.addChild(new extended_h_1.CNodeFunc("getEQ", "integer", "Метод класса TBFile: bFile.getEQ();", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Осуществляет поиск записи таблицы, значение ключа для которой равно указанному" }, "getEQ();$0", vscode_languageserver_1.InsertTextFormat.Snippet, vscode_languageserver_1.CompletionItemKind.Method));
TBfile.addChild(new extended_h_1.CNodeFunc("getGE", "integer", "Метод класса TBFile: bFile.getGE()", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Осуществляет поиск записи таблицы, значение ключа для которой больше или равно указанному" }, "getGE();$0", vscode_languageserver_1.InsertTextFormat.Snippet, vscode_languageserver_1.CompletionItemKind.Method));
TBfile.addChild(new extended_h_1.CNodeFunc("getGT", "integer", "Метод класса TBFile: bFile.getGT()", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Осуществляет поиск записи таблицы, значение ключа для которой больше указанного" }, "getGT();$0", vscode_languageserver_1.InsertTextFormat.Snippet, vscode_languageserver_1.CompletionItemKind.Method));
TBfile.addChild(new extended_h_1.CNodeFunc("Clear", "integer", "Метод класса TBFile: bFile.Clear()", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Обнуляет буфер записи таблицы базы данных " }, "Clear();$0", vscode_languageserver_1.InsertTextFormat.Snippet, vscode_languageserver_1.CompletionItemKind.Method));
TBfile.addChild(new extended_h_1.CNodeFunc("Delete", "integer", "Метод класса TBFile: bFile.Delete();", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Удаляет текущую запись из файла БД" }, "Delete();$0", vscode_languageserver_1.InsertTextFormat.Snippet, vscode_languageserver_1.CompletionItemKind.Method));
TBfile.addChild(new extended_h_1.CNode("Rec", "variable", "Свойство класса TBFile: bFile.Rec", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Ссылка на объект типа ```RECORD```, при обращении к которому осуществляется доступ к полям записи." }, "Rec.$0"));
TBfile.addChild(new extended_h_1.CNode("KeyNum", "integer", "Свойство класса TBFile: bFile.KeyNum", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Устанавливает или возвращает текущий индекс в таблице." }, "KeyNum($0)", vscode_languageserver_1.InsertTextFormat.Snippet));
DefaultsArray.push(TBfile);
/*───────────────────────────────────────────────────────────────────────────────────────────────────*/
/*Конец описания класса TBFile*/
/* Описание Класса TArray*/
let TArray = new extended_h_1.CNodeClass("TArray", "tarray", "Класс TArray", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Стандартный класс TArray языка RSL используется для реализации динамического массива. Динамический массив ```TArray``` представляет собой объектную альтернативу стандартной конструкции языка ```ARRAY```. " }, "TArray ($0);" /*подставляемый текст*/);
TArray.addChild(new extended_h_1.CNode("MarshalByVal", "bool", "Свойство класса TArray", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Определяет, каким образом объекты этого класса передаются в RSCOM. Если свойству присвоено значение TRUE, то объекты передаются по значению. По умолчанию свойство имеет значение FALSE, и, соответственно, объекты класса ```TArray по умолчанию передаются по ссылке.```" }, "MarshalByVal(${1|true,false|});$0"));
TArray.addChild(new extended_h_1.CNodeFunc("Sort", "integer", "Метод класса TArray", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Выполняет сортировку массива ```в соответствии с порядком```, определяемым пользовательским обработчиком. В случае успешного завершения возвращает ```TRUE```. При неудаче – ```FALSE```. Причиной неудачи могут быть неверно заданные параметры." }, "Sort(${1:callback}, ${2:data});$0"));
DefaultsArray.push(TArray);
/*───────────────────────────────────────────────────────────────────────────────────────────────────*/
/*Конец описания класса TArray*/
/* Описание стандартных фунций*/
let func = new extended_h_1.CNodeFunc("GetInt", "integer", "Функция GetInt ( id [, prompt, len [, hide ] ] )", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Процедура присваивает введенное пользователем значение переменной типа Integer с именем ```id```. По умолчанию ширина поля ввода равна 12 символам." }, "GetInt ( ${1:id} ${2:, prompt, len ${3:, hide}} );$0" /*подставляемый текст*/);
DefaultsArray.push(func);
func = new extended_h_1.CNodeFunc("GetDouble", "double", "Функция GetDouble ( id [, prompt, len [, hide [, pos ] ] ] )", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Процедура присваивает введенное пользователем значение переменной типа Double с именем ```id```. По умолчанию ширина поля ввода равна 24 символам." }, "GetDouble ( ${1:id} ${2:, prompt, len ${3:, hide ${4:, pos}}});$0" /*подставляемый текст*/);
DefaultsArray.push(func);
func = new extended_h_1.CNodeFunc("GetValue", "variable", "Функция GetValue(param.ReqFindClient.AddressFIAS.RegionCode, \"\");", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Получить значение параметра" }, "GetValue( ${1:value}, ${2:\"\"} );$0" /*подставляемый текст*/);
DefaultsArray.push(func);
/*ListChapter */
/*───────────────────────────────────────────────────────────────────────────────────────────────────*/
/*Конец описания стандартных фунций*/
/* Описание спецпеременных*/
let specVar = new extended_h_1.CNode("MFO_Bank", "integer", "Спецпеременная {MFO_Bank}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "БИК банка." }, "{MFO_Bank}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("KU_Bank", "integer", "Спецпеременная {KU_Bank}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Код участника банка." }, "{KU_Bank}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("CORAC_Bank", "integer", "Спецпеременная {CORAC_Bank}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Корсчет банка в РЦ." }, "{CORAC_Bank}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("NumDprt", "integer", "Спецпеременная {NumDprt}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Номер отделения банка." }, "{NumDprt}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("MFO_RCC", "integer", "Спецпеременная {MFO_RCC}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "БИК банка." }, "{MFO_RCC}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("KU_RCC", "integer", "Спецпеременная {KU_RCC}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Код участника РЦ банка." }, "{KU_RCC}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("Name_Bank", "string", "Спецпеременная {Name_Bank}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Название банка." }, "{Name_Bank}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("DEBETRATE", "integer", "Спецпеременная {DEBETRATE}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Дебетовый счет переоценки." }, "{DEBETRATE}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("KREDITRATE", "integer", "Спецпеременная {KREDITRATE}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Кредитовый счет переоценки." }, "{KREDITRATE}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("CALCRATE", "integer", "Спецпеременная {CALCRATE}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Счет переоценки рублевых покрытий." }, "{CALCRATE}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("BASECASH", "integer", "Спецпеременная {BASECASH}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Счет кассы." }, "{BASECASH}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("CASHDEP", "integer", "Спецпеременная {CASHDEP}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Счет кассы вкладчиков." }, "{CASHDEP}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("TRANDEP", "integer", "Спецпеременная {TRANDEP}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Транзитный счет вкладчиков." }, "{TRANDEP}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("IOBAccount", "integer", "Спецпеременная {IOBAccount}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Счет корреспонденции с очередями." }, "{IOBAccount}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("OBalance_Index1", "integer", "Спецпеременная {OBalance_Index1}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Балансовый счет очереди №1." }, "{OBalance_Index1}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("OBalance_Index2", "integer", "Спецпеременная {OBalance_Index2}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Балансовый счет очереди №2." }, "{OBalance_Index2}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("OBalance_IndexU", "integer", "Спецпеременная {OBalance_IndexU}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Балансовый счет очереди корсчета." }, "{OBalance_IndexU}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("OBalance_Sys", "integer", "Спецпеременная {OBalance_Sys}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Системный счет корреспонденции с очередями." }, "{OBalance_Sys}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("FIO_Book", "string", "Спецпеременная {FIO_Book}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "ФИО главного бухгалтера." }, "{FIO_Book}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("Name_Boss", "string", "Спецпеременная {Name_Boss}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Должность управляющего." }, "{Name_Boss}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("FIO_Boss", "string", "Спецпеременная {FIO_Boss}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "ФИО управляющего." }, "{FIO_Boss}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("curdate", "date", "Спецпеременная {curdate}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Дата текущего операционного дня." }, "{curdate}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("oper", "integer", "Спецпеременная {oper}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Номер исполнителя, с которым пользователь зарегистрировался в системе." }, "{oper}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("Version", "integer", "Спецпеременная {Version}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Номер версии системы." }, "{Version}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("ModuleNum", "integer", "Спецпеременная {ModuleNum}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Номер текущего модуля." }, "{ModuleNum}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("BatchMode", "bool", "Спецпеременная {BatchMode}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Признак работы в пакетном режиме." }, "{BatchMode}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("OperDprt", "integer", "Спецпеременная {OperDprt}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Код филиала, к которому относится операционист." }, "{OperDprt}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("Post_Addr", "string", "Спецпеременная {Post_Addr}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Почтовый адрес банка." }, "{Post_Addr}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
specVar = new extended_h_1.CNode("CreditsOn", "bool", "Спецпеременная {CreditsOn}", { kind: vscode_languageserver_1.MarkupKind.Markdown, value: "Дополнительная функция - кредиты." }, "{CreditsOn}", /*подставляемый текст*/ vscode_languageserver_1.InsertTextFormat.PlainText);
DefaultsArray.push(specVar);
//# sourceMappingURL=defaults.js.map