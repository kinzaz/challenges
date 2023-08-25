type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type Last<T extends unknown[]> = T extends [...infer X, infer L] ? L : never;

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1

export {};
