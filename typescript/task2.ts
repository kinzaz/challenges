type TUser = {
  id: number;
  age: number;
};

type TGuest = {
  id: string;
  utm: string;
};

type Union = TUser | TGuest;

type Intersection = TUser & TGuest;

const a: Union = {
  age: 2,
  utm: "",
  id: 1,
};

const b: Intersection = {
  age: 2,
  utm: "",
  id: "",
};

export {};
