const isPalindromePermutation = (str) => {
  const arr = str.toLowerCase().replace(/[^a-z]/g, "");
  return [...arr].reverse().join("") === arr;
};

console.log(isPalindromePermutation("atco cta"));
console.log(isPalindromePermutation("atcocta"));
console.log(isPalindromePermutation("hello"));
