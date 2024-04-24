// HTML DOM elements
const buttons = document.querySelector('.buttons');
const buttonsArray = [...buttons.children];

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
				return result;
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
		setOperand(buttonValueType);
	} else if (['+', '-', '*', '/'].includes(buttonValueType)) {
		setOperator(buttonValueType);
	} else if (buttonValueType === '=') {
		// Handle input as an equals operator
	} else if (buttonValueType === 'ac') {
		clearAll();
	} else if (buttonValueType === 'del') {
		// Handle input as delete last input
	} else if (buttonValueType === '.') {
		// handle input as a decimal point
	}
}

// Assign first operand
function setOperand(operand) {
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
	// Handle the case where both operands are assigned and operator clicked again calls operate
	if (firstOperand !== '' && secondOperand !== '') {
		// Operands reversed since we hold the first value in the second one
		secondOperand = operate(secondOperand, firstOperand, operatorValue);
		updateDisplay(secondOperand);
		firstOperand = '';
		// Handle error while performing math operations
		if (isNaN(secondOperand)) {
			updateHistoryDisplay();
			disableButtons();
			return;
		}
		// Push clicked operator to the variable since its will be used for the next calculation
		operatorValue = operator;
	}
	updateHistoryDisplay(`${secondOperand} ${operatorValue}`);
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

// Event listener
buttons.addEventListener('click', handleButtonClick);
