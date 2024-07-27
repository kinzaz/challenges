// polyfill some
{
  Array.prototype.some2 = function (callback) {
    let res = false;
    this.forEach((el, index) => {
      if (callback(el, index, this)) res = true;
    });

    return res;
  };
  console.log([12, 5, 8, 1, 4].some2((el) => el > 10)); // true
  console.log([2, 5, 8, 1, 4].some2((el) => el > 10)); // false
}

{
  function promiseAll(promises) {
    let outputs = [];
    let count = 0;

    return new Promise((resolve, reject) => {
      promises.forEach((promise, i) => {
        promise
          .then((data) => {
            outputs[i] = data;
            count++;

            if (count === promises.length) {
              resolve(outputs);
            }
          })
          .catch(reject);
      });
    });
  }

  promiseAll([Promise.resolve(1), Promise.resolve(2)]).then(console.log);
}
