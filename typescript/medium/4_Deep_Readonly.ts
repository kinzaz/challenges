type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

// type DeepReadonly<T> = keyof T extends never
//   ? T
//   : {
//       readonly [P in keyof T]: DeepReadonly<T[P]>;
//     };

type DeepReadonly<T> = T extends object
  ? {
      readonly [P in keyof T]: DeepReadonly<T[P]>;
    }
  : T;

type Todo = DeepReadonly<X>; // should be same as `Expected`

export {};
