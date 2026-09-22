# Lesson 2 — Interfaces, Object Types & Structural Typing

## Object types

You can describe the shape of an object inline, or give it a name with `interface`
(or `type`):

```ts
// inline
function greet(person: { name: string; age: number }) {
  console.log(`Hi ${person.name}`);
}

// named, with interface
interface Person {
  name: string;
  age: number;
  email?: string;       // `?` = optional property
  readonly id: number;  // can't be reassigned after creation
}

function greet2(person: Person) {
  console.log(`Hi ${person.name}`);
}
```

`interface` and `type` overlap a lot for object shapes. Rule of thumb: use
`interface` for object/class shapes (it supports `extends` and can be reopened —
"declaration merging"); use `type` for unions, tuples, and anything that isn't a
plain object shape. You'll see both in real codebases; don't stress over picking
the "right" one early on.

## Structural typing — the big mindset shift

TypeScript doesn't care what you *named* a type, only whether the *shape* matches.
This is different from Java/C#'s nominal typing, where a class must explicitly
implement/extend to be considered that type.

```ts
interface Point {
  x: number;
  y: number;
}

function distanceFromOrigin(p: Point): number {
  return Math.sqrt(p.x ** 2 + p.y ** 2);
}

const coord = { x: 3, y: 4, label: "home" };
distanceFromOrigin(coord); // OK! `coord` has x and y — extra props are fine here
```

`coord` was never declared as a `Point`. It's accepted because it *structurally*
satisfies `Point` (has at least the required properties with compatible types).
This is sometimes called "duck typing, but checked at compile time."

Note the asymmetry: passing a variable with extra properties is fine, but passing
an **object literal directly** with extra properties is flagged by a special check
called "excess property checking":

```ts
distanceFromOrigin({ x: 3, y: 4, label: "home" }); // ERROR: `label` not in Point
```

This only triggers on literals written right at the call site — it's TypeScript
guessing you probably made a typo, not a fundamental rule about structural typing.

## Extending interfaces

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const rex: Dog = { name: "Rex", breed: "Lab" };
```

## Classes implement interfaces structurally too

```ts
interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

`implements` is mostly a documentation/safety-net tool here — even without it,
any class whose instances have an `area(): number` method would satisfy `Shape`.

## Exercise

Fill in `exercise.ts` in this folder. Check with `npm run check` from the project
root, then run with `node lessons/02-interfaces-and-objects/exercise.ts`.
