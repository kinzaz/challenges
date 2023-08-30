type a = Reverse<["a", "b"]>; // ['b', 'a']
type b = Reverse<["a", "b", "c"]>; // ['c', 'b', 'a']

type Reverse<T> = T extends [...infer H, infer T] ? [T, ...Reverse<H>] : [];

export {};
