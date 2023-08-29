type Butterfly = DropChar<" b u t t e r f l y ! ", " ">; // 'butterfly!'

type DropChar<S, C extends string> = S extends `${infer L}${C}${infer R}`
  ? DropChar<`${L}${R}`, C>
  : S;

export {};
