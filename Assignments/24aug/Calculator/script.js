function welcomeMessage() {
  alert("Welcome to My Calculator!");
}

const display = document.getElementById("display");

function appendValue(value) {
  const lastChar = display.value.slice(-1);
  if (
    ["+", "-", "*", "/"].includes(value) &&
    ["+", "-", "*", "/"].includes(lastChar)
  ) {
    return;
  }
  if (value === "." && display.value.endsWith(".")) {
    return;
  }
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function calculateResult() {
  try {
    let result = eval(display.value);
    if (!isFinite(result)) {
      alert("Error: Division by zero!");
      clearDisplay();
    } else {
      display.value = result;
    }
  } catch (e) {
    alert("Invalid Expression!");
    clearDisplay();
  }
}
