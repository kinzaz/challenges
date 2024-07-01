type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

// Пример использования
interface Person {
  name?: string;
  age?: number;
}

type a = MyRequired<Person>;

export {};
