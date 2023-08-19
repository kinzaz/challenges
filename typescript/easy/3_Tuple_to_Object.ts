const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type TupleToObject<T extends readonly string[]> = {
  [P in T[number]]: P;
};

type result = TupleToObject<typeof tuple>; // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

// Indexed Access Types

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person = (typeof MyArray)[number];
type Age = (typeof MyArray)[number]["age"];

export {};
