import { getIndent } from "./encoding.js";

export class Node {
    protected _description: string;
    protected _nextNode: Node | null = null;

    constructor(description: string) {
        this._description = description;
    }

    get description() {
        return this._description;
    }

    get next(): Node | null {
        return this._nextNode;
    }

    set next(nextNode: Node | null) {
        if (this._nextNode) {
            throw new Error("Cannot change next node");
        }
        this._nextNode = nextNode;
    }

    toString(indent: number = 0) {
        return `${getIndent(indent)}-> ${this.description}`;
    }
}
