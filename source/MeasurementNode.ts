import columnify from "columnify";
import { Node } from "./Node.js";
import { INDENT_SPACES, decodeMultilineEncoding, encodeMultilineColumn, getIndent, indentString } from "./encoding.js";

export class MeasurementNode extends Node {
    protected _measurements: Map<string, any> = new Map();

    constructor(description: string, measurements: Record<string, any> | Map<string, any>) {
        super(description);
        if (measurements instanceof Map) {
            for (const [key, value] of measurements.entries()) {
                this._measurements.set(key, value);
            }
        } else {
            for (const key in measurements) {
                this._measurements.set(key, measurements[key]);
            }
        }
    }

    toString(indent: number = 0) {
        let output = `${getIndent(indent)}(i) ${this.description}`;
        if (this._measurements.size > 0) {
            const processedMeasurements = {};
            for (const [key, value] of this._measurements.entries()) {
                processedMeasurements[key] = encodeMultilineColumn(JSON.stringify(value, undefined, INDENT_SPACES));
            }
            const formatted = decodeMultilineEncoding(columnify(processedMeasurements, {
                columnSplitter: " | ",
                preserveNewLines: true,
                showHeaders: false
            }));
            output = `${output}\n${indentString(formatted, indent + 1)}`;
        }
        return output;
    }
}
