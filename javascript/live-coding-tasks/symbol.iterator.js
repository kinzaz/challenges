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

{
  const myObj = {
    a: "test",
    b: 2,
    c: true,
  };
  Object.defineProperty(myObj, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function () {
      const o = this;
      let idx = 0;
      const ks = Object.keys(o);
      return {
        next: function () {
          return {
            value: o[ks[idx++]],
            done: idx > ks.length,
          };
        },
      };
    },
  });
  // ручной перебор `myObj`
  var it = myObj[Symbol.iterator]();
  it.next(); // { value:2, done:false }
  it.next(); // { value:3, done:false }
  it.next(); // { value:undefined, done:true }
  // перебор `myObj` в `for..of`
  for (var v of myObj) {
    console.log(v);
  }
}

// Создать итератор, который наполняет бесконечно возвращает рандомные числа.
// Наполнить пустой массив итерируясь по объекту с таким итератором
// Остановить наполнение.
{
  const randoms = {
    [Symbol.iterator]: function () {
      return {
        next() {
          return { value: Math.random() };
        },
      };
    },
  };
  var randoms_pool = [];
  for (const n of randoms) {
    randoms_pool.push(n);
    // не продолжать бесконечно!
    if (randoms_pool.length === 10) break;
  }
  console.log(randoms_pool);
}
