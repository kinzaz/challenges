type Capitalize<T extends string> = T extends `${infer HEAD}${infer TAIL}`
  ? `${Uppercase<HEAD>}${TAIL}`
  : T;

type capitalized = Capitalize<"hello world">; // expected to be 'Hello world'

export {};
