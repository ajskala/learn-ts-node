# learn-ts-node

Structured, self-checking lessons for learning TypeScript and Node.js. Each lesson
has a `README.md` (concepts) and an `exercise.ts` (TODOs you fill in yourself).
Your work is checked two ways: `tsc` for type-correctness, and actually running the
file with Node to see real output.

## Prerequisites

- **Node.js v22.6 or later** (built and verified on v26.8.1). This project relies on
  Node's native ability to run `.ts` files directly (`node file.ts`) via built-in
  TypeScript type-stripping — no build step, no `ts-node`, no bundler. Older Node
  versions don't have this. Check your version with `node --version`; if you need
  to install or upgrade, get it from [nodejs.org](https://nodejs.org) or via a
  version manager like [nvm](https://github.com/nvm-sh/nvm) or
  `brew install node` on macOS.
- **npm** (ships with Node).

> Node's type-stripping only *erases* type annotations — it can't compile
> TypeScript-only syntax that generates different code (constructor parameter
> properties, `enum`, decorators, namespaces). Lesson 2 walks through hitting this
> limitation directly and how to work around it. This is a real constraint of
> running `.ts` files directly through Node, not a bug in the lessons.

## Setup

```
git clone https://github.com/ajskala/learn-ts-node.git
cd learn-ts-node
npm install          # installs TypeScript as a devDependency
npm run check         # should report no errors — confirms your setup works
```

## Workflow for every lesson

```
npm run check                                # type-checks everything under lessons/
node lessons/<lesson-folder>/exercise.ts      # runs one lesson's exercise
```

Read a lesson's `README.md` first, then fill in the `TODO`s in its `exercise.ts`.
Iterate with `npm run check` until it's clean, then run the file to see the actual
output.

## Lessons

1. **`01-setup-and-basics`** — basic types, type inference, `unknown` vs `any`.
2. **`02-interfaces-and-objects`** — object types, `interface` vs `type`,
   structural typing, classes, and the Node type-stripping limitation above.
3. **`03-unions-and-narrowing`** — union types, narrowing (`typeof`, `in`,
   `instanceof`), discriminated unions, and exhaustiveness checking with `never`.
