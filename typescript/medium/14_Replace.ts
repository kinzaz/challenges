type Replace<
  T,
  From extends string,
  To extends string
> = T extends `${infer U}${From}${infer R}` ? `${U}${To}${R}` : T;

type replaced = Replace<"types are fun!", "fun", "awesome">; // expected to be 'types are awesome!'
type replaced2 = Replace<"types are fun!", "types", "interface">; // expected to be 'interface are awesome!'

export {};
