type Test = "-100";

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer N}`
  ? N
  : `${T}`;

type Result = Absolute<Test>; // expected to be "100"

export {};
