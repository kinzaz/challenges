type Result1 = Fibonacci<3>; // 2
type Result2 = Fibonacci<8>; // 21

type Fibonacci<
  T extends number,
  CurrentIndex extends any[] = [any],
  Prev extends any[] = [],
  Current extends any[] = [any]
> = CurrentIndex["length"] extends T
  ? Current["length"]
  : Fibonacci<T, [...CurrentIndex, any], Current, [...Prev, ...Current]>;

export {};
