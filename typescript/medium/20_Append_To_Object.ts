type Test = { id: "1" };

type AppendToObject<T, U extends PropertyKey, V> = {
  [P in keyof T | U]: P extends keyof T ? T[P] : V;
};

type Result = AppendToObject<Test, "value", 4>; // expected to be { id: '1', value: 4 }

export {};
