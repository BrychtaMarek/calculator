function add(a, b){
    return a + b;
}

function subtract( a, b){
    return a - b;
}

function multiply(a, b){
    return a * b
}

function divide(a, b){
    if (b) {
        return a / b
    } else return 'Zero division'
    
}

function operate(a, b, operator){
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
    return round(equals, 4)
}

function round(value, decimals){
    const multiplier = Math.pow(10, decimals)
    console.log(multiplier)
    return Math.round(value * multiplier) / multiplier
}

let num1;
let operator;
let num2;

const display = document.querySelector('#display')
const digitsAndOperators = document.querySelectorAll('.digit, .operator')

digitsAndOperators.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const isDigit = e.target.classList.contains('digit');
        const isOperator = e.target.classList.contains('operator');
        const value = e.target.textContent;

        if (num1 && num2){
            //debugger
            const result = operate(num1, num2, operator);
            display.value = result;
            num1 = result;
            num2 = undefined;
        }
        else if (!num1 && isDigit) {
            num1 = Number(value)
        } else if ( num1 && isDigit){
            num2 = Number(value)
        } else if (isOperator) {
            operator = value
        } 

        if (isDigit){
            display.value = e.target.textContent;
        }
    })
})

const btnEquals = document.querySelector('#btnEquals')

btnEquals.addEventListener('click', () => {
    if (num1 && num2 && operator) {
     const result = operate(num1, num2, operator);
     display.value = result;
     num1 = undefined;
     num2 = undefined;
     operator = undefined;
    }
})

const btnClear = document.querySelector('#reset')

btnClear.addEventListener('click', (e) => {
    display.value = '';
     num1 = undefined;
     num2 = undefined;
     operator = undefined;
})