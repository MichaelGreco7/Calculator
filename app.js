// // creating an object to help us keep track of these values.
// const calculator = {
//   //The calculator object holds all the data that we need to construct a valid expression.
//   displayValue: "0", // displayValue holds a string value that represents the input of the user or the result of an operation. This is what will be shown on the screen.
//   firstOperand: null, // firstOperand will hold the first operand for any expression. This is set to null for now.
//   waitingForSecondOperand: false, // waitingForSecondOperand is essentially a flag that checks whether an expression can be evaluated or whether the second operand needs to be inputed.
//   operator: null // The operator key will hold the operator for an expression. Also set to null.
// };

// function updateDisplay() {
//   const display = document.querySelector(".calculator-screen");
//   display.value = calculator.displayValue;
// }

// updateDisplay();

const calculator = {
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
