type Includes<T extends Array<unknown>, K extends unknown> = K extends T[number]
  ? true
  : false;

type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
type isSantanaMen = Includes<
  ["Kars", "Esidisi", "Wamuu", "Santana"],
  "Santana"
>; // expected to be `true`

export {};
