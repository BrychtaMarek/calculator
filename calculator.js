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
    if (b) {
        return Number(a) / Number(a)
    } else if (Number(b) === 0) {
        return 'Zero division'
    }
    else return 'NaN'

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

    if (typeof (equals) === Number) {
        return round(equals, 4);
    } else return equals;
}

function round(value, decimals) {
    const multiplier = Math.pow(10, decimals)
    console.log(multiplier)
    return Math.round(value * multiplier) / multiplier
}

let num1;
let operator;
let num2;

const btnDisplay = document.querySelector('#display')
const digitsAndOperators = document.querySelectorAll('.digit, .operator')
let isSecondNumberStarted = false;

digitsAndOperators.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const isDigit = e.target.classList.contains('digit');
        const isOperator = e.target.classList.contains('operator');
        const value = e.target.textContent;
        let shouldResetDisplay = false;

        if (num1 && num2 && isOperator) {
            const result = operate(num1, num2, operator);
            btnDisplay.value = result;
            num1 = result;
            num2 = undefined;
        }
        else if (!isSecondNumberStarted && isDigit) {
            num1 = num1 === undefined ? value : num1 + value;
        } else if (num1 && isDigit && !num2) {
            num2 = value;
            btnDisplay.value = '';
            shouldResetDisplay = true;
        } else if (num1 && isDigit && num2) {
            num2 += value;
        } else if (isOperator) {
            isSecondNumberStarted = true;
            operator = value
        }

        if (isDigit) {
            if (isSecondNumberStarted && shouldResetDisplay){
                btnDisplay.value = e.target.textContent;
            } else {
                btnDisplay.value += e.target.textContent;
            }
        }
    })
})

const btnEquals = document.querySelector('#btnEquals')

btnEquals.addEventListener('click', () => {
    if (num1 && (num2 || num2 === 0) && operator) {
        const result = operate(num1, num2, operator);
        btnDisplay.value = result;
        num1 = result;
        num2 = undefined;
        operator = undefined;
    }
})

function reset() {
    btnDisplay.value = '';
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    isSecondNumberStarted = false;
}

const btnClear = document.querySelector('#reset')

btnClear.addEventListener('click', () => reset())