/**
 * this не позволяет функции получить ссылку на саму себя
 */
{
  function foo(num) {
    console.log("foo: " + num);

    this.count++;
  }

  foo.count = 0;

  for (i = 0; i < 10; i++) {
    if (i > 5) {
      foo(i);
    }
  }

  console.log(foo.count);

  // Решение
  {
    function foo(num) {
      console.log("foo: " + num);
      this.count++;
    }
    foo.count = 0;
    var i;
    for (i = 0; i < 10; i++) {
      if (i > 5) {
        foo.call(foo, i);
      }
    }

    console.log(foo.count);
  }
}

{
  function foo() {
    console.log(this.a);
  }
  var obj = {
    a: 2,
    foo: foo,
  };
  var bar = obj.foo;
  var a = 10;
  bar();
}

{
  function foo() {
    console.log(this.a);
  }

  function doFoo(fn) {
    fn();
  }

  var obj = {
    a: 2,
    foo: foo,
  };
  var a = 10;
  doFoo(obj.foo);
}

/**
 * А если передаваемая функция не написана вами, а встроена
 * в язык? Ничего не меняется, результат будет тем же:
 */
{
  function foo() {
    console.log(this.a);
  }
  var obj = {
    a: 2,
    foo: foo,
  };
  var a = 10;

  setTimeout(obj.foo, 100);
}

{
  function foo() {
    console.log(this.a);
  }
  const obj = {
    a: 2,
  };
  const bar = function () {
    foo.call(obj);
  };
  bar();
  setTimeout(bar, 100);

  const obj2 = {
    a: 3,
  };

  bar.call(obj2);
}

{
  function foo() {
    console.log(this.a);
  }

  var obj1 = {
    a: 2,
    foo: foo,
  };

  var obj2 = {
    a: 3,
    foo: foo,
  };

  obj1.foo();
  obj2.foo();
  obj1.foo.call(obj2);
  obj2.foo.call(obj1);
}

{
  function foo(something) {
    this.a = something;
  }

  var obj1 = {
    foo: foo,
  };

  var obj2 = {};

  obj1.foo(2);
  console.log(obj1.a);

  obj1.foo.call(obj2, 3);
  console.log(obj2.a);

  var bar = new obj1.foo(4);
  console.log(obj1.a);
  console.log(bar.a);
}

{
  function foo(something) {
    this.a = something;
  }

  var obj1 = {};

  var bar = foo.bind(obj1);

  bar(2);
  console.log(obj1.a);

  var baz = new bar(3);
  console.log(obj1.a);
  console.log(baz.a);
}

/**
 * Если передать call, apply или bind в параметре связывания this
 * значение null или undefined, эти значения фактически игнорируются,
 * и к вызову применяется правило связывания по умолчанию.
 */
{
  function foo() {
    console.log(this.a);
  }
  var a = 2;
  foo.call(null);
  // 2
}

{
  function foo() {
    console.log(this.a);
  }
  var a = 2;

  var o = { a: 3, foo: foo };
  var p = { a: 4 };
  o.foo();
  (p.foo = o.foo)();
  // 2
}

// Стрелочные функции
// Лексическое связывание стрелочной функции не может быть переопределено
{
  const foo = () => {
    console.log(this.name);
  };

  const obj = {
    name: 1,
  };

  foo.call(obj);
}

{
  function foo() {
    return (a) => {
      console.log(this.a);
    };
  }
  var obj1 = {
    a: 2,
  };
  var obj2 = {
    a: 3,
  };
  var bar = foo.call(obj1);
  bar.call(obj2);
}

{
  function foo() {
    setTimeout(function () {
      console.log(this.a);
    }, 100);
  }
  var obj = {
    a: 2,
  };

  foo.call(obj);
}
