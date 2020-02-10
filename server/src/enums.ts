/**
 * Константы.
 */
export const DEFAULT_WHITESPACES: string = " \n\r\t";
export const DIGITS = "0123456789";
export const STOP_CHARS: string = " .,()\:;=<>![]" + DEFAULT_WHITESPACES;
export const tokensWithEnd: Array<string> = new Array("class", "macro", "if", "for", "while");


/**
 * Информация об объекте.
 */
export interface ObjInfo {
    name     : string,
    valueType: string
}

/**
 * Для кортежей.
 */
export enum t {
    boolVal, //нулевой элемент - булево
    numIndex //первый элемент  - число
}
/**
 * Для GetNextToken.
 */
export enum SkipComment {
    yes,
    no
}

/**
 * Нумерация типов переменных.
 */
export enum varType {   
    _variant
    , _integer
    , _double
    , _doublel
    , _string
    , _bool
    , _date
    , _time
    , _datetime
    , _memaddr
    , _procref
    , _methodref
    , _decimal
    , _numeric
    , _money
    , _moneyl
    , _specval
}

/**
 * Нумерация ключевых слов.
 */
export enum kwdNum {
    _array
    , _end
    , _or
    , _break
    , _file
    , _private
    , _class
    , _for
    , _record
    , _const
    , _if
    , _return
    , _continue
    , _import
    , _var
    , _cpdos
    , _local
    , _while
    , _cpwin
    , _macro
    , _with
    , _elif
    , _not
    , _else
    , _onerror
    , _olc
    , _mlc_o
    , _mlc_c
}

export enum intersNum {
	bankinter
,	carrydoc
,	clbinter
,	clninter
,	ctginter
,	devinter
,	fminter
,	rsbusergroupsinter
,	elexchangeinter
,	mcinter
,	currinter
,	securityinter
,	rslcommon
,	toolsinter
}