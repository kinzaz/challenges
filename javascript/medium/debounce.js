const debounce = function (fn, t) {
  let timer;
  return function () {
    clearTimeout(timer);
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    timer = setTimeout(fnCall, t);
  };
};

const log = debounce(console.log, 1000);
