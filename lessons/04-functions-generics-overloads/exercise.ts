// Lesson 4 exercise
// Fill in each TODO. Run `npm run check` from the project root to verify types,
// then `node lessons/04-functions-generics-overloads/exercise.ts` to run it.

// TODO 1: write a function `describeItem` that takes (name: string, quantity:
// number = 1, note?: string) and returns a string like "5x widget (backordered)"
// or "1x widget" if no note is given. Give it an explicit return type.

// TODO 2: call `describeItem` three ways: with just a name, with a name and
// quantity, and with a name, quantity, and note. Log all three results.

// TODO 3: write a function `sum` that takes any number of number arguments via a
// rest parameter and returns their total. Call it with 0, 2, and 4 arguments and
// log each result.

// TODO 4: write a generic function `firstElement<T>` that takes `arr: T[]` and
// returns `T | undefined` (the first element, or undefined if empty). Call it
// once with a number array and once with a string array, logging both results.

// TODO 5: write a generic function `getLength<T extends { length: number }>` that
// takes `item: T` and returns its `.length` as a number. Call it with a string
// and with an array, logging both results.

// TODO 6: write a generic class `Box<T>` with a constructor taking `contents: T`
// (store it privately) and a `getContents(): T` method. Create one `Box` holding
// a string and one holding a number, and log both `.getContents()` results.
// Remember Lesson 2's Node limitation: declare the private field on its own line
// and assign it in the constructor body — don't use the `private contents: T`
// parameter-property shorthand, it won't run via plain `node file.ts`.

// TODO 7: write an overloaded function `combine`:
//   - two overload signatures: (a: string, b: string) => string, and
//     (a: number, b: number) => number
//   - one implementation signature covering both, that concatenates strings or
//     adds numbers depending on which case applies
// Call it once with two strings and once with two numbers, logging both results.
// Then (don't leave this in the file — just try it and delete it) attempt
// `combine("a", 1)` and confirm `tsc` rejects it, proving the overloads are doing
// real work compared to a plain `string | number` union parameter.
