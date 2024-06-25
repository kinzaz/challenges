function objectKeys<T extends object>(prop: T): keyof T[] {
  // @ts-ignore
  return Object.keys(prop);
}

objectKeys({ a: 5, b: "asdf" });
const a = Object.keys({ a: 5, b: "asdf" }); // ("a" | "b")[]

export {};
