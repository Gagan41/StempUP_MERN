// A) Get First Character
function getFirstChar(str) {
  if (str.length === 0) return "";
  return str.charAt(0);
}

// B) Join Strings using concat()
function joinStrings(str1, str2) {
  return str1.concat(str2);
}

// C) Extract Word using slice
function extractWord(str, start, end) {
  return str.slice(start, end);
}

// D) Replace first occurrence of word
function replaceWord(str, oldWord, newWord) {
  return str.replace(oldWord, newWord);
}

// E) Clean spaces and convert to uppercase
function cleanAndUpper(str) {
  return str.trim().toUpperCase();
}

// F) Split string into words
function splitIntoWords(str) {
  return str.split(" ");
}
console.log("A)", getFirstChar("JavaScript")); // "J"
console.log("B)", joinStrings("Hello", "World")); // "HelloWorld"
console.log("C)", extractWord("Programming", 0, 4)); // "Prog"
console.log("D)", replaceWord("Hello World", "World", "Students")); // "Hello Students"
console.log("E)", cleanAndUpper("   learn js   ")); // "LEARN JS"
console.log("F)", splitIntoWords("I love JavaScript")); // ["I","love","JavaScript"]
