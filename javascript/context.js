{
  var a = {
    firstName: "Bill",
    lastName: "Ivanov",
    sayName: function () {
      console.log(this.firstName);
    },
    sayLastName: () => {
      console.log(this.lastName);
    },
  };

  a.sayName();

  var b = a.sayName();

  b();

  a.sayName.bind({ firstName: "Boris" })();

  a.sayName();
  a.sayLastName();

  a.sayName.bind({ firstName: "Boris" }).bind({ firstName: "Tom" })();
  a.sayLastName.bind({ lastName: "Petrov" })();
}

{
  function foo() {
    const x = 10;
    return {
      x: 20,
      bar: () => {
        console.log(this.x);
      },
      baz: function () {
        console.log(this.x);
      },
    };
  }
  const obj1 = foo();
  obj1.bar(); // ?
  obj1.baz(); // ?

  const obj2 = foo.call({ x: 30 });

  let y = obj2.bar;
  let z = obj2.baz;

  y(); // ?
  z(); // ?

  obj2.bar(); // ?
  obj2.baz(); // ?
}

{
  {
    const obj = {
      name: "Colin",
      prop: {
        name: "Rox",
        getName: function () {
          return this.name;
        },
        arrow: () => this.name,
        life: function () {
          (function () {
            console.log(this.name);
          })();
        },
        arrowInsideFunction: function () {
          return () => console.log(this.name);
        },
      },
    };

    console.log(obj.prop.getName()); // ?

    const test = obj.prop.getName;
    console.log(test()); // ?

    console.log(test.call(obj.prop)); // ?
    console.log(test.apply(obj)); // ?
    console.log(test.bind(obj)); // ?
    console.log(test.bind(obj).bind(obj.prop)()); // ?
    console.log(obj.prop.arrow()); // ?

    obj.prop.life(); // ?
    obj.prop.arrowInsideFunction()(); // ?
  }
}

{
  const obj = {
    name: "1",
    arrow() {
      name = "4";
      this.sername = "5";
      const o = {
        name: "3",
        arrow: () => this.name,
        arrow2: () => this.sername,
      };
      return o;
    },
    prop: {
      name: "2",
      arrow() {
        return this;
      },
    },
  };

  console.log(obj.arrow());
  console.log(obj.prop.arrow());

  const test = obj.arrow();
  console.log(test.arrow());
  console.log(test.arrow2());
}

{
  const userServie = {
    currentFilter: "active",
    users: [
      {
        name: "Alex",
        status: "active",
      },

      {
        name: "John",
        status: "deleted",
      },
    ],
    getFilteredUsers: function () {
      return this.users.filter(function (user) {
        return user.status === this.currentFilter;
      });
    },
  };

  console.log(userServie.getFilteredUsers()); // ?
}
