interface User {
  name: string;
  age: number;
  address: string;
}

type UserPartialName = PartialByKeys<User, "name">; // { name?:string; age:number; address:string }

type MyOmit<F, S> = { [P in keyof F as P extends S ? never : P]: F[P] };

type EverythingFromTExceptK<T, K> = MyOmit<T, K>;

type OptionalProperties<T, K> = {
  [P in keyof T as P extends K ? P : never]?: T[P];
};

type MyMerge<T> = { [P in keyof T]: T[P] };

type PartialByKeys<T, K = keyof T> = MyMerge<
  OptionalProperties<T, K> & EverythingFromTExceptK<T, K>
>;

// type PartialByKeys<T, K> = {
//   [P in keyof T as P extends K ? never : P]: T[P];
// } & {
//   [P in keyof T as P extends K ? P : never]?: T[P];
// };

export {};
