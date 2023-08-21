type Concat<T extends Array<unknown>, S extends Array<unknown>> = [...T, ...S];

type Result = Concat<[1], [2]>; // expected to be [1, 2]

export {};
