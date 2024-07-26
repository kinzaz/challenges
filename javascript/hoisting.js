{
  a = 2;
  var a;
  console.log(a);
}

{
  console.log(a);
  var a = 2;
}

{
  foo();
  var foo;
  function foo() {
    console.log(1);
  }
  foo = function () {
    console.log(2);
  };

  // сначала поднимаются функции потом переменные
}

{
  foo(); // 3
  function foo() {
    console.log(1);
  }
  var foo = function () {
    console.log(2);
  };
  function foo() {
    console.log(3);
  }
  // последующие объявления функций переопределяют предыдущие
}

{
  foo();
  var a = true;
  if (a) {
    function foo() {
      console.log("a");
    }
  } else {
    function foo() {
      console.log("b");
    }
  }

  // Объявления функций, располагающиеся внутри обычных блоков,
  // обычно поднимаются до вмещающей области видимости
}
