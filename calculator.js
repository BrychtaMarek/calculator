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
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b)
        case '*':
            return multiply(a, b)
        case '/':
            return divide(a, b)
        default:
            break;
    }
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
     const result = operate(num1, num2, operator);
     display.value = result;
     num1 = undefined;
     num2 = undefined;
     operator = undefined;
})