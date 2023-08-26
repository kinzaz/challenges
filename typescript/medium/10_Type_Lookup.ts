interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type LookUp<U extends { type: PropertyKey }, T extends PropertyKey> = {
  [K in T]: U extends { type: T } ? U : never;
}[T];

type MyDogType = LookUp<Cat | Dog, "dog">; // expected to be `Dog`

export {};
