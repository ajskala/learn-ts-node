// Lesson 3 exercise
// Fill in each TODO. Run `npm run check` from the project root to verify types,
// then `node lessons/03-unions-and-narrowing/exercise.ts` to run it.

// TODO 1: write a function `formatValue` that takes `value: string | number | boolean`
// and returns a string:
//   - if it's a string, return it uppercased
//   - if it's a number, return it fixed to 2 decimal places (.toFixed(2))
//   - if it's a boolean, return "yes" or "no"
// Give it an explicit return type of string. Use typeof narrowing.

// TODO 2: call `formatValue` with one string, one number, and one boolean argument,
// logging each result.

// TODO 3: define a discriminated union for shapes:
//   interface Circle { kind: "circle"; radius: number }
//   interface Rectangle { kind: "rectangle"; width: number; height: number }
//   interface Triangle { kind: "triangle"; base: number; height: number }
//   type Shape = Circle | Rectangle | Triangle
// (Use Math.PI for circle area: PI * radius^2. Rectangle: width * height.
//  Triangle: 0.5 * base * height.)

// TODO 4: write a function `area` that takes a `Shape` and returns its area as a
// number, using a switch on `kind`. Add exhaustiveness checking with a `default`
// branch that assigns to a `never`-typed variable, as shown in the README.

// TODO 5: create one of each shape (a circle, a rectangle, a triangle) and log the
// area of each using your `area` function.

// TODO 6 (prove exhaustiveness works): temporarily add a 4th interface `Square`
// with `kind: "square"; side: number` to the `Shape` union, WITHOUT adding a case
// for it in `area`'s switch. Run `npm run check` and read the error pointing at your
// `never` variable. Then either add the missing case (return side * side) or revert
// the Shape union back to 3 members — leave the file in a state that compiles.
