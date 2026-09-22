# Lesson 3 — Union Types, Narrowing & Discriminated Unions

## Union types

A union type means "this value is one of several possible types":

```ts
function printId(id: string | number) {
  console.log(id);
}

printId(101);
printId("abc-101");
```

Inside the function, TypeScript only lets you use operations that are valid for
*every* member of the union. `id.toUpperCase()` would error — `number` doesn't have
that method. To do type-specific things, you need to **narrow**.

## Narrowing

Narrowing = using a runtime check so TypeScript can prove which member of the union
you're dealing with, in a given branch of code. You already did this in Lesson 1 with
`typeof param === "string"`. Other narrowing techniques:

```ts
// typeof — works for primitives (string, number, boolean, etc.)
function format(id: string | number): string {
  if (typeof id === "number") {
    return id.toFixed(2);
  }
  return id.toUpperCase();
}

// Array.isArray — for arrays vs non-arrays
function first(x: string | string[]): string {
  if (Array.isArray(x)) {
    return x[0] ?? "";
  }
  return x;
}

// "in" operator — checks whether a property exists on an object
interface Cat { meow(): void }
interface Dog { bark(): void }

function speak(animal: Cat | Dog) {
  if ("meow" in animal) {
    animal.meow(); // narrowed to Cat
  } else {
    animal.bark(); // narrowed to Dog
  }
}

// instanceof — for class instances
class NetworkError extends Error {}
class ValidationError extends Error {}

function handle(err: NetworkError | ValidationError) {
  if (err instanceof NetworkError) {
    console.log("retry...");
  }
}
```

## Discriminated unions — the pattern you'll use constantly

Give every variant of a union object a shared "tag" property with a distinct literal
value. TypeScript can then narrow the *whole object* just by checking that one field:

```ts
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: string[];
}

interface ErrorState {
  status: "error";
  message: string;
}

type FetchState = LoadingState | SuccessState | ErrorState;

function render(state: FetchState): string {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return `Got ${state.data.length} items`; // state narrowed to SuccessState here
    case "error":
      return `Failed: ${state.message}`; // state narrowed to ErrorState here
  }
}
```

This is the idiomatic way to model "one of several distinct shapes" in TS — far more
common in real code than `instanceof` chains. The `status` field is called the
**discriminant**.

### Exhaustiveness checking

If you add a new variant to `FetchState` later and forget to handle it in the
`switch`, you want a compile error, not a silent bug. The trick: add a `default`
branch that assigns the still-unhandled value to a variable typed `never`:

```ts
function render2(state: FetchState): string {
  switch (state.status) {
    case "loading": return "Loading...";
    case "success": return `Got ${state.data.length} items`;
    case "error": return `Failed: ${state.message}`;
    default:
      const _exhaustive: never = state; // errors if any case above was missed
      return _exhaustive;
  }
}
```

If every case is handled, `state`'s type at the `default` branch is narrowed all the
way down to `never` (nothing left it could be), so assigning it to `never` is fine.
If you add a new variant and forget a case, `state` still has that leftover type in
the `default` branch, and assigning it to `never` fails to compile — that's your
signal.

## Exercise

Fill in `exercise.ts`. Check with `npm run check`, run with
`node lessons/03-unions-and-narrowing/exercise.ts`.
