
const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculates the first and second values based on the operator from input
const calculate = {
    // Object key: anonymous arrow func
    '/': (firstNum, secNum) => firstNum / secNum,
    '*': (firstNum, secNum) => firstNum * secNum,
    '+': (firstNum, secNum) => firstNum + secNum,
    '-': (firstNum, secNum) => firstNum - secNum,
};

let expression = '';

// Updates the display with the current expression
function updateDisplay(value) {
    calculatorDisplay.textContent = value;
}

// Sends the number value to the current expression
function sendNumberValue(number) {
    expression += number;
    updateDisplay(expression);
}

// Adds decimal to the current expression
function addDecimal() {
    if (!expression.includes('.')) {
        expression += '.';
        updateDisplay(expression);
    }
}

// Uses operator and update the current expression
function useOperator(operator) {
    if (expression.length > 0 && !isNaN(expression[expression.length - 1])) {
        expression += operator;
        updateDisplay(expression);
    }
}

// Evaluates the expression
function evaluateExpression() {
    // Parse float function to convert the current string display to a floating point value for further calculations
    const displayArray = expression.split(/([+\-*/])/);
    let result = parseFloat(displayArray[0]);

    for (let i = 1; i < displayArray.length; i += 2) {
        const operator = displayArray[i];
        const nextValue = parseFloat(displayArray[i + 1]);
        result = calculate[operator](result, nextValue);
    }

    updateDisplay(result);
    expression = result.toString();
}

// Resets all values (Clear)
function resetAll() {
    expression = '';
    updateDisplay('0');
}

// Event Listeners --> for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        if (inputBtn.value === '=') {
            inputBtn.addEventListener('click', evaluateExpression);
        } else {
            inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
        }
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', addDecimal);
    }
});

// Event Listener
clearBtn.addEventListener('click', resetAll);





// const calculatorDisplay = document.querySelector('h1');
// const inputBtns = document.querySelectorAll('button');
// const clearBtn = document.getElementById('clear-btn')

// // Calculate first and second values depending on operator
// const calculate = {
//     '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

//     '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

//     '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

//     '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

//     '=': (firstNumber, secondNumber) => secondNumber,
// }

// let firstValue = 0;
// let operatorValue = '';
// let awaitingNextValue  = false;

// function sendNumberValue(number) {
//         //Replace current display value if first value is entered
//     if (awaitingNextValue) {
//         calculatorDisplay.textContent = number;
//         awaitingNextValue = false;
//     } else {
//         //if the current diplay value is 0, replace it, if not add number
//         const displayValue = calculatorDisplay.textContent;
//         calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
//     }
// }

// function addDecimal() {

//     // If operator pressed, don't add decimal
//     if (awaitingNextValue) return;

//     // if not decimal add one
//     if (!calculatorDisplay.textContent.includes('.')) {
//         calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
//     }
// }

// function useOperator(operator) {
//     const currentValue = Number(calculatorDisplay.textContent);
//     //To prevent multiple operators
//     if(operatorValue && awaitingNextValue) {
//         operatorValue = operator;
//         return;
//     }
//     // Assign firstValue if no value
//     if (!firstValue) {
//         firstValue = currentValue;
//     } else {
//         const calculation = calculate[operatorValue](firstValue, currentValue);
//         calculatorDisplay.textContent = calculation;
//         firstValue = calculation;
//     }

//     // Ready for next value, store operator
//     awaitingNextValue = true;
//     operatorValue = operator;
// }

// // Reset all values, display

// function resetAll() {
//     firstValue = 0;
//     operatorValue = '';
//     awaitingNextValue  = false;
//     calculatorDisplay.textContent = '0';
// }

// // Add Event Listeners for numbers, operators, decimal buttons
// inputBtns.forEach((inputBtn) => {
//     if (inputBtn.classList.length === 0) {
//         inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
//     } else if (inputBtn.classList.contains('operator')) {
//         inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
//     } else if (inputBtn.classList.contains('decimal')) {
//         inputBtn.addEventListener('click', () => addDecimal());
//     }
// });

// // Event Listener
// clearBtn.addEventListener('click', resetAll);

