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
    handleOperator(target.value);
    updateDisplay();
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

// When the decimal point key is clicked, we need to append a decimal point to whatever is
// displayed on the screen except if it already contains a decimal point.

function inputDecimal(dot) {
  // If the 'displayValue' does not contain a deimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

// Handling Operators
// The next step is to get the operators (+, -, x, /, =) on the calculator working. There are three scenarios to account for:

// When the user finishes entering the first operand and hits an operator
// This indicates that he/she is ready to enter the second operand.
// What we need to do here is store the first operand and update the display with the new string of numbers.

function handleOperator(nextOperator) {
  // This function return the result which is then stored in the result variable
  // We then display the result to the user by updating the displayValue
  // with this result and also set the firstOperand to the result.
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue); // When an operator key is pressed, we convert the current number displayed on the screen to a number
  // then store the result in calculator.firstOperand if it does not exist already.
  if (firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    // checks if an operator already exists. If so, property lookup is performed for the operator in the performCalculation object
    const result = performCalculation[operator](firstOperand, inputValue); // the function that matches the operator is executed.

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true; // We also set calculator.waitingForSecondOperand to true which indicates that the first operand has been entered and the second one is ready to begin
  calculator.operator = nextOperator; // and calculator.operator to whatever operator key was clicked.
}
console.log(calculator);

// Handling Operators
// When the user finishes the second operand and hits an operator
// The second scenario we want to handle is if the user has finished entering the second operand and an operator key is clicked.
// At this point, all the ingredients to perform a valid calculation is present so we need to display the result of the calculation to the user.

// After 12 + 10, let’s say the user hits the = button. What should happen?
// Well 22 should be presented on the screen as the result of the calculation and
// the firstOperand should be updated to the result so that it can be used in the next calculation.

// Then create a new object called performCalculation with the following properties
const performCalculation = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
  "+": (firstOperand, secondOperand) => firstOperand + secondOperand
};
