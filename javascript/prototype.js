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
