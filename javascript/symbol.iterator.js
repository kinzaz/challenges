/**
 * Если объект не является массивом, но представляет собой коллекцию каких-то элементов (список, набор),
 *  то удобно использовать цикл for..of для их перебора.
 */

/**
 * Когда цикл for..of запускается, он вызывает Symbol.iterator один раз (или выдаёт ошибку, если метод не найден).
 * Этот метод должен вернуть итератор – объект с методом next.
 * Дальше for..of работает только с этим возвращённым объектом.
 * Когда for..of хочет получить следующее значение, он вызывает метод next() этого объекта.
 * Результат вызова next() должен иметь вид {done: Boolean, value: any}, где done=true означает, что цикл завершён,
 * в противном случае value содержит очередное значение.
 */

let range = {
  from: 1,
  to: 5,
};

range[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,
    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

for (const num of range) {
  console.log(num);
}
