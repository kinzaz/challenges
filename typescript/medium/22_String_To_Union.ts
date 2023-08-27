type Test = "1243";

type StringToUnion<T extends string> = T extends `${infer Head}${infer Tail}`
  ? Head | StringToUnion<Tail>
  : never;

type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"

export {};
