type MyExclude<T, K> = T extends K ? never : T;

type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'

export {};
