/**
 * Здесь описания классов, которые надо использовать
 * для интеров, тк инфу из сишников дернуть нереально,
 * для всех интеров придется создать описание самостоятельно
 */

import {ObjInfo} from './enums'
import { CompletionItemKind, InsertTextFormat, CompletionItem, MarkupContent } from 'vscode-languageserver';

/**
 * Базовый класс для описания интеров, используется для констант
 */
export class CNode {
   private _childs: Array<CNode>;
   protected _name			: string;
   protected _description 	: MarkupContent;
   protected _insertedText : string;
   protected _detail : string;
   protected _descFormat 	: InsertTextFormat;
   protected _retType		: string;
   protected _objKind		: CompletionItemKind;
   
   constructor(name:string, valType:string, detail:string, desc:MarkupContent, text: string, format: InsertTextFormat = InsertTextFormat.Snippet) {
      this._childs = new Array();
      this._name 			= name;
      this._description  = desc;
      this._insertedText= text;
      this._detail       = detail;
      this._descFormat	= format;
      this._retType 		= valType;
      this._objKind 		= CompletionItemKind.Variable;
   }
   public Name () {return this._name}
   public returnType ():string {return this._retType}
   public Info(): ObjInfo {return {name: this._name, valueType: this._retType}}
   public CIInfo(): CompletionItem {return {label: this._name, documentation: this._description, insertTextFormat: this._descFormat, kind: this._objKind, detail: this._detail, insertText: this._insertedText}}
   public addChild(node:CNode): void { this._childs.push(node)}
   public ChildsInfo(): Array<ObjInfo> {
      let InfoArray :Array<ObjInfo> = new Array();
      this._childs.forEach(element => {
         InfoArray.push(element.Info())
      });
      return InfoArray;
   }
   public ChildsCIInfo(): Array<CompletionItem> {
      let CIInfoArray :Array<CompletionItem> = new Array();
      this._childs.forEach(element => {
         CIInfoArray.push(element.CIInfo())
      });
      return CIInfoArray;
   }
}

/**
 * Функция и возвращаемое ей значение для CompletionItem.
 */
export class CNodeFunc extends CNode {
   constructor (name:string, valType:string, detail:string, desc:MarkupContent, text: string, format: InsertTextFormat = InsertTextFormat.Snippet, objKind: CompletionItemKind = CompletionItemKind.Function) {
      super(name, valType, detail, desc, text, format);
      this._objKind 		= objKind;
   }
}

/**
 * Класс, содержащий методы и свойства для CompletionItem и определения типа переменной.
 */
export class CNodeClass extends CNode {


   constructor (name:string, valType:string, detail:string, desc:MarkupContent, text: string, format: InsertTextFormat = InsertTextFormat.Snippet) {
      super(name, valType, detail, desc, text, format);
      this._objKind	= CompletionItemKind.Class;
      
   }

}