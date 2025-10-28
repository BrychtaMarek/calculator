function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b)
}

function divide(a, b) {
    if (b === '0') return 'Zero division'
    const result = Number(a) / Number(b);
    return result;
}

function operate(a, b, operator) {
    let equals;
    switch (operator) {
        case '+':
            equals = add(a, b);
            break;
        case '-':
            equals = subtract(a, b);
            break;
        case '*':
            equals = multiply(a, b);
            break;
        case '/':
            equals = divide(a, b);
            break;
        default:
            break;
    }

    if (typeof (equals) === 'number') {
        return round(equals, 4);
    } else return equals;
}

function round(value, decimals) {
    const multiplier = Math.pow(10, decimals)
    return Math.round(value * multiplier) / multiplier
}

let num1;
let operator;
let num2;

const btnDisplay = document.querySelector('#display')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
let isSecondNumberStarted = false;
let isEqualsCalled = false;

function handleButton(value, type){
    
    if (type === 'digit') {
        // Type into num2 when having operator
        if (operator){
            isSecondNumberStarted = true;
        }
        // Handle reset of the calc when typing number after having a result
        if (isEqualsCalled && !operator){
            num1 = value;
            btnDisplay.value = value;
            isEqualsCalled = false;
            isSecondNumberStarted = false;
            return;
        // Handle typing a new number
        } else if (num1 === undefined){
            num1 = value;
            btnDisplay.value = value;
            return;
        // Handle typing multiple digits to num1    
        } else if (!isSecondNumberStarted){
            num1 += value;
            btnDisplay.value += value;
            return;
        // Handle start of the num2
        } else if (isSecondNumberStarted && !num2){
            num2 = value;
            btnDisplay.value = value;
            return;
        // Handle multiple digits to num2
        } else if (isSecondNumberStarted && num2){
            num2 += value;
            btnDisplay.value += value;
            return;
        }
    }

    if (type === 'operator') {
        // Handle showing result when addding second operator
        if (num1 && num2 && operator){
            const result = operate(num1, num2, operator);
            btnDisplay.value = result;
            num1 = result;
            num2 = undefined;
            isSecondNumberStarted = true;
        }
        operator = value;  
    }
}

digits.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.textContent;
        handleButton(value, 'digit');
    })
})

operators.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.textContent;
        handleButton(value, 'operator');
    })
})


// Equals button behaviour
const btnEquals = document.querySelector('#btnEquals')
btnEquals.addEventListener('click', () => {
    
    if (num1 && (num2 || num2 === 0) && operator) {
        const result = operate(num1, num2, operator);
        btnDisplay.value = result;
        num1 = result;
        num2 = undefined;
        operator = undefined;
        isEqualsCalled = true;
    }
})


// Reset button behaviour
function reset() {
    btnDisplay.value = '';
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    isSecondNumberStarted = false;
}
const btnClear = document.querySelector('#reset');
btnClear.addEventListener('click', () => reset());

// Decimal point behaviour
const btnDecimal = document.querySelector('#decimal');
btnDecimal.addEventListener('click', () => {
    
    num1HasDecimal = num1 ? String(num1).includes('.') : undefined;
    num2HasDecimal = num2 ? String(num2).includes('.') : undefined;

    if (!isSecondNumberStarted && !num1HasDecimal && num1){
        btnDisplay.value += '.';
        num1 += '.';
    }

    if (isSecondNumberStarted && !num2HasDecimal && num2){
        btnDisplay.value += '.';
        num2 += '.';
    }
});

//Backspace btn
const btnDelete = document.querySelector('#delete');
btnDelete.addEventListener('click', () => {
    if (num1 && !isSecondNumberStarted){
        if (num1.length === 1){
            num1 = undefined;
            btnDisplay.value = '';
        } else {
            num1 = num1.slice(0, - 1);
            btnDisplay.value = num1;
        }
    }

    if (num2 && isSecondNumberStarted){
        if (num2.length === 1){
            num2 = undefined;
            btnDisplay.value = '';
        } else {
            num2 = num2.slice(0, - 1);
            btnDisplay.value = num2;
        }
    }
})

