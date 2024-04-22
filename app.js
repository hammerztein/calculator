// HTML DOM elements
const buttons = document.querySelector('.buttons');

// Calculator variables
let firstOperand = '0';
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
			if (secondNumber === 0) {
				result = "Hey Brainiac you can't divide by zero.";
				return;
			}
			result = divide(firstNumber, secondNumber);
			break;
		default:
			result = 'Please choose correct operator!';
	}

	return result;
}

function handleButtonClick(event) {
	const buttonValueType = event.target.dataset.value;

	// if button value type doesnt equal NaN
	if (!isNaN(buttonValueType)) {
		// Handle input as a number
	} else if (['+', '-', '*', '/'].includes(buttonValueType)) {
		// Handle input as an arithmetic operator
	} else if (buttonValueType === '=') {
		// Handle input as an equals operator
	} else if (buttonValueType === 'ac') {
		// Handle input as clear all
	} else if (buttonValueType === 'del') {
		// Handle input as delete last input
	} else if (buttonValueType === '.') {
		// handle input as a decimal point
	}
}

// Event listener
buttons.addEventListener('click', handleButtonClick);
