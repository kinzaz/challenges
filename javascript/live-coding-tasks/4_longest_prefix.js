const strs = ["flower", "flow", "flight"];

const longestCommonPrefix = (arr) => {
  let res = "";

  for (let i = 0; i < arr[0].length; i++) {
    const char = arr[0][i];

    for (let j = 1; j < arr.length; j++) {
      if (arr[j][i] !== char) return res;
    }

    res = res + char;
  }
};

console.log(longestCommonPrefix(strs));
