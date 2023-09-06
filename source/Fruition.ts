import { BranchNode } from "./BranchNode.js";
import { MeasurementNode } from "./MeasurementNode.js";
import { Node } from "./Node.js"
import { fruitionToText } from "./encoding.js";

/**
 * Class to track execution process through a system, marking and
 *  measuring as it progresses. Use `Fruition#toString` to get the
 *  output.
 */
export class Fruition {
    protected _current: Node;
    protected _entry: Node;
    protected _name: string;

    constructor(name: string = "Fruition") {
        this._entry = this._current = new Node("start");
        this._name = name;
    }

    get current(): Node {
        return this._current;
    }

    get entry(): Node {
        return this._entry;
    }

    get name(): string {
        return this._name;
    }

    branch(description: string, branchName: string, meta: Record<string, any> = {}): typeof this {
        const branch = new BranchNode(description, branchName, meta);
        this.current.next = branch;
        this._current = branch;
        return this;
    }

    mark(description: string): typeof this {
        const node = new Node(description);
        this.current.next = node;
        this._current = node;
        return this;
    }

    measure(description: string, measurements: Record<string, any> | Map<string, any>): typeof this {
        const measure = new MeasurementNode(description, measurements);
        this.current.next = measure;
        this._current = measure;
        return this;
    }

    toString(indent: number = 0): string {
        return fruitionToText(this, indent);
    }
}
