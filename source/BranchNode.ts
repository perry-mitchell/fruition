import columnify from "columnify";
import { Node } from "./Node.js";
import { getIndent } from "./encoding.js";

export class BranchNode extends Node {
    protected _branchMeta: Record<string, any>;
    protected _branchName: string;

    constructor(description: string, branchName: string, meta: Record<string, any>) {
        super(description);
        this._branchName = branchName;
        this._branchMeta = meta;
    }

    toString(indent: number = 0) {
        let output = `${getIndent(indent)}~> ${this.description}`;
        if (Object.keys(this._branchMeta).length > 0) {
            const processedMeta = {};
            for (const key in this._branchMeta) {
                processedMeta[`${getIndent(indent + 1)}${key}`] = this._branchMeta[key];
            }
            const formatted = columnify(processedMeta, {
                showHeaders: false
            });
            output = `${output}\n${formatted}`;
        }
        return output;
    }
}
