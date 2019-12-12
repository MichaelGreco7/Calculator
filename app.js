// creating an object to help us keep track of these values.
const calculator = {
  //The calculator object holds all the data that we need to construct a valid expression.
  displayValue: "0", // displayValue holds a string value that represents the input of the user or the result of an operation. This is what will be shown on the screen.
  firstOperand: null, // firstOperand will hold the first operand for any expression. This is set to null for now.
  waitingForSecondOperand: false, // waitingForSecondOperand is essentially a flag that checks whether an expression can be evaluated or whether the second operand needs to be inputed.
  operator: null // The operator key will hold the operator for an expression. Also set to null.
};

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
}

updateDisplay();

// Handling Key Presses
// Let us listen for clicks on the calculator and determine what type of key was clicked.

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", event => {
  const { target } = event; // The target variable is an object that represents the element that was clicked.
  // If the element that was clicked is not a button..
  if (!target.matches("button")) {
    // Exit the function
    return;
  }
  if (target.classList.contains("operator")) {
    console.log("operator", target.value);
    return;
  }
  if (target.classList.contains("decimal")) {
    inputDecimal(target.value); // Inside the inputDecimal function, we use the includes method to
    updateDisplay(); // check if displayValue does not already contain a decimal point.
    return; // Then we append the dot to the number. Otherwise, we do nothing.
  }
  if (target.classList.contains("all-clear")) {
    console.log("clear", target.value);
    return;
  }
  inputDigit(target.value);
  updateDisplay();
  //   In the inputDigit function, we use the ternary operator (?) to check if the current value displayed on
  //   the calculator is ‘0’ (the default).
  //   Finally we call updateDisplay() to update the information on the screen after each button is clicked.
});

// Inputting the digits

function inputDigit(digit) {
  const { displayValue } = calculator;
  // Overwrite 'displayValue' if the current value is '0' otherwise append to it.
  calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
}

// Inputting a decimal point

// When the decimal point key is clicked, we need to append a decimal point to whatever is
// displayed on the screen except if it already contains a decimal point.

function inputDecimal(dot) {
  // If the 'displayValue' does not contain a deimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}
