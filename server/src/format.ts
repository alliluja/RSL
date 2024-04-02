export function formatCode(text: string, tabSize: number = 4): string {
    const lines = text.split('\n');
    let formattedText = '';
    let indentLevel = 0;

    lines.forEach((line) => {

        // Удаление пробелов перед набором параметров
        line = line
        .replace(/(\b(?<!\bor\b|\band\b)\w+)\s+\(/g, '$1(')
        .replace(/\)\s+(\w+(?!\bor\b|\band\b)\b)/g, ')$1')
        .replace(/\bor\s+\(/g, 'or (')
        .replace(/\band\s+\(/g, 'and (');

        line.replace ("import",        "Import");
        line.replace ("private",       "Private");
        line.replace ("macro",         "MACRO");
        line.replace ("Private MACRO", "PRIVATE MACRO");
      
        line.replace ("and",           "And");
        line.replace ("begaction",     "BegAction");
        line.replace ("break",         "Break");
        line.replace ("codefor",       "CodeFor");
        line.replace ("const",         "Const");
        line.replace ("continue",      "Continue");
        line.replace ("clearrecord",   "ClearRecord");
        line.replace ("callr2m",       "CallR2M");
        line.replace ("debugbreak",    "DebugBreak");
        line.replace ("dttmsplit",     "DtTmSplit");
        line.replace ("datetime",      "DateTime");
        line.replace ("datesplit",     "DateSplit");
        line.replace ("date",          "Date");
        line.replace ("dateshift",     "DateShift");
        line.replace ("endaction",     "EndAction");
        line.replace ("elif",          "ElIf");
        line.replace ("else",          "Else");
        line.replace ("end",           "End");
        line.replace ("exit",          "Exit");
        line.replace ("false",         "False");
        line.replace ("if",            "If");
        line.replace ("integer",       "Integer");
        line.replace ("int",           "Int");
        line.replace ("message",       "Message");
        line.replace ("msgbox",        "MsgBox");
        line.replace ("null",          "Null");
        line.replace ("not",           "Not");
        line.replace ("or",            "Or");
        line.replace ("println",       "PrintLn");
        line.replace ("record",        "Record");
        line.replace ("return",        "Return");
        line.replace ("strlen",        "StrLen");
        line.replace ("strbrk",        "StrBrk");
        line.replace ("substr",        "SubStr");
        line.replace ("string",        "String");
        line.replace ("strset",        "StrSet");
        line.replace ("strupr",        "StrUpr");
        line.replace ("strlwr",        "StrLwr");
        line.replace ("strfor",        "StrFor");
        line.replace ("strsubst",      "StrSubst");
        line.replace ("setparm",       "SetParm");
        line.replace ("trim",          "Trim");
        line.replace ("tooem",         "ToOEM");
        line.replace ("true",          "True");
        line.replace ("toansi",        "ToANSI");
        line.replace ("timesplit",     "TimeSplit");
        line.replace ("time",          "Time");
        line.replace ("var",           "Var");
        line.replace ("valtype",       "ValType");
        line.replace ("while",         "While");

        const trimmedLine = line.trim();

        // Исключения вложенного блока кода для MACRO END в одной строке.
        if((trimmedLine.toUpperCase().includes('MACRO') 
        || trimmedLine.toUpperCase().includes('CLASS') 
        || trimmedLine.toUpperCase().includes('IF')
        || trimmedLine.toUpperCase().includes('FOR')
        || trimmedLine.toUpperCase().includes('WHILE')) && trimmedLine.toUpperCase().includes('END;') ) {
            const indent = ' '.repeat(tabSize * indentLevel);
            formattedText += `${indent}${trimmedLine}\n`;
            return;
        }

        // Исключения вложенного блока кода для ELIF.
        if(trimmedLine.toUpperCase().includes('ELIF') || trimmedLine.toUpperCase().includes('ELSE')  ) {
            const localIndantLevel = Math.max(indentLevel - 1, 0);
            const indent = ' '.repeat(tabSize * localIndantLevel);
            formattedText += `${indent}${trimmedLine}\n`;
            return;
        }

        // Проверьте вложенного блока кода.
        if (trimmedLine.toUpperCase().includes('MACRO') 
        || trimmedLine.toUpperCase().includes('CLASS') 
        || trimmedLine.toUpperCase().includes('IF')
        || trimmedLine.toUpperCase().includes('FOR')
        || trimmedLine.toUpperCase().includes('WHILE')) {
            // Применить текущий отступ, а затем увеличить его для следующей строки.
            const indent = ' '.repeat(tabSize * indentLevel);
            formattedText += `${indent}${trimmedLine}\n`;
            indentLevel++;
            return; // Перейти к следующей итерации
        }

        // Проверить конец блока
        if (trimmedLine.toUpperCase().includes('END;')) {
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