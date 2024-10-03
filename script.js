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

function percentage(num1) {
  return num1 / 100;
}

function dot(num1) {
  return num1 + ".";
}

function operate(num1, num2, operation) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (operation === "+") {
    return num1 + num2;
  } else if (operation === "-") {
    return num1 - num2;
  } else if (operation === "*") {
    return num1 * num2;
  } else if (operation === "/") {
    if (num2 == 0) {
      return "DIV_BY_ZERO";
    }
    return num1 / num2;
  }
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
let displayValue = "";
let num1 = "";
let num2 = "";
let operation = "";
let result = "";
const maxLength = 10;

function formatOutput(value) {
  if (value.toString().length > maxLength) {
    return parseFloat(value).toExponential(2);
  } else if (Number.isInteger(parseFloat(value))) {
    return value;
  } else {
    value = parseFloat(value).toFixed(2);
    return value;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value >= "0" && value <= "9") {
      if (displayValue.length < maxLength) {
        displayValue += value;
        display.textContent = displayValue;
      }
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      value === "/"
    ) {
      if (num1 && operation) {
        num2 = displayValue;
        result = operate(num1, num2, operation);
        result = formatOutput(result);
        display.textContent = result;
        num1 = result;
        displayValue = "";
      } else {
        num1 = displayValue;
        displayValue = "";
      }
      operation = value;
    } else if (value === "=") {
      if (num1 && operation) {
        num2 = displayValue;
        result = operate(num1, num2, operation);
        if (result === "DIV_BY_ZERO") {
          display.textContent = "git gud";
        } else {
          result = formatOutput(result);
          display.textContent = result;
          displayValue = result;
        }
        num1 = "";
        num2 = "";
        operation = "";
      }
    } else if (value === "%") {
      displayValue = percentage(displayValue);
      display.textContent = displayValue;
    } else if (value === ".") {
      if (!displayValue.includes(".")) {
        displayValue = dot(displayValue);
        display.textContent = displayValue;
      }
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

document.addEventListener("keydown", function (event) {
  if (!isNaN(event.key)) {
    // Prevent leading zeros
    if (displayValue === "0") {
      displayValue = "";
    }

    // Append the number if it doesn't exceed the 10-character limit
    if (displayValue.length < 10) {
      displayValue += event.key;
      display.textContent = displayValue;
    }
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    if (num1 && operation) {
      num2 = displayValue;
      result = operate(num1, num2, operation);
      result = formatOutput(result);
      display.textContent = result;
      num1 = result;
      num2 = "";
    } else {
      num1 = displayValue;
    }
    operation = event.key;
    displayValue = "";
  } else if (event.key === "Enter") {
    if (num1 && operation) {
      num2 = displayValue;
      result = operate(num1, num2, operation);
      result = formatOutput(result);
      display.textContent = result;
      num1 = result;
      num2 = "";
      operation = "";
      displayValue = "";
    }
  } else if (event.key === "%") {
    displayValue = percentage(displayValue);
    display.textContent = displayValue;
  } else if (event.key === ".") {
    if (!displayValue.includes(".")) {
      displayValue = dot(displayValue);
      display.textContent = displayValue;
    }
  } else if (event.key === "Backspace") {
    displayValue = displayValue.slice(0, -1);
    display.textContent = displayValue;
    if (displayValue === "") {
      display.textContent = "0";
    } else {
      display.textContent = displayValue;
    }
  } else if (event.key === "Escape") {
    displayValue = "";
    num1 = "";
    num2 = "";
    operation = "";
    result = "";
    display.textContent = "0";
  }
});
