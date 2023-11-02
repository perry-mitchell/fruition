import columnify from "columnify";
import { Node } from "./Node.js";
import { INDENT_SPACES, decodeMultilineEncoding, encodeMultilineColumn, getIndent, indentString } from "./encoding.js";

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
                processedMeta[key] = encodeMultilineColumn(JSON.stringify(this._branchMeta[key], undefined, INDENT_SPACES));
            }
            const formatted = decodeMultilineEncoding(columnify(processedMeta, {
                columnSplitter: " | ",
                preserveNewLines: true,
                showHeaders: false
            }));
            output = `${output}\n${indentString(formatted, indent + 1)}`;
        }
        return output;
    }
}
