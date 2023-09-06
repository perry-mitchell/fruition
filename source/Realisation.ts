import { Fruition } from "./Fruition.js";
import { indentString } from "./encoding.js";

export class Realisation<T extends any> {
    protected _result: T;
    protected _trace: Fruition;

    constructor(result: T, trace: Fruition) {
        this._result = result;
        this._trace = trace;
    }

    get result(): T {
        return this._result;
    }

    get trace(): Fruition {
        return this._trace;
    }

    explain(): string {
        return [
            "Result:",
            indentString(JSON.stringify(this.result, undefined, 4), 1),
            "",
            "Trace:",
            this.trace.toString(1)
        ].join("\n");
    }
}
