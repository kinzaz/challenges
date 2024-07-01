{
  let obj = { a: 1, b: { c: 2 }, d: 3 };

  function get(object, path) {
    let keys = path.split(".");

    let value = object;
    for (let key of keys) {
      if (value === undefined) {
        break;
      }
      value = value[key];
    }

    return value;
  }

  console.log(get(obj, "b.c")); // Вернет 2
  console.log(get(obj, "d")); // Вернет 3
}
