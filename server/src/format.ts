import { tokensWithEnd, KEYWORDS } from "./common";
import { DEFAULT_WHITESPACES, STOP_CHARS, varType, kwdNum, SkipComment, intersNum, OLC, MLC_O, MLC_C, DIGITS } from './enums';

export function FormatCode(text: string, tabSize: number = 4): string {
    const lines = text.split('\n');
    let formattedText = '';
    let indentLevel = 0;
    let isComment = false;

    lines.forEach((line) => {

        let trimmedLine = line.trim();

        //Определяем начало многострочного комментария
        if (trimmedLine.startsWith(MLC_O)) {
            isComment = true
        }

        if (isComment) {
            formattedText += `${line}\n`;
            if (trimmedLine.endsWith(MLC_C)) {
                isComment = false
            }
            return;
        }

        if (trimmedLine.startsWith('//')) {
            formattedText += `${line}\n`;
            return;
        }

        const wordsInLine = extractWordsBeforeComment(trimmedLine);

        wordsInLine.forEach((word, index) => wordsInLine[index] = removeStopCharsAlternative(word))

        trimmedLine = replaceKWords(trimmedLine);

        // Добавляем пробелы вокруг ключевых слов и операторов
        trimmedLine = trimmedLine.replace(/(And|Or|\==|\!=|\<=|\>=|\>|\<)/g, ' $1 ');

        trimmedLine = trimmedLine.replace(/(If|While|For|\;)/g, '$1 ');

        trimmedLine = trimmedLine.replace(/\s+/g, ' ');

        //Удаляем пробелы
        trimmedLine = trimmedLine.trim();

        // Исключения вложенного блока кода для MACRO и END в одной строке.
        if (wordsInLine.some(element => tokensWithEnd._it.includes(element.toLowerCase()))
            && (wordsInLine.some(element => KEYWORDS._it[kwdNum._end] === element.toLowerCase()))) {
            const indent = ' '.repeat(tabSize * indentLevel);
            formattedText += `${indent}${trimmedLine}\n`;
            return;
        }

        // Исключения вложенного блока кода для ELIF.
        if (wordsInLine.some(element => 'else' === element.toLowerCase())
            || wordsInLine.some(element => 'elif' === element.toLowerCase())) {
            const localIndantLevel = Math.max(indentLevel - 1, 0);
            const indent = ' '.repeat(tabSize * localIndantLevel);
            formattedText += `${indent}${trimmedLine}\n`;
            return;
        }

        // Проверьте вложенного блока кода.
        if (wordsInLine.some(element => tokensWithEnd._it.includes(element.toLowerCase()))) {
            // Применить текущий отступ, а затем увеличить его для следующей строки.
            const indent = ' '.repeat(tabSize * indentLevel);
            formattedText += `${indent}${trimmedLine}\n`;
            indentLevel++;
            return; // Перейти к следующей итерации
        }

        // Проверить конец блока
        if (wordsInLine.some(element => KEYWORDS._it[kwdNum._end] === element.toLowerCase())) {
            // Уменьшите отступ, а затем примените
            indentLevel = Math.max(indentLevel - 1, 0);
            const indent = ' '.repeat(tabSize * indentLevel);
            formattedText += `${indent}${trimmedLine}\n`;
            return; // Перейти к следующей итерации
        }

        // Обработка вложенных строк кода, отмеченных '/\t/g'
        const nestedIndentCount = (trimmedLine.match(/\/\\t\/g/g) || []).length;
        indentLevel += nestedIndentCount;
        // Удалите '/\\t/g' для форматирования.
        let cleanedLine = line.replace(/\/\\t\/g/g, '').trim();

        // Применить комбинированный отступ
        const indent = ' '.repeat(tabSize * indentLevel);
        formattedText += `${indent}${cleanedLine}\n`;

        // Сбросить уровень отступа после обработки вложенной строки кода
        indentLevel -= nestedIndentCount;

    });

    return formattedText.trim(); // Обрежьте последнюю строку, чтобы удалить все конечные символы новой строки.
}

function removeStopCharsAlternative(inputString: string): string {
    // Преобразуем STOP_CHARS в массив символов для последующего использования
    const stopCharsArray = Array.from(STOP_CHARS);
    // Разбиваем входную строку на массив символов и фильтруем его
    const filteredChars = Array.from(inputString).filter(char => !stopCharsArray.includes(char));
    // Объединяем отфильтрованные символы обратно в строку
    return filteredChars.join('');
}

function extractWordsBeforeComment(input: string): string[] {
    // Удаляем комментарий и всё, что после него
    const withoutComment = input.split('//')[0];

    // Регулярное выражение для поиска слов, игнорируя кавычки
    // Оно ищет либо последовательности символов вне кавычек, либо последовательности в кавычках, чтобы игнорировать их
    const regex = /"[^"]*"|(\b\w+\b)/g;

    const words: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(withoutComment)) !== null) {
        // Если слово не в кавычках, добавляем его в массив
        if (match[1]) {
            words.push(match[1]);
        }
    }

    return words;
}

function replaceKWords(param: string): string {

    param = param.replace("import", "Import");
    param = param.replace("private", "Private");
    param = param.replace("macro", "MACRO");
    param = param.replace("Private MACRO", "PRIVATE MACRO");

    param = param.replace("and", "And");
    param = param.replace("begaction", "BegAction");
    param = param.replace("break", "Break");
    param = param.replace("codefor", "CodeFor");
    param = param.replace("const", "Const");
    param = param.replace("continue", "Continue");
    param = param.replace("clearrecord", "ClearRecord");
    param = param.replace("callr2m", "CallR2M");
    param = param.replace("debugbreak", "DebugBreak");
    param = param.replace("dttmsplit", "DtTmSplit");
    param = param.replace("datetime", "DateTime");
    param = param.replace("datesplit", "DateSplit");
    param = param.replace("date", "Date");
    param = param.replace("dateshift", "DateShift");
    param = param.replace("endaction", "EndAction");
    param = param.replace("elif", "ElIf");
    param = param.replace("else", "Else");
    param = param.replace("end", "End");
    param = param.replace("exit", "Exit");
    param = param.replace("false", "False");
    param = param.replace("if", "If");
    param = param.replace("integer", "Integer");
    param = param.replace("int", "Int");
    param = param.replace("message", "Message");
    param = param.replace("msgbox", "MsgBox");
    param = param.replace("null", "Null");
    param = param.replace("not", "Not");
    param = param.replace("or", "Or");
    param = param.replace("println", "PrintLn");
    param = param.replace("record", "Record");
    param = param.replace("return", "Return");
    param = param.replace("strlen", "StrLen");
    param = param.replace("strbrk", "StrBrk");
    param = param.replace("substr", "SubStr");
    param = param.replace("string", "String");
    param = param.replace("strset", "StrSet");
    param = param.replace("strupr", "StrUpr");
    param = param.replace("strlwr", "StrLwr");
    param = param.replace("strfor", "StrFor");
    param = param.replace("strsubst", "StrSubst");
    param = param.replace("setparm", "SetParm");
    param = param.replace("trim", "Trim");
    param = param.replace("tooem", "ToOEM");
    param = param.replace("true", "True");
    param = param.replace("toansi", "ToANSI");
    param = param.replace("timesplit", "TimeSplit");
    param = param.replace("time", "Time");
    param = param.replace("var", "Var");
    param = param.replace("valtype", "ValType");
    param = param.replace("while", "While");

    return param;
}