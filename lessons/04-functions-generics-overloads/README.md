# Lesson 4 — Functions In Depth: Defaults, Rest Params, Generics, Overloads

## Optional and default parameters

```ts
function describeItem(name: string, quantity: number = 1, note?: string): string {
  const base = `${quantity}x ${name}`;
  return note ? `${base} (${note})` : base;
}

describeItem("widget");                    // quantity defaults to 1
describeItem("widget", 5);
describeItem("widget", 5, "backordered");
```

`quantity: number = 1` is a default parameter — if omitted, `1` is used, and the
parameter's type is inferred from the default if you don't annotate it. `note?:
string` is optional (you saw this on object properties in Lesson 2; it works
identically on function parameters) — its actual type inside the function is
`string | undefined`. Default and optional parameters must come after all
required parameters, same rule as most languages with default args.

## Rest parameters

```ts
function sum(...nums: number[]): number {
  return nums.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3);       // nums = [1, 2, 3]
sum();               // nums = []
```

`...nums: number[]` collects any number of trailing arguments into a real array,
typed as `number[]`. Only the last parameter in a function can be a rest
parameter.

## Generic functions

A generic function works over a type you don't know yet, without giving up type
safety (the alternative, `any`, would give up safety entirely):

```ts
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

firstElement([1, 2, 3]);        // T inferred as number, returns number | undefined
firstElement(["a", "b"]);        // T inferred as string, returns string | undefined
```

`<T>` declares a type parameter — a placeholder type, filled in per call site.
TypeScript usually infers `T` from the arguments you pass, same as it infers
regular variable types; you rarely need to write `firstElement<string>([...])`
explicitly.

## Generic constraints

Sometimes a generic type needs to guarantee it has *something* — a plain `T` with
no constraint only lets you do things valid for literally any type (i.e. almost
nothing). `extends` here means "T must have at least this shape," not
inheritance:

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("hello");        // strings have .length
getLength([1, 2, 3]);       // arrays have .length
getLength({ length: 5 });    // any object with a length property works
```

Without the constraint, `item.length` wouldn't compile — TypeScript can't assume
an arbitrary `T` has a `.length` at all.

## Generic classes

```ts
class Box<T> {
  private contents: T;

  constructor(contents: T) {
    this.contents = contents;
  }

  getContents(): T {
    return this.contents;
  }
}

const stringBox = new Box("hello");   // Box<string>, inferred from the constructor arg
const numberBox = new Box(42);         // Box<number>
```

Same idea as generic functions, applied to a whole class — `T` is fixed for the
lifetime of a given instance, chosen when you construct it. Notice the field is
declared and assigned explicitly, not via the `private contents: T` shorthand in
the constructor parameter itself — that shorthand is real, valid TypeScript, but
recall from Lesson 2 that Node's native `.ts` runner (strip-only mode) can't
execute it. Same rule as before: fine with `tsc`, not fine with plain `node
file.ts`.

## Function overloads

Sometimes a function has genuinely different valid call shapes, where the
parameter *types* need to move together as a pair — a plain union parameter can't
express that correlation:

```ts
// Without overloads, this WRONGLY allows mixing types:
function combineLoose(a: string | number, b: string | number): string | number {
  // nothing stops combineLoose("x", 5) here — but that's nonsense for this function
  if (typeof a === "string" && typeof b === "string") return a + b;
  if (typeof a === "number" && typeof b === "number") return a + b;
  throw new Error("Arguments must both be strings or both be numbers");
}

// With overloads, mixed calls are rejected at compile time:
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: string | number, b: string | number): string | number {
  if (typeof a === "string" && typeof b === "string") return a + b;
  if (typeof a === "number" && typeof b === "number") return a + b;
  throw new Error("Arguments must both be strings or both be numbers");
}

combine("a", "b");   // OK, returns string
combine(1, 2);        // OK, returns number
combine("a", 1);       // COMPILE ERROR — no overload matches this call
```

The first two `function combine(...)` lines are **overload signatures** — just
signatures, no bodies, describing the valid call shapes callers can use. The
third is the **implementation signature** — it has the actual body, and its
parameter types must be broad enough to cover every overload, but callers never
see it directly; they only see (and are restricted to) the overload signatures
above it. This is the same "narrow public surface, looser internals" idea from
`unknown` in Lesson 1, applied to call signatures instead of a single value.

## Exercise

Fill in `exercise.ts`. Check with `npm run check`, run with
`node lessons/04-functions-generics-overloads/exercise.ts`.
