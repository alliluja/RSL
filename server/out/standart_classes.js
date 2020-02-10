"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CNode {
    constructor(name, type, ret, detail, descr) {
        this._name = name;
        this._type = type;
        this._returnType = ret;
        this._detail = detail;
        this._description = descr;
    }
    get Name() { return this._name; }
    get Info() { return { name: this._name, type: this._type, retType: this._returnType }; }
    get CIInfo() {
        return {
            label: this._name,
            kind: this._type,
            data: objCounter++,
            detail: this._detail,
            documentation: this._description
        };
    }
}
exports.CNode = CNode;
class CNodeFunc extends CNode {
    constructor(name, type, ret, detail, descr) {
        super(name, type, ret, detail, descr);
    }
}
exports.CNodeFunc = CNodeFunc;
class CNodeClass extends CNode {
    constructor(name, type, ret, detail, descr, child) {
        super(name, type, ret, detail, descr);
        this._childs = child;
    }
    get childsInfo() {
        let res = new Array();
        this._childs.forEach(element => {
            res.push(element.Info);
        });
        return res;
    }
    get childsCIInfo() {
        let res = new Array();
        this._childs.forEach(element => {
            res.push(element.CIInfo);
        });
        return res;
    }
}
exports.CNodeClass = CNodeClass;
//# sourceMappingURL=standart_classes.js.map