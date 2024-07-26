const lengthOfLongestSubstring = (s) => {
  let windowStart = 0;
  let maxLen = 0;
  let windowSum = 0;
  let cache = {};

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const rightElem = s[windowEnd];

    if (!(rightElem in cache)) {
      cache[rightElem] = 0;
    }

    cache[rightElem]++;

    while (cache[rightElem] > 1) {
      const leftElem = s[windowStart];
      windowSum -= 1;
      cache[leftElem]--;
      if (cache[leftElem] === 0) delete cache[leftElem];
      windowStart++;
    }
    windowSum++;
    maxLen = Math.max(maxLen, windowSum);
  }

  return maxLen;
};

console.log(lengthOfLongestSubstring("abcabcbb"));
