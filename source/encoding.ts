import { Fruition } from "./Fruition.js";
import { Node } from "./Node.js";

export function fruitionToText(fruition: Fruition): string {
    let output = `Fruition: ${fruition.name}`,
        current: Node | null = fruition.entry;
    while (current) {
        output = `${output}\n${current.toString(1)}`;
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
