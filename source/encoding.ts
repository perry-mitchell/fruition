import { Fruition } from "./Fruition.js";
import { Node } from "./Node.js";

export function fruitionToText(fruition: Fruition, indent: number = 0): string {
    let output = `${getIndent(indent)}Fruition: ${fruition.name}`,
        current: Node | null = fruition.entry;
    while (current) {
        output = `${output}\n${current.toString(indent + 1)}`;
        // Next
        current = current.next;
    }
    return output;
}

export function getIndent(indent: number): string {
    let output = "",
        current = indent;
    while (current > 0) {
        current -= 1;
        output = `${output}    `;
    }
    return output;
}

export function indentString(str: string, indent: number): string {
    return str
        .split("\n")
        .map(line => `${getIndent(indent)}${line}`)
        .join("\n");
}
