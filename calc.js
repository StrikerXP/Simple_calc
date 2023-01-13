'use strict';

const elements = {
    squareRoot: document.querySelector('[data-sqrt]'),
    computeEqual: document.querySelector('[data-equal]'),
    slice: document.querySelector('[data-slice]'),
    clear: document.querySelector('[data-clear]'),
};

const numbers = document.querySelectorAll('[data-number]');
const operation = document.querySelectorAll('[data-operation]');
const currentOperandNumber = document.querySelector('[data-current-operand]');
const prevOperandNumber = document.querySelector('[data-previous-operand]');

class Calc {
    constructor(prevOperandNumber, currentOperandNumber) {
        this.prevOperandTextNumber = prevOperandNumber;
        this.currentOperandTextNumber = currentOperandNumber;
        this.clear();
    }

    clear() {
        this.currentOperandValue = '';
        this.prevOperandValue = '';
        this.operation = null;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperandValue.includes('.')) return;
        this.currentOperandValue = this.currentOperandValue.toString() + number.toString();
    }

    getResultNumber(number) {
        if (isNaN(parseFloat(number))) return '';
        return number.toLocaleString('ua');
    }

    chooseOperation(operation) {
        if (operation === '%' && this.prevOperandValue === '') return;
        if (this.operation === '%') this.operation = operation;
        if (operation === '%' && this.operation !== '%') this.operation += '%';
        if (this.currentOperandValue === '') return;
        if (this.prevOperandValue !== '') this.computeEqual();
        this.prevOperandValue = this.currentOperandValue;
        this.operation = operation;
        this.currentOperandValue = '';
    }

    computeEqual() {
        let equalResult;
        let previousNumber = parseFloat(this.prevOperandValue);
        let currentNumber = parseFloat(this.currentOperandValue);
        if (isNaN(previousNumber) || isNaN(currentNumber)) return;
        switch (this.operation) {
            case '+%':
                equalResult = previousNumber * (100 + currentNumber) / 100;
                break;
            case '-%':
                equalResult = previousNumber * (100 - currentNumber) / 100;
                break;
            case '×%':
                equalResult = previousNumber + currentNumber;
                break;
            case '+÷':
                equalResult = previousNumber + currentNumber;
                break;
            case '+':
                equalResult = previousNumber + currentNumber;
                break;
            case '-':
                equalResult = previousNumber - currentNumber;
                break;
            case '÷':
                equalResult = previousNumber / currentNumber;
                break;
            case '×':
                equalResult = previousNumber * currentNumber;
                break;
        }
        this.currentOperandValue = equalResult;
        this.prevOperandValue = '';
        this.operation = null;
    }

    squareRoot() {
        if (this.currentOperandValue !== '') this.currentOperandValue = Math.sqrt(this.currentOperandValue);
        if (this.prevOperandValue !== '' && this.currentOperandValue === '') this.prevOperandValue = Math.sqrt(this.prevOperandValue);
    }

    numberPi() {
        this.currentOperandValue = Math.PI;
    }

    slice() {
        this.currentOperandValue = this.currentOperandValue.toString().slice(0, -1);
    }

    displayUpdate() {
        this.currentOperandTextNumber.innerText = this.getResultNumber(this.currentOperandValue);
        if (this.operation != null) {
            this.prevOperandTextNumber.innerText = `${this.getResultNumber(this.prevOperandValue)} ${this.operation}`;
        } else {
            this.prevOperandTextNumber.innerText = '';
        }
    }
}

const calculator = new Calc(prevOperandNumber, currentOperandNumber);

numbers.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.displayUpdate();
    });
});

operation.forEach(operationButton => {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.displayUpdate();
    });
});

for (let element in elements) {
    elements[element].addEventListener('click', () => {
        calculator[element]();
        calculator.displayUpdate();
    })
}
