type Awaited<T> = T extends PromiseLike<infer R> ? Awaited<R> : T;

declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<{
  [P in keyof T]: Awaited<T[P]>;
}>;

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);
const C = PromiseAll(["foo", 32, true] as const);
const t = PromiseAll([Promise.resolve(3), 32, true] as const);

export {};
