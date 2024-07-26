{
  (function () {
    f();

    f = function () {
      console.log(1);
    };
  })();

  function f() {
    console.log(2);
  }

  f();
}

{
  var a = 2;
  (function IIFE(def) {
    def(window);
  })(function def(global) {
    var a = 3;
    console.log(a);
    console.log(global.a);
  });
}
