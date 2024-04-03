import { tokensWithEnd, KEYWORDS } from "./common";
import { DEFAULT_WHITESPACES, STOP_CHARS, varType, kwdNum, SkipComment, intersNum, OLC, MLC_O, MLC_C, DIGITS } from './enums';

export function FormatCode(text: string, tabSize: number = 4): string {
    const lines = text.split('\n');
    let formattedText = '';
    let indentLevel = 0;
    let isComment = false;

    lines.forEach((line) => {

        const trimmedLine = line.trim();
        const wordsInLine = trimmedLine.split(' ');

        wordsInLine.forEach((word, index) => wordsInLine[index] = removeStopCharsAlternative(word))

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

        if (trimmedLine.startsWith('//') || (trimmedLine.startsWith('"') && trimmedLine.endsWith('"') || trimmedLine.endsWith('",'))) {
            formattedText += `${line}\n`;
            return;
        }

        // Удаление пробелов перед набором параметров
        line = line.replace(/(\b(?<!\bor\b|\band\b)\w+)\s+\(/g, '$1(')
            .replace(/\)\s+(\w+(?!\bor\b|\band\b)\b)/g, ')$1')
            .replace(/(\bor\b|\band\b)\s+\(/g, '$1 (')
            .replace(/\(\s+/g, '(')
            .replace(/\)\s+/g, ')');

        line = replaceKWords(line);

        // Исключения вложенного блока кода для MACRO END в одной строке.
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

function replaceKWords(param: string): string {

    param.replace("import", "Import");
    param.replace("private", "Private");
    param.replace("macro", "MACRO");
    param.replace("Private MACRO", "PRIVATE MACRO");

    param.replace("and", "And");
    param.replace("begaction", "BegAction");
    param.replace("break", "Break");
    param.replace("codefor", "CodeFor");
    param.replace("const", "Const");
    param.replace("continue", "Continue");
    param.replace("clearrecord", "ClearRecord");
    param.replace("callr2m", "CallR2M");
    param.replace("debugbreak", "DebugBreak");
    param.replace("dttmsplit", "DtTmSplit");
    param.replace("datetime", "DateTime");
    param.replace("datesplit", "DateSplit");
    param.replace("date", "Date");
    param.replace("dateshift", "DateShift");
    param.replace("endaction", "EndAction");
    param.replace("elif", "ElIf");
    param.replace("else", "Else");
    param.replace("end", "End");
    param.replace("exit", "Exit");
    param.replace("false", "False");
    param.replace("if", "If");
    param.replace("integer", "Integer");
    param.replace("int", "Int");
    param.replace("message", "Message");
    param.replace("msgbox", "MsgBox");
    param.replace("null", "Null");
    param.replace("not", "Not");
    param.replace("or", "Or");
    param.replace("println", "PrintLn");
    param.replace("record", "Record");
    param.replace("return", "Return");
    param.replace("strlen", "StrLen");
    param.replace("strbrk", "StrBrk");
    param.replace("substr", "SubStr");
    param.replace("string", "String");
    param.replace("strset", "StrSet");
    param.replace("strupr", "StrUpr");
    param.replace("strlwr", "StrLwr");
    param.replace("strfor", "StrFor");
    param.replace("strsubst", "StrSubst");
    param.replace("setparm", "SetParm");
    param.replace("trim", "Trim");
    param.replace("tooem", "ToOEM");
    param.replace("true", "True");
    param.replace("toansi", "ToANSI");
    param.replace("timesplit", "TimeSplit");
    param.replace("time", "Time");
    param.replace("var", "Var");
    param.replace("valtype", "ValType");
    param.replace("while", "While");

    return param;
}