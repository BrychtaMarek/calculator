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
    return a / b
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
        return display.value = e.target.textContent;
    })
})
