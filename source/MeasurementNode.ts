import columnify from "columnify";
import { Node } from "./Node.js";
import { getIndent } from "./encoding.js";

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
                processedMeasurements[`${getIndent(indent + 1)}${key}`] = value;
            }
            const formatted = columnify(processedMeasurements, {
                showHeaders: false
            });
            output = `${output}\n${formatted}`;
        }
        return output;
    }
}
