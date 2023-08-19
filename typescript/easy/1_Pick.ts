interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = MyPick<Todo, "title" | "completed">;

type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

/* ======= */

interface userInfo {
  name: string;
  age: number;
}
type keyofValue = keyof userInfo;
// keyofValue = "name" | "age"

/* ======= */

type name = "firstname" | "lastname";
type TName = {
  [key in name]: string;
};
// TName = { firstname: string, lastname: string }

const Names: TName = {
  firstname: "",
  lastname: "",
};

/* ======= */

// Bad example
// function getValue(o: object, key: string) {
//   return o[key];
// }
// const obj1 = { name: "John", age: 18 };
// const values = getValue(obj1, "name");

// Good example
function getValue<T extends object, K extends keyof T>(o: T, key: K): T[K] {
  return o[key];
}
const obj1 = { name: "John", age: 18 };
const nameValue = getValue(obj1, "name");
const ageValue = getValue(obj1, "age");

export {};
