// HTML DOM elements
const buttons = document.querySelector('.buttons');

// Calculator variables
let firstOperand = '';
let secondOperand = '';
let operatorValue = '';

// Math operator funcionts
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

// Call correct math operation
function operate(num1, num2, operator) {
	const firstNumber = +num1;
	const secondNumber = +num2;
	let result = 0;
	// TODO make sure that numbers are not empty

	switch (operator) {
		case '+':
			result = add(firstNumber, secondNumber);
			break;
		case '-':
			result = subtract(firstNumber, secondNumber);
			break;
		case '*':
			result = multiply(firstNumber, secondNumber);
			break;
		case '/':
			if (secondNumber === 0) result = "Hey Brainiac you can't divide by zero.";
			result = divide(firstNumber, secondNumber);
			break;
		default:
			result = 'Please choose correct operator!';
	}

	// Reset operators and operand
	firstOperand = '';
	secondOperand = '';
	operatorValue = '';

	return result;
}
