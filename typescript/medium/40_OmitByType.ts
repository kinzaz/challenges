type OmitBoolean = OmitByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { name: string; count: number }

type OmitByType<T, V> = {
  [P in keyof T as T[P] extends V ? never : P]: T[P];
};

export {};
