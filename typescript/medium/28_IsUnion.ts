type IsUnion<T, C = T> = T extends C ? ([C] extends [T] ? false : true) : never;

type case1 = IsUnion<string>; // false
type case2 = IsUnion<string | number>; // true
type case3 = IsUnion<[string | number]>; // false

export {};
