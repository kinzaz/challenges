{
  function a() {
    b = 1;
  }

  a();
  console.log(b);
}

// Изменение лексической области видимости во время выполнения кода.
// Динамическое выполнение кода.
{
  {
    var b = 2;

    function foo(a) {
      eval("var b = 6");
      console.log(a, b);
    }

    foo(1);
  }

  {
    function foo(str, a) {
      eval(str);
      console.log(a, b);
    }

    var b = 2;
    foo("var b = 6;", 1);
  }

  {
    var add = new Function("a", "b", "var c = a + b; return c + a;");
    console.log(add(2, 3));
  }
}

// With
// Также переопределение лексической области видимости во время выполнения.
{
  {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };

    with (obj) {
      a = 3;
      b = 4;
      c = 5;
    }

    console.log(obj);
  }

  {
    function foo(obj) {
      with (obj) {
        a = 2;
      }
    }

    const o1 = {
      a: 3,
    };

    const o2 = {
      b: 3,
    };

    foo(o1);
    console.log(o1.a);
    foo(o2);
    console.log(o2.a);
    console.log(a);
  }
}
