// Проверка на объект
{
  const isObject = (obj) => {
    return obj !== null && obj.__proto__ === Object.prototype;
  };

  console.log(isObject(new Map()));
}

{
  const strPrimitive = "I am a string";
  console.log(typeof strPrimitive);
  console.log(strPrimitive instanceof String);

  const strObject = new String("I am a string");
  console.log(typeof strObject);
  console.log(strObject instanceof String);
  // проверка подтипа объекта
  console.log(Object.prototype.toString.call("")); // [object String]
}

// Дескрипторы
{
  const myObj = {
    a: 1,
    b: 2,
  };

  console.log(Object.getOwnPropertyDescriptors(myObj));

  // ====

  const obj = {};
  Object.defineProperty(obj, "a", {
    writable: true,
    enumerable: true,
    configurable: true,
    value: 0,
  });

  console.log(Object.getOwnPropertyDescriptor(obj, "a"));

  // writable
  const obj1 = {};
  Object.defineProperty(obj1, "a", {
    writable: false,
    value: 0,
    enumerable: true,
    configurable: true,
  });
  obj1.a = 2;
  console.log(obj1.a);

  // configurable
  var myObject1 = {
    a: 2,
  };
  myObject1.a = 3;
  console.log(myObject1.a); // 3
  Object.defineProperty(myObject1, "a", {
    value: 4,
    writable: true,
    configurable: false, // настройка невозможна!
    enumerable: true,
  });
  console.log(myObject1.a); // 4
  myObject1.a = 5;
  console.log(myObject1.a); // 5

  Object.defineProperty(myObject1, "a", {
    value: 6,
    writable: true,
    configurable: true,
    enumerable: true,
  }); // TypeError

  // Enumerable
  const obj2 = {
    b: 3,
  };

  Object.defineProperty(obj2, "a", {
    writable: true,
    configurable: true,
    enumerable: false,
    value: 2,
  });

  console.log(obj2);
  console.log(Object.keys(obj2));
  console.log(obj2.a);
  console.log(obj2.propertyIsEnumerable("a"));
  Object.getOwnPropertyNames(obj2);

  for (const k in obj2) {
    console.log(k);
  }
}

// configurable:false блокирует возможность использования оператора delete
{
  var myObject = {
    a: 2,
  };
  myObject.a; // 2
  delete myObject.a;
  myObject.a; // undefined
  Object.defineProperty(myObject, "a", {
    value: 2,
    writable: true,
    configurable: false,
    enumerable: true,
  });
  myObject.a; // 2
  delete myObject.a;
  myObject.a; // 2
}

// Объектные константы
{
  const myObj = {};
  Object.defineProperty(myObj, "a", {
    configurable: false,
    writable: false,
    value: 42,
  });
}

// Запрет расширения
{
  const myObj = {
    a: 1,
    b: 2,
  };

  Object.preventExtensions(myObj);
  myObj.c = 3;
  console.log(myObj);
}

// Seal
// preventExtensions + configurable: false
{
  const myObj = {
    a: 1,
    b: 2,
  };

  Object.seal(myObj);
  myObj.c = 3;
  console.log(myObj);
  myObj.a = 2;
  console.log(myObj);
  delete myObj.b;
  console.log(myObj);
}

// Freaze
// preventExtensions + configurable: false + writable: false
{
  const myObj = {
    a: 1,
    b: 2,
  };

  Object.freeze(myObj);
  myObj.a = 2;
  console.log(myObj);
}

// getter / setter
/**
 * Возможно переопределение некоторых операций не на уровне объектов,
 * а на уровне отдельных свойств; для этой цели используются get и set.
 * Геттер — свойства, которые вызывают скрытую функцию для получения нужного значения.
 * Сеттер — свойства, которые вызывают скрытую функцию для присваивания значения.
 */
{
  var myObject = {
    get a() {
      return 2;
    },
  };

  console.log(myObject.a); // 2

  Object.defineProperty(myObject, "b", {
    // определение геттера для `b`
    get: function () {
      return this.a * 2;
    },
    // чтобы свойство `b` включалось в список свойств объекта
    enumerable: true,
  });
  console.log(myObject.a); // 2
  console.log(myObject.b); // 4
}

{
  const myObject = {
    get a() {
      return 2;
    },
  };
  myObject.a = 3;
  console.log(myObject.a);
}

{
  const myObject = {
    get a() {
      return 2;
    },
    set a(param) {
      this._a = param;
    },
  };

  myObject.a = 3;
  console.log(myObject.a);
}

{
  var myObject = {
    get a() {
      return this._a;
    },
    set a(val) {
      this._a = val * 2;
    },
  };
  myObject.a = 2;
  console.log(myObject.a);
}

// hasOwnProperty / in
{
  const a = {
    a: 1,
  };

  const b = Object.create(a);
  b.b = 2;

  console.log("a" in b);
  console.log(b.hasOwnProperty("a"));
}
