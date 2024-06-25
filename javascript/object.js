// Проверка на объект
{
  const isObject = (obj) => {
    return obj !== null && obj.__proto__ === Object.prototype;
  };

  console.log(isObject(new Map()));
}
