{
  const str = String("");
  const str2 = new String("");

  console.log("123" instanceof String);
  console.log(str instanceof String);
  console.log(str2 instanceof String);
}

{
  function isObject(arg) {
    return Object.prototype.toString.call(arg) === "[object Object]";
  }

  console.log(isObject(new Map()));
}

{
  const a = {
    a: 1,
  };
  const b = Object.create(a);
  b.a = 2;
  console.log(a); // ?
  console.log(b); // ?
}

{
  const a = {};

  Object.defineProperty(a, "a", {
    writable: false,
    enumerable: true,
    configurable: true,
    value: 0,
  });

  const b = Object.create(a);

  b.a = 1;

  console.log(a); // ?
  console.log(b); // ?
}

{
  const anotherObject = {
    a: 2,
  };

  const myObject = Object.create(anotherObject);

  console.log(anotherObject.a); // ?
  console.log(myObject.a); // ?

  console.log(anotherObject.hasOwnProperty("a")); // ?
  console.log(myObject.hasOwnProperty("a")); // ?
  myObject.a = 5;
  console.log(anotherObject.a); // ?
  console.log(myObject.a); // ?
  console.log(myObject.hasOwnProperty("a")); // ?
}

{
  function Foo(name) {
    this.name = name;
  }
  Foo.prototype.myName = function () {
    return this.name;
  };
  function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
  }
  // здесь мы создаем новый объект `Bar.prototype`,
  // связанный с `Foo.prototype`
  Bar.prototype = Object.create(Foo.prototype);
  // Внимание! Значение `Bar.prototype.constructor` исчезает.
  // Возможно, вам придется вручную "исправить" его, если
  // вы привыкли полагаться на такие свойства!
  Bar.prototype.myLabel = function () {
    return this.label;
  };
  var a = new Bar("a", "obj a");
  a.myName(); // "a"
  a.myLabel(); // "obj a"
}

{
  function Foo() {}
  const a = {};
  const b = Object.create(a);
  console.log(a.isPrototypeOf(b));
}
