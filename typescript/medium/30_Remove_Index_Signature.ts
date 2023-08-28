type Foo = {
  [key: string]: any;
  foo(): void;
};

type TypeLiteralOnly<T> = string extends T
  ? never
  : number extends T
  ? never
  : T;

type A = RemoveIndexSignature<Foo>; // expected { foo(): void }

type RemoveIndexSignature<T> = { [P in keyof T as TypeLiteralOnly<P>]: T[P] };

export {};
