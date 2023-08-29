type OnlyBoolean = PickByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { isReadonly: boolean; isEnable: boolean; }

type PickByType2<T, U> = {
  [P in keyof T]: T[P] extends U ? T[P] : never;
};

type PickByType<T, U> = { [P in keyof T as T[P] extends U ? P : never]: T[P] };

export {};
