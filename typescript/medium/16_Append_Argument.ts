type Fn = (a: number, b: string) => number;

// type AppendArgument<T extends (...args: any[]) => any, Arg> = T extends (
//   ...args: infer R
// ) => any
//   ? (x: Arg, ...args: R) => ReturnType<T>
//   : never;

type AppendArgument<Fn, A> = Fn extends (...args: infer P) => infer R
  ? (...args: [...P, A]) => R
  : never;

type Result = AppendArgument<Fn, boolean>;
// expected be (a: number, b: string, x: boolean) => number

export {};
