import { tokensWithEnd, KEYWORDS, TYPES } from "./common";
import { DEFAULT_WHITESPACES, STOP_CHARS, varType, kwdNum, SkipComment, OLC, MLC_O, MLC_C, DIGITS } from './enums';

/**
 * Список встроенных функций RSL, которые пишутся с большой буквы.
 * Дополняйте по мере необходимости. Регистр в этом списке — эталонный.
 */
const BUILTIN_FUNCTIONS: string[] = [
    // Вывод / ввод
    'Print', 'PrintLn', 'Message', 'MsgBox', 'MsgBoxEx',
    'GetInt', 'GetDouble', 'GetMoney', 'GetString', 'GetStringR', 'GetDate', 'GetTrue', 'GetTime',
    // Строки
    'StrLen', 'Index', 'StrBrk', 'StrIsNumber', 'SubStr', 'StrSet', 'Trim',
    'StrSplit', 'StrSplit2', 'StrUpr', 'StrLwr', 'CodeFor', 'StrFor', 'StrSubst',
    'ToOEM', 'ToANSI',
    // Преобразование типов
    'ValType', 'Double', 'DoubleL', 'Int', 'String', 'Money', 'MkStr', 'Floor',
    'ASize', 'Date', 'DateSplit', 'Time', 'TimeSplit', 'DtTm', 'DtTmSplit',
    'RubToStr', 'RubToStrAlt', 'CurToStrAlt', 'MonName', 'NumToStr',
    'SetAutoMoneyFloor', 'Round',
    // Параметры процедур
    'GetParm', 'SetParm', 'ParmCount',
    // Математика
    'Abs', 'Min', 'Max', 'Mod', 'Exp', 'Log', 'Log10', 'Pow', 'Sqrt', 'CheckBits',
    // Файлы и БД
    'Open', 'Close', 'Next', 'Prev', 'ReWind', 'Insert', 'Update', 'Delete',
    'GetPos', 'GetDirect', 'GetEQ', 'GetGT', 'GetGE', 'GetLT', 'GetLE',
    'ExistFile', 'Create', 'Clone', 'ViewFile', 'DelFile', 'DropTable',
    'ClearRecord', 'SetBuff', 'Copy', 'CopyBlob', 'KeyNum', 'SetDelim', 'Status',
    'ProcessConTrn', 'ProcessTrn', 'LoopInTrn', 'AbortTrn',
    'SelectFile', 'SelectFolder', 'NeedFreeDB', 'WriteBlob', 'ReadBlob',
    'GetFldInfo', 'GetKeyInfo', 'GetRecordSize', 'GetVarSize', 'FileName',
    'NRecords', 'FldNumber', 'FldName', 'FldIndex', 'FldOffset',
    'ClearStructs', 'PackVarBuff', 'UnPackVarBuff', 'GetMemAddrFrom', 'SetRecordAddr',
    // Управление файлами/каталогами
    'CopyFile', 'RenameFile', 'RemoveFile', 'MakeDir', 'RemoveDir', 'GetCurDir',
    'SplitFile', 'MergeFile', 'FindPath', 'GetSysDir', 'GetIniFileValue', 'GetFileInfo',
    // Классы/объекты
    'GenClassName', 'GenAttach', 'GenObject', 'GenRun', 'GenSetProp', 'GenGetProp',
    'IsEqClass', 'GenPropID', 'R2M', 'CallR2M', 'GenNumProps',
    'ClrRmtOnRelease', 'GetNamedChanel',
    // Прочее
    'ExecMacro', 'ExecMacro2', 'ExecMacroFile', 'ExecMacroModule', 'ReplaceMacro',
    'ExecExp', 'GetEnv', 'RunError', 'Exit', 'SetExitFlag', 'MemSize', 'Version',
    'CurrentLine', 'UserNumber', 'Random', 'System', 'IsStandAlone', 'TestEvent',
    'AddEvent', 'IsGUI', 'ErrPrint', 'ErrBox', 'Trace', 'DebugBreak',
    'ModuleFileName', 'ModuleName', 'PrintModule', 'CmdArgs', 'GetUserName',
    'IsSQL', 'DisableValidation', 'UnderRCWHost', 'GetLocaleInfo', 'GetLangId',
    'IsWeakRef', 'GetObjProps', 'GetObjMethods', 'GetCallStack', 'ClassKind',
    'ShowRSCOMError', 'ZeroValue', 'PrintSymModule', 'PrintFiles', 'InstLoadModule',
    'PrintRefs', 'GCollect', 'StrongRef', 'ShowDictError', 'PrintProps', 'PrintGlobs',
    'PrintLocs', 'PrintStack', 'ConvertDDF', 'CopyTblDef', 'MakeMoney', 'MakeDouble',
    'SplitMoney', 'DateShift', 'IsOutParm', 'GetUIMode', 'SetDefMoneyPrec',
    'StartProg', 'SysGetProperty', 'SysPutProperty', 'RslRegexSearch',
    'SetOutput', 'SetColumn', 'FlushColumn', 'ClearColumn', 'SetDefPrec', 'SetOutHandler',
    'GetPRNInfo', 'SetPRNInfo',
    'Menu', 'RunMenu', 'RunDialog', 'UpdateFields', 'SetFocus', 'DisableFields',
    'EnableFields', 'SetTimer', 'SetScroll', 'FindRow', 'FindCol', 'FillDown',
    'FillUp', 'SetDlgFields', 'ScrollMes', 'UserFill',
    'CallRemoteRsl', 'CreateObject', 'GetObjProps', 'GetObjMethods', 'ClrRmtStubs',
    'PrintObject', 'CreateMarkObj', 'ReadMarkObj', 'WriteByte', 'ReadByte',
];

