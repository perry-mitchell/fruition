import columnify from "columnify";
import { Node } from "./Node.js";
import { getIndent, indentString } from "./encoding.js";

export class BranchNode extends Node {
    protected _branchMeta: Record<string, any>;

    constructor(description: string, meta: Record<string, any>) {
        super(description);
        this._branchMeta = meta;
    }

    toString(indent: number = 0) {
        let output = `${getIndent(indent)}~> ${this.description}`;
        if (Object.keys(this._branchMeta).length > 0) {
            const processedMeta = {};
            for (const key in this._branchMeta) {
                processedMeta[key] = this._branchMeta[key];
            }
            const formatted = columnify(processedMeta, {
                columnSplitter: " => ",
                showHeaders: false
            });
            output = `${output}\n${indentString(formatted, indent + 1)}`;
        }
        return output;
    }
}
