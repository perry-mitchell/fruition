import { Fruition } from "./Fruition.js";
import { Node } from "./Node.js";

export const INDENT_SPACES = 4;
const SPACE_ENCODING_CHAR = "\u25A1";

export function decodeMultilineEncoding(value: string): string {
    return value.replace(new RegExp(`${SPACE_ENCODING_CHAR}`, "g"), " ");
}

export function encodeMultilineColumn(value: string): string {
    const lines = value.split("\n");
    for (let i = 0; i < lines.length; i += 1) {
        const match = /^(\s+)/.exec(lines[i]);
        if (!match) continue;
        const len = match[1].length;
        lines[i] = `${repeatCharacter(SPACE_ENCODING_CHAR, len)}${lines[i].substring(len)}`;
    }
    return lines.join("\n");
}

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
        output = `${output}${repeatCharacter(" ", INDENT_SPACES)}`;
    }
    return output;
}

export function indentString(str: string, indent: number): string {
    return str
        .split("\n")
        .map(line => `${getIndent(indent)}${line}`)
        .join("\n");
}

function repeatCharacter(char: string, count: number): string {
    return Array(count).join(char);
}