/**
 * Служебные слова RSL — всегда в нижнем регистре.
 */
const KEYWORDS_LOWER: string[] = [
    'array', 'end', 'or', 'break', 'file', 'private', 'class', 'for', 'record',
    'const', 'if', 'return', 'continue', 'import', 'var', 'cpdos', 'local',
    'while', 'cpwin', 'macro', 'with', 'elif', 'not', 'else', 'onerror',
    'and', 'do', 'exit', 'true', 'false', 'null', 'this',
];

const BUILTIN_MAP: Map<string, string> = new Map(
    BUILTIN_FUNCTIONS.map(f => [f.toLowerCase(), f])
);

const KEYWORD_SET: Set<string> = new Set(KEYWORDS_LOWER);

/**
 * Форматирует код RSL в соответствии с правилами:
 *  - встроенные функции/методы — с большой буквы (PrintLn, MsgBox);
 *  - после имени функции пробел перед скобкой не ставится (PrintLn(...));
 *  - ключевые слова — с маленькой буквы (var, if, while, end);
 *  - между ключевым словом и скобкой — пробел (while (i < 10)).
 */
export function FormatCode(text: string, tabSize: number = 4): string {
    const lines = text.split(/\r?\n/);
    const formattedLines: string[] = [];
    let indentLevel = 0;
    let inBlockComment = false;

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const originalLine = lines[lineIndex];
        let line = originalLine;

        // 1. Обработка многострочных комментариев (учитываем вложенность)
        if (inBlockComment) {
            formattedLines.push(originalLine);
            // Обновляем состояние вложенности по всей строке
            inBlockComment = updateBlockCommentState(originalLine, inBlockComment);
            continue;
        }

        // 2. Строка начинается с блочного комментария?
        const trimmed = line.trim();
        if (trimmed.startsWith(MLC_O)) {
            // Если комментарий закрывается на этой же строке — не входим в состояние
            const state = updateBlockCommentState(trimmed, false);
            formattedLines.push(originalLine);
            inBlockComment = state;
            continue;
        }

        // 3. Однострочный комментарий — оставляем как есть
        if (trimmed.startsWith(OLC)) {
            formattedLines.push(originalLine);
            continue;
        }

        // 4. Разделяем код и комментарий (однострочный // вне строк)
        const { code, comment } = splitCodeAndComment(line);

        // 5. Нормализуем регистр ключевых слов и встроенных функций
        let normalized = normalizeCase(code);

        // 6. Расставляем пробелы
        normalized = applySpacing(normalized);

        // 7. Схлопываем повторные пробелы (не трогая строковые литералы)
        normalized = collapseSpaces(normalized).trim();

        // 8. Определяем, нужно ли уменьшить отступ (end, elif, else)
        const words = extractWords(normalized);
        const lowerWords = words.map(w => w.toLowerCase());

        const startsWithEnd = lowerWords.length > 0 && lowerWords[0] === 'end';
        const startsWithElifElse = lowerWords.length > 0 &&
            (lowerWords[0] === 'elif' || lowerWords[0] === 'else');

        if (startsWithEnd || startsWithElifElse) {
            indentLevel = Math.max(indentLevel - 1, 0);
        }

        // 9. Применяем отступ
        const indent = ' '.repeat(tabSize * indentLevel);
        let resultLine = normalized.length > 0 ? indent + normalized : '';

        // Комментарий в конце строки — добавляем с отступом от кода
        if (comment.length > 0) {
            resultLine = resultLine.length > 0
                ? resultLine + ' ' + comment.trim()
                : indent + comment.trim();
        }

        formattedLines.push(resultLine);

        // 10. Увеличиваем отступ, если строка открывает блок
        const opensBlock = words.some(w => tokensWithEnd.is(w.toLowerCase()).first);
        // Если в этой же строке есть "end" — отступ не увеличиваем
        const hasEnd = lowerWords.some(w => w === 'end');
        if (opensBlock && !hasEnd) {
            indentLevel++;
        }
    }

    return formattedLines.join('\n').replace(/\s+$/, '') + '\n';
}

/* ──────────────────────────── Вспомогательные функции ──────────────────────────── */

/**
 * Обновляет состояние «внутри блочного комментария» с учётом вложенности.
 */
