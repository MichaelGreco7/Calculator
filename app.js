const calculator = {
  //The calculator object holds all the data that we need to construct a valid expression.
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
};

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
}

updateDisplay();

// Handling Key Presses

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", event => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }
  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains("decimal")) {
    inputDecimal(target.value); // Inside the inputDecimal function, we use the includes method to
    updateDisplay(); // check if displayValue does not already contain a decimal point.
    return; // Then we append the dot to the number. Otherwise, do nothing.
  }
  if (target.classList.contains("all-clear")) {
    resetCalculator(); // sets all the properties of the calculator object to their original values.
    updateDisplay();
    return;
  }
  inputDigit(target.value);
  updateDisplay();
});

// Inputting the digits

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand == true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // Overwrite 'displayValue' if the current value is '0' otherwise append to it.
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}
console.log(calculator);

// Inputting a decimal point

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) return;
  // If the 'displayValue' does not contain a deimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

// Handling Operators

function handleOperator(nextOperator) {
  // This function return the result which is then stored in the result variable

  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;

    const result = performCalculation[operator](firstOperand, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;

  console.log(calculator);
}

// Handling Operators

const performCalculation = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
  "+": (firstOperand, secondOperand) => firstOperand + secondOperand
};

// Resetting the calculator

function resetCalculator() {
  (calculator.displayValue = "0"),
    (calculator.firstOperand = null),
    (calculator.waitingForSecondOperand = false);
  calculator.operator = null;
  console.log(calculator);
}
