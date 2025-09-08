// A) formatMoney
function formatMoney(value, decimals) {
  if (!Number.isFinite(value)) return "Invalid";
  return value.toFixed(decimals);
}

// B) formatSignificant
function formatSignificant(value, sigDigits) {
  if (!Number.isFinite(value)) return "Invalid";
  return value.toPrecision(sigDigits);
}

// C) formatScientific
function formatScientific(value, fractionDigits) {
  if (!Number.isFinite(value)) return "Invalid";
  return value.toExponential(fractionDigits);
}

// D) safeParseNumber
function safeParseNumber(input) {
  let trimmed = input.trim();
  let num = Number(trimmed);
  if (!Number.isNaN(num)) return num;

  // fallback to parseInt if trailing junk
  let intNum = Number.parseInt(trimmed);
  return Number.isNaN(intNum) ? NaN : intNum;
}

// E) isSafeCounterNo
function isSafeCounterNo(n) {
  return Number.isInteger(n) && Number.isSafeInteger(n);
}

// F) addMoney with EPSILON fix
function addMoney(a, b) {
  let sum = a + b;

  // Snap to nearest integer if very close
  if (Math.abs(sum - Math.round(sum)) < 10 * Number.EPSILON) {
    return Math.round(sum);
  }

  // Snap to 2 decimals if very close
  if (Math.abs(sum * 100 - Math.round(sum * 100)) < 10 * Number.EPSILON * 100) {
    return Math.round(sum * 100) / 100;
  }

  return sum;
}

console.log("A)", formatMoney(1234.5, 2));       // "1234.50"
console.log("A)", formatMoney(-9.995, 2));       // "-10.00"
console.log("A)", formatMoney(NaN, 2));          // "Invalid"

console.log("B)", formatSignificant(1234.56, 3)); // "1.23e+3"
console.log("B)", formatSignificant(0.001234, 2)); // "0.0012"

console.log("C)", formatScientific(12345, 2));   // "1.23e+4"
console.log("C)", formatScientific(0.000456, 3));// "4.560e-4"

console.log("D)", safeParseNumber(" 12.3 "));    // 12.3
console.log("D)", safeParseNumber("42px"));      // 42
console.log("D)", safeParseNumber("abc"));       // NaN
console.log("D)", safeParseNumber(""));          // 0

console.log("E)", isSafeCounterNo(9007199254740991)); // true
console.log("E)", isSafeCounterNo(9007199254740992)); // false

console.log("F)", addMoney(0.1, 0.2));           // 0.3
console.log("F)", addMoney(1.005, 0));           // 1.01