function updateBlockCommentState(line: string, initialState: boolean): boolean {
    let inComment = initialState;
    let i = 0;
    while (i < line.length - 1) {
        if (!inComment && line[i] === '/' && line[i + 1] === '*') {
            inComment = true;
            i += 2;
            continue;
        }
        if (inComment && line[i] === '*' && line[i + 1] === '/') {
            inComment = false;
            i += 2;
            continue;
        }
        i++;
    }
    return inComment;
}

/**
 * Разделяет строку на код и однострочный комментарий (//), не трогая содержимое строк.
 */
function splitCodeAndComment(line: string): { code: string; comment: string } {
    let inString = false;
    let stringChar = '';
    for (let i = 0; i < line.length - 1; i++) {
        const ch = line[i];
        if (inString) {
            if (ch === '\\') { i++; continue; }
            if (ch === stringChar) { inString = false; }
            continue;
        }
        if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
        if (ch === '/' && line[i + 1] === '/') {
            return { code: line.substring(0, i), comment: line.substring(i) };
        }
    }
    return { code: line, comment: '' };
}

/**
 * Нормализует регистр ключевых слов и встроенных функций.
 * Строковые литералы не трогаются.
 */
function normalizeCase(line: string): string {
    return replaceOutsideStrings(line, (word: string) => {
        const lower = word.toLowerCase();
        if (KEYWORD_SET.has(lower)) return lower;
        if (BUILTIN_MAP.has(lower)) return BUILTIN_MAP.get(lower)!;
        return word; // пользовательские имена не трогаем
    });
}

/**
 * Расставляет пробелы:
 *  - между ключевым словом и "(" — пробел (while (…), if (…));
 *  - после имени функции перед "(" — без пробела (PrintLn(…));
 *  - вокруг бинарных операторов — по одному пробелу.
 */
function applySpacing(line: string): string {
    // 1. Убираем пробел между идентификатором и "(" — потом вернём нужный
    let result = line.replace(/([A-Za-zА-Яа-я_][A-Za-zА-Яа-я0-9_]*)\s*\(/g,
        (_m, name: string) => {
            const lower = name.toLowerCase();
            if (KEYWORD_SET.has(lower)) {
                // ключевое слово: пробел перед скобкой
                return `${lower} (`;
            }
            if (BUILTIN_MAP.has(lower)) {
                // встроенная функция: без пробела
                return `${BUILTIN_MAP.get(lower)}(`;
            }
            // пользовательская функция — тоже без пробела (по стилю)
            return `${name}(`;
        });

    // 2. Пробелы вокруг операторов сравнения/арифметики/присваивания
    //    (не трогая строки — упрощённо: сначала режем по кавычкам)
    result = replaceOutsideStrings(result, (chunk: string) => {
        return chunk
            // двойные операторы — раньше одиночных
            .replace(/(==|!=|<=|>=)/g, ' $1 ')
            .replace(/(?<![<>!=])= (?!=)/g, ' = ')
            .replace(/(?<![<>=!])([<>])(?![<>=])/g, ' $1 ')
            .replace(/(?<![-+])([+\-*/])(?![-+=])/g, ' $1 ');
    });

    // 3. Запятая: без пробела слева, с пробелом справа
    result = replaceOutsideStrings(result, (chunk: string) =>
        chunk.replace(/\s*,\s*/g, ', ')
    );

    // 4. Точка с запятой: без пробела перед, пробел после (если не конец строки)
    result = replaceOutsideStrings(result, (chunk: string) =>
        chunk.replace(/\s*;\s*/g, '; ')
    );

    return result;
}

/**
 * Схлопывает повторные пробелы вне строковых литералов.
 */
function collapseSpaces(line: string): string {
    return replaceOutsideStrings(line, (chunk: string) =>
        chunk.replace(/ {2,}/g, ' ')
    );
}

/**
 * Извлекает «слова» (идентификаторы) из строки вне кавычек и комментариев.
 */
function extractWords(line: string): string[] {
    const words: string[] = [];
    replaceOutsideStrings(line, (chunk: string) => {
        const re = /\b[A-Za-zА-Яа-я_][A-Za-zА-Яа-я0-9_]*\b/g;
        let m: RegExpExecArray | null;
        while ((m = re.exec(chunk)) !== null) words.push(m[0]);
        return chunk;
    });
    return words;
}

/**
 * Применяет callback к фрагментам строки ВНЕ строковых литералов.
 * Строковые литералы (в "…" и '…') возвращаются как есть.
 */
function replaceOutsideStrings(line: string, fn: (chunk: string) => string): string {
    let result = '';
    let chunk = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inString) {
            result += ch;
            if (ch === '\\' && i + 1 < line.length) {
                result += line[i + 1];
                i++;
                continue;
            }
            if (ch === stringChar) inString = false;
            continue;
        }
        if (ch === '"' || ch === "'") {
            // применяем fn к накопленному чанку кода
            result += fn(chunk);
            chunk = '';
            inString = true;
            stringChar = ch;
            result += ch;
            continue;
        }
        chunk += ch;
    }
    result += fn(chunk);
    return result;
}