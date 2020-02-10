/**
 * Определение функций, классов и констант для BankInter
 */

import {CNodeFunc} from '../extended_h'
import {MarkupKind } from 'vscode-languageserver';
import {ArrayClass} from '../defaults'

/**
 * Содержит функции, классы, переменные
 */
let BankInterArray: ArrayClass = new ArrayClass();

/**
 * Возвращает функции, классы, переменные для BankInter
 */
export function getBankInter() {	return BankInterArray; }

/**
 * Функции интера
 */
let func: CNodeFunc = new CNodeFunc(
    "DocToInn",
    "string",
    "Функция DocToInn (doc:FILE, V_Record, ob:V_Integer, pr:V_Integer, INN:V_String, KPP:V_String, FullINN:V_String):V_String",
    {kind: MarkupKind.Markdown, value: "Функция извлекает из структуры документа значения ИНН\\КПП."},
    "DocToInn (${1:doc:FILE}${2:, V_Record}${3:, ob:V_Integer}${4:, pr:V_Integer}${5:, INN:V_String}${6:, KPP:V_String}${7:, FullINN:V_String});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "GetUIN",
    "bool",
    "Функция GetUIN (doc: FILE, RECORD, TBFILE, TRECHANDLER, UIN: STRING): BOOL",
    {kind: MarkupKind.Markdown, value: "Функция чтения УИН для переданного документа."},
    "GetUIN (${1:doc: FILE, RECORD, TBFILE, TRECHANDLER}, ${2:UIN: STRING});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "SetUIN",
    "bool",
    "Функция SetUIN (doc: FILE, RECORD, TBFILE, TRECHANDLER, UIN: STRING): BOOL",
    {kind: MarkupKind.Markdown, value: "Функция записи УИН для переданного документа."},
    "SetUIN (${1:doc: FILE, RECORD, TBFILE, TRECHANDLER}, ${2:UIN: STRING});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "SizeSum",
    "integer",
    "Функция SizeSum (Val:V_Integer):V_Integer",
    {kind: MarkupKind.Markdown, value: "Функция записи УИН для переданного документа."},
    "SizeSum (${1:Val:V_Integer});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "ActivA",
    "money",
    "Функция ActivA (Account:V_String [, Date:V_Date]):V_Money",
    {kind: MarkupKind.Markdown, value: "Процедура рассчитывает отрицательную величину активного остатка на лицевом счете. Если остаток на счете пассивный или равен нулю, то процедура возвращает нулевое значение."},
    "ActivA (${1:Account:V_String} ${2:[, Date:V_Date]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "DebetA",
    "money",
    "Функция DebetA (Account:V_String [, Date:V_Date] [, Date2:V_Date] [, Chapter:V_Integer]):V_Money",
    {kind: MarkupKind.Markdown, value: "Процедура рассчитывает положительное значение дебетового оборота по лицевому счету."},
    "DebetA (${1:Account:V_String} ${2:[, Date:V_Date]} ${3:[, Date2:V_Date]} ${4:[, Chapter:V_Integer]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "KreditA",
    "money",
    "Функция KreditA (Account:V_String [, Date:V_Date ] [, Date2:V_Date] [, Chapter:V_Integer]):V_Money",
    {kind: MarkupKind.Markdown, value: "Процедура рассчитывает положительное значение дебетового оборота по лицевому счету."},
    "KreditA (${1:Account:V_String} ${2:[, Date:V_Date ]} ${3:[, Date2:V_Date]} ${4:[, Chapter:V_Integer]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "PassivA",
    "money",
    "Функция PassivA (Account:V_String [, Date:V_Date] [, Date2:V_Date] [, Chapter:V_Integer]):V_Money",
    {kind: MarkupKind.Markdown, value: "Процедура рассчитывает положительную величину пассивного остатка на лицевом счете."},
    "PassivA (${1:Account:V_String} ${2:[, Date:V_Date ]} ${3:[, Date2:V_Date]} ${4:[, Chapter:V_Integer]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "RestA",
    "money",
    "Функция RestA (Account:V_String, [Date:V_Date], [Date2:V_Date] [,Chapter:V_Integer]):V_Money",
    {kind: MarkupKind.Markdown, value: "Процедура рассчитывает остаток на указанном лицевом счете."},
    "RestA (${1:Account:V_String} ${2:[, Date:V_Date ]} ${3:[, Date2:V_Date]} ${4:[, Chapter:V_Integer]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "ActivB",
    "money",
    "Функция ActivB (NumPlan:V_Integer, Balance:V_String, Date:V_Date [, Date2:V_Date] [, Chapter:V_Integer] [, Filter:V_String] [, out:V_String]):V_Money",
    {kind: MarkupKind.Markdown, value: "Процедура рассчитывает отрицательную величину активного остатка на балансовом счете."},
    "ActivB (${1:NumPlan:V_Integer}, ${2:Balance:V_String}, ${3:Date:V_Date} ${4:[, Date2:V_Date]} ${5:[, Chapter:V_Integer]} ${6:[, Filter:V_String]} ${7:[, out:V_String]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "DebetB",
    "money",
    "Функция DebetB (NumPlan:V_Integer, Balance:V_String, Date:V_Date, Date2:V_Date [, Chapter:V_Integer] [, Filter:V_String] [, out:V_String]):V_Money",
    {kind: MarkupKind.Markdown, value: "Процедура предназначена для расчета положительной величины дебетового оборота по балансовому счету."},
    "DebetB (${1:NumPlan:V_Integer}, ${2:Balance:V_String}, ${3:Date:V_Date} ${4:[, Date2:V_Date]} ${5:[, Chapter:V_Integer]} ${6:[, Filter:V_String]} ${7:[, out:V_String]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "KreditB",
    "money",
    "Функция KreditB (NumPlan:V_Integer, Balance:V_String, Date:V_Date, Date2:V_Date [, Chapter:V_Integer] [, Filter:V_String] [, out:V_String]):V_Money",
    {kind: MarkupKind.Markdown, value: "Процедура рассчитывает значение кредитового оборота по балансовому счету."},
    "KreditB (${1:NumPlan:V_Integer}, ${2:Balance:V_String}, ${3:Date:V_Date} ${4:[, Date2:V_Date]} ${5:[, Chapter:V_Integer]} ${6:[, Filter:V_String]} ${7:[, out:V_String]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "PassivB",
    "money",
    "Функция PassivB (NumPlan:V_Integer, Balance:V_String, Date:V_Date [, Date2:V_Date] [, Chapter:V_Integer] [, Filter:V_String] [, out:V_String]):V_Money",
    {kind: MarkupKind.Markdown, value: "Процедура рассчитывает положительную величину пассивного остатка на балансовом счете."},
    "PassivB (${1:NumPlan:V_Integer}, ${2:Balance:V_String}, ${3:Date:V_Date} ${4:[, Date2:V_Date]} ${5:[, Chapter:V_Integer]} ${6:[, Filter:V_String]} ${7:[, out:V_String]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "RestB",
    "money",
    "Функция RestB (NumPlan:V_Integer, Balance:V_String, Date:V_Date [, Date2:V_Date] [, Chapter:V_Integer] [, Filter:V_String] [, out:V_String]):V_Money",
    {kind: MarkupKind.Markdown, value: "Процедура рассчитывает остаток на балансовом счете."},
    "RestB (${1:NumPlan:V_Integer}, ${2:Balance:V_String}, ${3:Date:V_Date} ${4:[, Date2:V_Date]} ${5:[, Chapter:V_Integer]} ${6:[, Filter:V_String]} ${7:[, out:V_String]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "GetKey",
    "string",
    "Функция GetKey (Account:V_String [, BIC:V_String]):V_String",
    {kind: MarkupKind.Markdown, value: "Процедура предназначена для ключевания лицевого счета."},
    "GetKey (${1:Account:V_String}${2:[, BIC:V_String]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "IsAccessToAc",
    "integer",
    "Функция IsAccessToAc (Account:V_Integer [, Currency:V_Integer] [, Oper:V_Integer] [, Chapter:V_Integer]):V_Integer",
    {kind: MarkupKind.Markdown, value: "Данная процедура определяет права доступа операциониста к информации о заданном счете."},
    "IsAccessToAc (${1:Account:V_Integer}${2:[, Currency:V_Integer]}${3:[, Oper:V_Integer]}${4:[, Chapter:V_Integer]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "IsAccessToAcAlt",
    "string",
    "Функция IsAccessToAcAlt (Oper:V_Integer, Type:V_String):V_String",
    {kind: MarkupKind.Markdown, value: "Данная процедура позволяет определить права доступа операциониста к информации о лицевых счетах заданного типа."},
    "IsAccessToAcAlt (${1:Oper:V_Integer}, ${2:Type:V_String});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "IsAccessToCl",
    "string",
    "Функция IsAccessToCl (Client:V_Integer [, Oper:V_Integer]):V_String",
    {kind: MarkupKind.Markdown, value: "Процедура определяет права доступа операциониста к информации о заданном клиенте."},
    "IsAccessToCl (${1:Client:V_Integer}${2:[, Oper:V_Integer]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "IsAccessToOperInf",
    "string",
    "Функция IsAccessToOperInf (Oper1:V_Integer [, Oper:V_Integer]):V_String",
    {kind: MarkupKind.Markdown, value: "Данная процедура проверяет (дает возможность определить) права доступа операциониста к информации другого операциониста. Например, пользователь с правами доступа \"Начальник отдела\" может просматривать любую информацию своих подчиненных."},
    "IsAccessToOperInf (${1:Oper1:V_Integer}${2:[, Oper:V_Integer]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "DelRegistryValue",
    "integer",
    "Функция DelRegistryValue (PathKeyVal:V_String, Oper:V_Integer):V_Integer",
    {kind: MarkupKind.Markdown, value: "Процедура предназначена для удаления значения переменной реестра."},
    "DelRegistryValue (${1:PathKeyVal:V_String}, ${2:Oper:V_Integer});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "GetRegistryValue",
    "variant",
    "Функция GetRegistryValue (PathKeyVal:V_String, TypeValue: V_Double, V_Integer, V_String, V_Variant, Param: V_Variant, ErrCode:V_Integer [Val:V_Bool], [Oper:V_Integer]):Variant",
    {kind: MarkupKind.Markdown, value: "Процедура служит для получения значения настройки банка."},
    "GetRegistryValue (${1:PathKeyVal:V_String}, ${2:TypeValue: V_Double}, ${3:V_Integer, V_String}, ${4:V_Variant}, ${5:Param: V_Variant}, ${6:ErrCode:V_Integer}${7:, [Val:V_Bool]}${8:, [Oper:V_Integer]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "SetRegistryValue",
    "variant",
    "Функция SetRegistryValue (PathKey:V_String, TypeValue:V_Integer, Value:V_String, ErrCode:V_Integer [, NumOper:V_Integer])",
    {kind: MarkupKind.Markdown, value: "Процедура устанавливает значение параметра в справочнике настроек программного комплекса RS-Bank (см. режим \"Справочники\\Реестр настроек АБС RS-Bank v.5.50\" подсистемы \"Системный сервис\")."},
    "SetRegistryValue (${1:PathKey:V_String}, ${2:TypeValue:V_Integer}, ${3:Value:V_String}, ${4:ErrCode:V_Integer}${5:[, NumOper:V_Integer]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "GetIniString",
    "variant",
    "Функция GetIniString (Keyname:V_String [, Filename:V_String] [, DisableMes:V_Bool]):Variant",
    {kind: MarkupKind.Markdown, value: "Процедура предназначена для получения значения переменной с именем ```Keyname```, заданной в файле настроек программного комплекса RS-Bank v.5.50 ```bank.ini```. Если имя файла настроек отлично от стандартного имени bank.ini, то его необходимо определить, задав параметр ```Filename```."},
    "GetIniString (${1:Keyname:V_String}${2:[, Filename:V_String]}${3:[, DisableMes:V_Bool]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "RslCopyFile",
    "integer",
    "Функция RslCopyFile (Source:V_String , Target:V_String):V_Integer",
    {kind: MarkupKind.Markdown, value: "Процедура копирования файлов."},
    "RslCopyFile (${1:Source:V_String}, ${2:Target:V_String});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "AddDateOpByAcc",
    "integer",
    "Функция AddDateOpByAcc (dateOp: V_Record):Integer",
    {kind: MarkupKind.Markdown, value: "Функция предназначена для добавления операции по счету. При этом выполняются все системные проверки корректности параметров. Если необходимо добавить операцию \"до востребования\", то в поле NDays необходимо указать значение \"-1\"."},
    "AddDateOpByAcc (${1:dateOp: V_Record});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "GetKeyPos",
    "integer",
    "Функция GetKeyPos ():Integer",
    {kind: MarkupKind.Markdown, value: "Процедура возвращает позицию ключевого символа в лицевом счете."},
    "GetKeyPos ();$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "InputAccount",
    "integer",
    "Функция InputAccount (Chapter:Integer, CodeCurrency:Integer, account:String):Integer",
    {kind: MarkupKind.Markdown, value: "С помощью данной процедуры вызывает панель для ввода счета."},
    "InputAccount (${1:Chapter:Integer}, ${2:CodeCurrency:Integer}, ${3:account:String});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "EditAccount",
    "integer",
    "Функция EditAccount (Chapter:Integer, CodeCurrency:Integer, account:String):Integer",
    {kind: MarkupKind.Markdown, value: "С помощью данной процедуры вызывает панель редактирования счета."},
    "EditAccount (${1:Chapter:Integer}, ${2:CodeCurrency:Integer}, ${3:account:String});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "HaveClientAccount",
    "bool",
    "Функция HaveClientAccount (ClientId:Integer, [onlyOpened:Bool]):Bool",
    {kind: MarkupKind.Markdown, value: "Функция предназначена для проверки наличия у клиента счетов в подсистеме \"Многовалютный ОДБ\"."},
    "HaveClientAccount (${1:ClientId:Integer}${2:[, onlyOpened:Bool]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "ViewAccount",
    "integer",
    "Функция ViewAccount (Chapter: V_Integer, CodeCurrency: V_Integer, Account: V_String): V_Integer",
    {kind: MarkupKind.Markdown, value: "С помощью данной функции вызывается панель, предназначенная только для просмотра данных о лицевом счете, редактирование в панели запрещено."},
    "ViewAccount (${1:Chapter: V_Integer}, ${2:CodeCurrency: V_Integer}, ${3:Account: V_String});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "Insert_AcArest",
    "integer",
    "Функция Insert_AcArest (StopMesID:V_Integer, MakeArest:V_Bool, FillCtg:V_Bool, datepr:V_Date, type:V_String, act: V_Integer]):V_Integer",
    {kind: MarkupKind.Markdown, value: "С помощью данной функции осуществляется вставка записи в файл базы данных ac_arest.dbt и, в случае необходимости, изменение типа соответствующего счета и добавление требуемой категории."},
    "Insert_AcArest (${1:StopMesID:V_Integer}, ${2:MakeArest:V_Bool}, ${3:FillCtg:V_Bool}, ${4:datepr:V_Date}, ${5:type:V_String}, ${6:act: V_Integer});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "Insert_StopOper",
    "integer",
    "Функция Insert_StopOper (StopMesID:V_Integer, PathDir:V_String):V_Integer",
    {kind: MarkupKind.Markdown, value: "С помощью данной функции осуществляется вставка записи в файл базы данных ```stop_op.dbt``` и сохранение копии загруженного текстового сообщения из каталога, заданного в параметре ```PathDir```, в файле базы данных ```st_binms.dbt```. В случае успешного завершения операции значение параметра StopMesID становится равным идентификатору записи, вставленной в файл базы данных ```stop_op.dbt```. Заполнение буфера добавляемой записи осуществляется в ```RSL```"},
    "Insert_StopOper (${1:StopMesID:V_Integer}, ${2:PathDir:V_String});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "Insert_RepAccSum",
    "integer",
    "Функция Insert_RepAccSum (StopMesID:V_Integer):V_Integer",
    {kind: MarkupKind.Markdown, value: "Функция используется для формирования сообщения об остатках для всех счетов из загружаемого сообщения с идентификатором ```StopMesID``` из файла базы данных ```stop_op.dbt```."},
    "Insert_RepAccSum (${1:StopMesID:V_Integer});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "ListAccount",
    "integer",
    "Функция ListAccount (chapter:V_Integer, currency:V_Integer, account:V_String, [startAccount:V_String], [OCFlag:V_Integer]):V_Bool",
    {kind: MarkupKind.Markdown, value: "С помощью данной процедуры осуществляется выбор лицевого счета из предоставляемого системой списка лицевых счетов."},
    "ListAccount (${1:chapter:V_Integer}, ${2:currency:V_Integer}, ${3:account:V_String}${4:[, startAccount:V_String]}${5:[, OCFlag:V_Integer]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);

func = new CNodeFunc(
    "ListAccountOB",
    "integer",
    "Функция ListAccountOB (Account:V_String [, Chapter:V_Integer] [, Curr: V_Integer]):V_Bool",
    {kind: MarkupKind.Markdown, value: "С помощью данной процедуры осуществляется выбор лицевого счета из предоставляемого системой списка лицевых счетов."},
    "ListAccountOB (${1:Account:V_String}${2:[, Chapter:V_Integer]}${3:[, Curr: V_Integer]});$0" /*подставляемый текст*/
);
BankInterArray.push(func);
