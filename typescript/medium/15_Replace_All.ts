type ReplaceAll<
  T,
  From extends string,
  To extends string
> = T extends `${infer U}${From}${infer R}`
  ? ReplaceAll<`${U}${To}${R}`, From, To>
  : T;

type replaced = ReplaceAll<"t y p e s", " ", "">; // expected to be 'types'

export {};
