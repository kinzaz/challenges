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

// ООП стиль
{
  function Foo(who) {
    this.me = who;
  }

  Foo.prototype.identify = function () {
    return "I am " + this.me;
  };

  function Bar(who) {
    Foo.call(this, who);
  }

  Bar.prototype = Object.create(Foo.prototype);

  Bar.prototype.speak = function () {
    console.log("Hello, " + this.identify() + ".");
  };

  var b1 = new Bar("b1");
  var b2 = new Bar("b2");
  b1.speak();
  b2.speak();
}

// OLOO стиль
{
  const Foo = {
    init(who) {
      this.me = who;
    },
    identify() {
      return "I am " + this.me;
    },
  };

  const Bar = Object.create(Foo);
  Bar.speak = function () {
    console.log("Hello, " + this.identify() + ".");
  };

  const b1 = Object.create(Bar);
  b1.init("b1");
  const b2 = Object.create(Bar);
  b2.init("b2");

  b1.speak();
  b2.speak();
}

// ООП стиль
{
  // Родительский класс
  function Controller() {
    this.errors = [];
  }

  Controller.prototype.showDialog = function (title, msg) {
    console.log(`Showing dialog this title: ${title} and msg: ${msg}`);
  };

  Controller.prototype.success = function (msg) {
    this.showDialog("Success", msg);
  };

  Controller.prototype.failure = function (err) {
    this.errors.push(err);
    this.showDialog("Error", err);
  };

  // Дочерний класс
  function LoginController() {
    Controller.call(this);
  }

  // Связывание дочернего класса с родительским
  LoginController.prototype = Object.create(Controller.prototype);

  LoginController.prototype.getUser = function () {
    return "login_username";
  };
  LoginController.prototype.getPassword = function () {
    return "password_username";
  };

  LoginController.prototype.validateEntry = function (user, pw) {
    user = user || this.getUser();
    pw = pw || this.getPassword();

    if (!(user && pw)) {
      return this.failure("Please enter a username & password!");
    } else if (pw.length < 5) {
      return this.failure("Password must be 5+ characters!");
    }
    // управление передано сюда? Проверка прошла успешно!
    return true;
  };

  // Переопределение для расширения базовой версии `failure()`
  LoginController.prototype.failure = function (err) {
    // вызов "super"
    Controller.prototype.failure.call(this, "Login invalid: " + err);
  };

  // Дочерний класс
  function AuthController(login) {
    Controller.call(this);
    // кроме наследования также понадобится композиция
    this.login = login;
  }

  // Связывание дочернего класса с родительским
  AuthController.prototype = Object.create(Controller.prototype);
  AuthController.prototype.server = function (url, data) {
    if (Math.random() * 10 > 5) {
      return Promise.resolve("resolve data with data:" + " " + data);
    } else {
      return Promise.reject("reject data");
    }
  };

  AuthController.prototype.checkAuth = function () {
    const user = this.login.getUser();
    const pw = this.login.getPassword();
    if (this.login.validateEntry(user, pw)) {
      this.server("/check-auth", { user, pw })
        .then(this.success.bind(this))
        .catch(this.failure.bind(this));
    }
  };

  // Переопределение для расширения базовой версии `success()`
  AuthController.prototype.success = function () {
    // вызов "super"
    Controller.prototype.success.call(this, "Authenticated!");
  };
  // Переопределение для расширения базовой версии `failure()`
  AuthController.prototype.failure = function (err) {
    // Вызов "super"
    Controller.prototype.failure.call(this, "Auth Failed: " + err);
  };

  const auth = new AuthController(
    // кроме наследования также понадобится композиция
    new LoginController()
  );

  auth.checkAuth();
}

// OLOO стиль
{
  const LoginController = {
    errors: [],
    getUser: function () {
      return "login_username";
    },
    getPassword: function () {
      return "password_username";
    },
    validateEntry: function (user, pw) {
      user = user || this.getUser();
      pw = pw || this.getPassword();
      if (!(user && pw)) {
        return this.failure("Please enter a username & password!");
      } else if (pw.length < 5) {
        return this.failure("Password must be 5+ characters!");
      }
      // управление передано сюда? Проверка прошла успешно!
      return true;
    },
    showDialog: function (title, msg) {
      console.log(`Showing dialog this title: ${title} and msg: ${msg}`);
    },
    failure: function (err) {
      this.errors.push(err);
      this.showDialog("Error", "Login invalid: " + err);
    },
  };

  // Связывание `AuthController` для делегирования
  const AuthController = Object.create(LoginController);
  AuthController.errors = [];
  AuthController.checkAuth = function () {
    var user = this.getUser();
    var pw = this.getPassword();
    if (this.validateEntry(user, pw)) {
      this.server("/check-auth", { user, pw })
        .then(this.accepted.bind(this))
        .catch(this.rejected.bind(this));
    }
  };
  AuthController.server = function (url, data) {
    if (Math.random() * 10 > 5) {
      return Promise.resolve("resolve data with data:" + " " + data);
    } else {
      return Promise.reject("reject data");
    }
  };
  AuthController.accepted = function () {
    this.showDialog("Success", "Authenticated!");
  };
  AuthController.rejected = function (err) {
    this.failure("Auth Failed: " + err);
  };
}

// Интроспекция
{
  function Foo() {
    /* .. */
  }
  function Bar() {
    /* .. */
  }

  Bar.prototype = Object.create(Foo.prototype);

  const b1 = new Bar("b1");

  // связывание `Foo` и `Bar` друг с другом
  console.log(Bar.prototype instanceof Foo);
  console.log(Object.getPrototypeOf(Bar.prototype) === Foo.prototype);
  console.log(Foo.prototype.isPrototypeOf(Bar.prototype));
  console.log(Bar.prototype.isPrototypeOf(Foo.prototype));

  // связывание `b1` с `Foo` и `Bar`
  console.log(b1 instanceof Bar);
  console.log(b1 instanceof Foo);

  console.log(Object.getPrototypeOf(b1) === Bar.prototype);
  console.log(Object.getPrototypeOf(b1) === Foo.prototype);
  console.log(Foo.prototype.isPrototypeOf(b1));
  console.log(Bar.prototype.isPrototypeOf(b1));
}

{
  const Foo = {
    /* .. */
  };

  const Bar = Object.create(Foo);

  const b1 = Object.create(Bar);

  // связывание `Foo` и `Bar` друг с другом
  console.log(Foo.isPrototypeOf(Bar));
  console.log(Object.getPrototypeOf(Bar) === Foo);

  // связывание `b1` с `Foo` и `Bar`
  console.log(Foo.isPrototypeOf(b1));
  console.log(Bar.isPrototypeOf(b1));
  console.log(Object.getPrototypeOf(b1) === Bar);
  console.log(Object.getPrototypeOf(b1) === Foo);
}
