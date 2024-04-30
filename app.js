// HTML DOM elements
const buttons = document.querySelector('.buttons');
const buttonsArray = [...buttons.children];

// Calculator variables
let firstOperand = '0';
let secondOperand = '';
let operatorValue = '';

// Math operator functions
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
				return 'Error';
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

	if (!isNaN(buttonValueType)) {
		setOperand(buttonValueType);
	} else if (['+', '-', '*', '/'].includes(buttonValueType)) {
		setOperator(buttonValueType);
	} else if (buttonValueType === '=') {
		evaluate();
	} else if (buttonValueType === 'ac') {
		clearAll();
	} else if (buttonValueType === 'del') {
		deleteLastNumber();
	} else if (buttonValueType === '.') {
		addDecimalPoint();
	}
}

// Assign first operand
function setOperand(operand) {
	// Set limit to how long can first operand be
	if (firstOperand.length >= 16) return;
	if (firstOperand === '0') {
		firstOperand = operand;
	} else {
		firstOperand += operand;
	}
	updateDisplay(firstOperand);
}

// Assign operator
function setOperator(operator) {
	// Assing operator only if either of operands are empty
	if (firstOperand === '' || secondOperand === '') {
		operatorValue = operator;
	}
	// Handle the case where second operand it not assigned yet
	if (secondOperand === '') {
		secondOperand = firstOperand;
		firstOperand = '';
	}
	// Handle the case where both operands are assigned and operator clicked again
	if (firstOperand !== '' && secondOperand !== '') {
		// If errors exists in evaluations process cancel history display update
		if (evaluate()) {
			operatorValue = operator;
		} else {
			return;
		}
	}
	updateHistoryDisplay(`${secondOperand} ${operatorValue}`);
}

// Evalute
function evaluate() {
	// Cancel out if user clicks equal on empty first operand
	if (firstOperand === '') return false;
	let sum;
	// If second operand it not empty call operate
	if (secondOperand !== '') {
		sum = operate(secondOperand, firstOperand, operatorValue);
		// If sum error return
		if (checkEvaluationResult(sum)) return false;
		sum = roundNumber(sum);
		updateDisplay(sum);
		updateHistoryDisplay(`${secondOperand} ${operatorValue} ${firstOperand} =`);
		secondOperand = sum;
		firstOperand = '';
		return true;
	}
}

// Check if math operation returns number or not
function checkEvaluationResult(value) {
	if (isNaN(value)) {
		updateHistoryDisplay();
		updateDisplay("Hey Brainiac you can't divide by zero.");
		disableButtons();
		return true;
	} else {
		return false;
	}
}

// Update sum display
function updateDisplay(value) {
	const display = document.querySelector('.sum');
	display.textContent = value;
}

// Update history display
function updateHistoryDisplay(value = '') {
	const display = document.querySelector('.history');
	display.textContent = value;
}

// Disable all buttons except AC
function disableButtons() {
	buttonsArray.forEach((button) => {
		if (button.dataset.value !== 'ac') {
			button.classList.add('disabled');
		}
	});
}

// Enable all buttons
function enableButtons() {
	buttonsArray.forEach((button) => {
		if (button.classList.contains('disabled')) {
			button.classList.remove('disabled');
		}
	});
}

// Clear all
function clearAll() {
	firstOperand = '0';
	secondOperand = '';
	operatorValue = '';
	updateDisplay(firstOperand);
	updateHistoryDisplay();
	enableButtons();
}

// Delete last number
function deleteLastNumber() {
	// Both conditions return true only if operate has return a value
	if (firstOperand === '' && operatorValue !== '') {
		// Clear out history display
		updateHistoryDisplay('');
		return;
	}
	// Default value of first operand returns same value
	if (firstOperand === '0') return firstOperand;
	// Single digit returns default value
	if (firstOperand.length === 1) {
		firstOperand = '0';
	}
	// Slice last digit out and reassign back to variable
	if (firstOperand.length > 1) {
		firstOperand = firstOperand.substring(0, firstOperand.length - 1);
	}
	updateDisplay(firstOperand);
}

// Input deciaml point
function addDecimalPoint() {
	if (!firstOperand.includes('.') && firstOperand !== '') {
		firstOperand += '.';
		updateDisplay(firstOperand);
	}
	if (firstOperand === '' && !firstOperand.includes('.')) {
		firstOperand = '0.';
		updateDisplay(firstOperand);
	}
}

// Round number to max of 4 decimal places
function roundNumber(number) {
	if (Number.isInteger(number)) {
		return number;
	} else {
		return parseFloat(number.toFixed(4));
	}
}

// Event listener
buttons.addEventListener('click', handleButtonClick);
