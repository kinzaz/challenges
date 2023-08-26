type LengthOfString<
  S extends string,
  A extends string[] = []
> = S extends `${infer HEAD}${infer TAIL}`
  ? LengthOfString<TAIL, [HEAD, ...A]>
  : A["length"];

type t = LengthOfString<"test">; // 4

export {};
