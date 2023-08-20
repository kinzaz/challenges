type ExampleType = Promise<string>;

type MyAwaited<T> = T extends Promise<infer R> ? R : T;

type Result = MyAwaited<ExampleType>; // string

export {};
