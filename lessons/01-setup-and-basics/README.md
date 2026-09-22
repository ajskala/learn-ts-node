# Lesson 1 — Setup & Basic Types

## Why TypeScript?

TypeScript is JavaScript plus a type system checked at compile time. It compiles down
to plain JS — the types never exist at runtime, they only exist to catch mistakes
*before* you run the code. Since you already know another typed-ish language, think of
it as: JS's dynamic runtime + an optional static type layer on top, and that layer is
**structural**, not nominal (more on that in Lesson 4).

## How this workspace runs

- `node some-file.ts` — runs it directly. Your Node version strips the types and
  executes the plain JS. It does **not** check the types are correct.
- `npm run check` — runs `tsc --noEmit`, which actually type-checks everything under
  `lessons/` and reports errors, without producing output files.

Use `npm run check` constantly. That's where TypeScript actually helps you.

## The basics

```ts
let age: number = 34;
let name: string = "AJ";
let isAdmin: boolean = true;
let tags: string[] = ["a", "b"];
let pair: [string, number] = ["x", 1]; // tuple: fixed length, fixed types per slot

// You rarely need to annotate variables with primitive literals —
// TypeScript infers the type from the initializer:
let inferred = 34; // inferred as number, still fully type-checked

// function parameter and return types:
function add(a: number, b: number): number {
  return a + b;
}

// `any` disables type checking for that value — avoid it.
// `unknown` is the type-safe version: you must narrow it before using it.
function logValue(v: unknown) {
  if (typeof v === "string") {
    console.log(v.toUpperCase()); // OK, narrowed to string here
  }
}
```

Key mindset shift if you're coming from a language like Java/C#: TypeScript's types
are **erased entirely** at compile time and are **structural** — two types with the
same shape are compatible even if unrelated by name. There's no runtime `instanceof`
equivalent for plain object types.

## Exercise

Open `exercise.ts` in this folder. Fill in the `TODO`s. Then run:

```
cd ~/learn-ts-node
npm run check
```

Fix errors until `tsc` reports none. Then run it to see the output:

```
node lessons/01-setup-and-basics/exercise.ts
```
