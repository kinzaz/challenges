type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type test0 = Diff<Foo, Bar>; // expected { gender: number }

type Diff<O, O1> = {
  [P in keyof O | keyof O1 as Exclude<P, keyof O & keyof O1>]: P extends keyof O
    ? O[P]
    : P extends keyof O1
    ? O1[P]
    : never;
};

export {};
