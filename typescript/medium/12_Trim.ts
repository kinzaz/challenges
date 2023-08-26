type Trim<T> = T extends `${" "}${infer U}${" "}` ? Trim<U> : T;

type trimmed = Trim<"  Hello World  ">; // expected to be 'Hello World'

export {};
