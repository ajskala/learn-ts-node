// Lesson 2 exercise
// Fill in each TODO. Run `npm run check` from the project root to verify types,
// then `node lessons/02-interfaces-and-objects/exercise.ts` to run it.

// TODO 1: define an interface `Book` with:
//   title: string
//   author: string
//   year: number
//   isbn?: string        (optional)
//   readonly id: number  (readonly)

// TODO 2: create a const `myBook` of type `Book` with all fields except `isbn` filled in.

// TODO 3: write a function `describeBook` that takes a `Book` and returns a string
// like "Dune by Frank Herbert (1965)". Give it an explicit return type.

// TODO 4: define an interface `EBook` that `extends Book` and adds:
//   fileSizeMb: number
// Then create a const `myEbook` of type `EBook` with all required fields.

// TODO 5: call `describeBook` with both `myBook` and `myEbook` and log the results.
// (This should work without errors — think about why an EBook satisfies Book.)

// TODO 6 (structural typing check): try calling `describeBook` with an inline object
// literal that has title, author, year, id, AND an extra property `notes: "great book"`.
// Read the error TypeScript gives you. Then fix it by either removing `notes` or by
// first assigning the object to a `const` variable typed `Book` and passing that
// variable instead. Leave whichever fixed version compiles.

// TODO 7: define an interface `Shape` with a single method: `area(): number`.
// Then write a class `Square implements Shape` with a constructor taking `side: number`,
// storing it privately, and an `area()` method returning side * side.
// Create an instance and log its area.
