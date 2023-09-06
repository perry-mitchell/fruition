# Fruition
> Track execution paths and outcomes to form an explanation for understanding what happened

## About

Fruition is a simple harness to record steps of execution by making "notes" (Nodes), which some of these being able to mark _branching_ or _measurements_. It outputs a handy string description so application flow debugging can be improved.

NodeJS v16 and up is supported. Types are provided.

## Usage

To get started, import the `Fruition` class:

```typescript
import { Fruition } from "fruition";

function someFlow(): [number, Fruition] {
    const fruition = new Fruition("some-flow");
    // <some functionality>
    fruition.mark("db lookups");
    // <some functionality>
    if (true) {
        fruition.branch("dev mode", {
            dev: true,
            code: 123
        });
    }
    // Done
    return [1, fruition];
}

// Later
const [result, trace] = someFlow();
console.log(trace.toString());
```

Flow can be improved by adding the `Realisation` class:

```typescript
import { Fruition, Realisation } from "fruition";

function someFlow(): Realisation<number> {
    const fruition = new Fruition("some-flow");
    // <snip>
    return new Realisation(1, fruition);
}

// Later
const realisation = someFlow();
console.log(trace.explain());

realisation.result // 1
realisation.trace // Fruition
```

_TBC_
