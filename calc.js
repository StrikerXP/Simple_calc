'use strict';

const numbers = document.querySelectorAll('[data-number]');
const memory = document.querySelectorAll('[data-memory]');
const bracket = document.querySelectorAll('[data-bracket]');
const operation = document.querySelectorAll('[data-operation]');
const percent = document.querySelectorAll('[data-percent]');
const equal = document.querySelector('[data-equal]');
const slice = document.querySelector('[data-slice]');
const clear = document.querySelector('[data-clear]');
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
        const floatNumber = parseFloat(number);
        if (isNaN(floatNumber)) return '';
        return floatNumber.toLocaleString('ua');
    }

    chooseOperation(operation) {
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

    percentNumber() {
        let equalResult;
        let previousNumber = parseFloat(this.prevOperandValue);
        let currentNumber = parseFloat(this.currentOperandValue);
        switch (operation) {
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
        this.operation = null;
    }

    slice() {
        this.currentOperandValue = this.currentOperandValue.toString().slice(0, -1)
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

equal.addEventListener('click', () => {
    calculator.computeEqual();
    calculator.displayUpdate();
});

clear.addEventListener('click', () => {
    calculator.clear();
    calculator.displayUpdate();
});

slice.addEventListener('click', () => {
    calculator.slice();
    calculator.displayUpdate();
})

percent.addEventListener('click', () => {
    calculator.percentNumber();
    calculator.displayUpdate();
})