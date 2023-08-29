type a = EndsWith<"abc", "bc">; // expected to be true
type b = EndsWith<"abc", "abc">; // expected to be true
type c = EndsWith<"abc", "d">; // expected to be false

type EndsWith<T, U extends string> = T extends `${any}${U}`
  ? true
  : false;

export {};
