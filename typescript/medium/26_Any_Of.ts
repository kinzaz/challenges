type Falsy = 0 | "" | false | [] | { [P in any]: never };

type AnyOf<T extends readonly any[]> = T extends [infer H, ...infer T]
  ? H extends Falsy
    ? AnyOf<T>
    : true
  : false;

type Sample1 = AnyOf<[1, "", false, [], {}]>; // expected to be true.
type Sample2 = AnyOf<[0, "", false, [], {}]>; // expected to be false.

export {};
