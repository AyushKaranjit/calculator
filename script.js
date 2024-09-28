function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function percentage(num1, num2) {
  return num1 / 100;
}

function dot(num1) {
  return num1 + ".";
}

function operate(num1, num2, operation) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return "Invalid operation";
  }
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
let displayValue = "";
let num1 = "";
let num2 = "";
let operation = "";
let result = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value >= "0" && value <= "9") {
      displayValue += value;
      display.textContent = displayValue;
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      value === "/"
    ) {
      num1 = displayValue;
      operation = value;
      displayValue = "";
    } else if (value === "%") {
      displayValue = percentage(displayValue);
      display.textContent = displayValue;
    } else if (value === ".") {
      displayValue = dot(displayValue);
      display.textContent = displayValue;
    } else if (value === "=") {
      num2 = displayValue;
      result = operate(num1, num2, operation);
      display.textContent = result;
      displayValue = result;
      num1 = "";
      num2 = "";
      operation = "";
    } else if (value === "AC") {
      displayValue = "";
      num1 = "";
      num2 = "";
      operation = "";
      result = "";
      display.textContent = "0";
    } else if (value === "C") {
      displayValue = displayValue.slice(0, -1);
      display.textContent = displayValue;
      if (displayValue === "") {
        display.textContent = "0";
      } else {
        display.textContent = displayValue;
      }
    }
  });
});
