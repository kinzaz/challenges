interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type MyOmit<T, U> = {
  [P in Exclude<keyof T, U>]: T[P];
};

type MyOmit2<T, U extends keyof T> = {
  [P in keyof T as P extends U ? never : P]: T[P];
};

type TodoPreview = MyOmit<Todo, "description" | "title">;
type TodoPreview2 = MyOmit2<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false,
};
const todo2: TodoPreview2 = {
  completed: false,
};

export {};
