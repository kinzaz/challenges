type Zero = MinusOne<1>; // 0
type FiftyFour = MinusOne<55>; // 54

type Tuple<L extends number, T extends unknown[] = []> = T["length"] extends L
  ? T
  : Tuple<L, [...T, unknown]>;

type MinusOne<T extends number> = Tuple<T> extends [...infer L, unknown]
  ? L["length"]
  : never;

export {};
