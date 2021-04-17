const buttons = document.querySelectorAll('.buttons');
const input = document.querySelector('.input');
const inspect = document.querySelector('.inspect');

let inputVal = input.value;
let isDot = false;
let operators = ['+', '-', '*', '/', '%'];

let props = {
	firstVal: null,
	operator: null,
	lastVal: null,
};

const setToNull = () => {
	inputVal = '0';
	input.value = inputVal;
	isDot = false;
};

const updateDisplay = () => {
	input.value = inputVal;
};

const countResult = () => {
	const { firstVal, operator, lastVal } = props;
	if (operator === '+') {
		inputVal = parseFloat(firstVal) + parseFloat(lastVal);
	}
	if (operator === '-') {
		inputVal = parseFloat(firstVal) - parseFloat(lastVal);
	}
	if (operator === '*') {
		inputVal = parseFloat(firstVal) * parseFloat(lastVal);
	}
	if (operator === '/') {
		inputVal = parseFloat(firstVal) / parseFloat(lastVal);
	}
	if (operator === '%') {
		inputVal = parseFloat(firstVal) % parseFloat(lastVal);
	}
};

const updateInspect = () => {
	if (inputVal === '0'){
      inspect.textContent = '';
   }
	if (props.operator !== null) {
		inspect.textContent = props.firstVal + props.operator;
	}
	if (props.lastVal !== null) {
		inspect.textContent = props.firstVal + props.operator + props.lastVal;
	}
};

updateInspect();

buttons.forEach((button) => {
	button.addEventListener('click', (e) => {
		if (e.target.textContent === 'C') {
			setToNull();
		} else if (e.target.textContent === 'del') {
			let length = input.value.length;
			inputVal = input.value.substr(0, length - 1);
			updateDisplay();
			if (input.value === '') {
				inputVal = '0';
				updateDisplay();
            updateInspect();
			}
		} else if (e.target.textContent === '.') {
			if (isDot === true) return;
			inputVal += e.target.textContent;
			isDot = true;
			updateDisplay();
			updateInspect();
		} else if (operators.includes(e.target.textContent)) {
			props.firstVal = inputVal;
			props.operator = e.target.textContent;
			updateInspect();
			setToNull();
		} else if (e.target.textContent === '=') {
			props.lastVal = inputVal;
			countResult();
         updateInspect();
			updateDisplay();
		} else {
			inputVal += `${e.target.textContent}`;
			if (inputVal.charAt(0) === '0' && inputVal.charAt(1) !== '.') {
				inputVal = inputVal.substr(1);
				updateDisplay();
			} else {
				updateDisplay();
			}
		}
	});
});
