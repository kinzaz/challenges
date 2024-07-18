// sum(1,2) => 3
// sum(1)(2) => 3

const sum = (a, b) => {
  if (b) {
    return a + b;
  }
  return function (b) {
    return a + b;
  };
};

console.log(sum(1, 2));
console.log(sum(1)(3));
