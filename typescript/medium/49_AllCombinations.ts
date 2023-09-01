type AllCombinations_ABC = AllCombinations<"ABC">;
// should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'

type AllCombinations<
  S extends string,
  Acc extends string = StringToUnion<S>
> = IsNever<Acc> extends true
  ? ""
  :
      | ""
      | {
          [Combo in Acc]: `${Combo}${AllCombinations<
            never,
            Exclude<Acc, Combo>
          >}`;
        }[Acc];

type IsNever<T> = [T] extends [never] ? true : false;

type StringToUnion<T> = T extends `${infer Head}${infer Tail}`
  ? Head | StringToUnion<Tail>
  : never;

export {};
