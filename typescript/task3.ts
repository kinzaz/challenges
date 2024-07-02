// Написать тип, который выражает результат какой-то опперации.
// При этом результат может быть либо успешным, и тогда он должен
// хранить этот результат (заранее заданного типа), либо неуспешным
// (и тогда нужно хранить ошибку заранее заданного типа)

// Определение успешного результата
type Success<T> = {
  success: true;
  value: T;
};

// Определение неуспешного результата
type Failure<E> = {
  success: false;
  error: E;
};

// Объединение двух типов в один тип Result
type Result<T, E> = Success<T> | Failure<E>;

// Примеры использования:

// Успешный результат с числовым значением
const successfulResult: Result<number, string> = {
  success: true,
  value: 42,
};

// Неуспешный результат с строкой ошибки
const failureResult: Result<number, string> = {
  success: false,
  error: "Something went wrong",
};

// Функция, которая возвращает результат типа Result
function performOperation(flag: boolean): Result<number, string> {
  if (flag) {
    return { success: true, value: 100 };
  } else {
    return { success: false, error: "Operation failed" };
  }
}

// Пример вызова функции
const result = performOperation(true);

// Напишем type guard
const isSuccessResult = (res: unknown): res is Success<any> => {
  return "value" in (res as Success<any>);
};

if (isSuccessResult(result)) {
  console.log("Operation succeeded with value:", result.value);
} else {
  console.log("Operation failed with error:", result.error);
}

export {};
