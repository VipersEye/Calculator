const calculator = {
	history: [],
    numOne: undefined,
    numTwo: undefined,
    operator: undefined,
    operatorType: undefined,
    result: undefined,
    compute() {
        switch(this.operator) {
            case '+':
                this.result = this.numOne + this.numTwo;
                break;
            case '-':
                this.result = this.numOne - this.numTwo;
                break;
            case '*':
                this.result = this.numOne * this.numTwo;
                break;
            case '/':
                this.result = this.numOne / this.numTwo;
                break;
            case '%':
                this.result = this.numOne / 100;
                break;
            case 'negate':
                this.result = -this.numOne;
                break;
            case '1/':
                this.result = 1 / this.numOne;
                break;
            case 'sqr':
                this.result = this.numOne**2;
                break;
            case '√':
                this.result = Math.sqrt(this.numOne);
                break;
        }
        return isNaN(this.result) || !isFinite(this.result) ? alert('Something went wrong... Try again') : this.result;
    }
}


let btnsFunction = document.querySelectorAll('.btn_function');
let btnsOperator = document.querySelectorAll('.btn_operator');
let btnsNumber = document.querySelectorAll('.btn_number');

btnsFunction.forEach(btn => {
    switch (btn.value) {
        case 'CE':
            break;
        case 'C':
            btn.addEventListener('click', clearAll)
            break;
        case 'Del':
            btn.addEventListener('click', deleteLastNumeral);
            break;
        case '=':
            btn.addEventListener('click', computeStart);
            break;
    }
});

btnsOperator.forEach(btn => {
    btn.addEventListener('click', e => {operatorAdd(e.target.value)});
});

btnsNumber.forEach(btn => {
	btn.addEventListener('click', e => {displayAddNumber(e.target.value)});
});






function displayAddNumber(number) {
    if (calculator.result != undefined) {
        clearAll();
    }

    let displayResult = document.querySelector('.display_result');
    let newNumeral = number.toString();
    let currentNumber = displayResult.value.toString();
    let newNumber = (currentNumber == '0') ? newNumeral : (currentNumber.includes('.') && newNumeral == '.') ? currentNumber : currentNumber + newNumeral;
    displayResult.value = newNumber;
    if (newNumber.length > 15) deleteLastNumeral();
}

function deleteLastNumeral() {
    let displayResult = document.querySelector('.display_result');
    let currentNumber = displayResult.value.toString();
    displayResult.value = (currentNumber.length == 1) ? '0' : displayResult.value.slice(0, currentNumber.length - 1);
}


function operatorAdd(operator) {
    calculator.numTwo = undefined;
    calculator.operator = undefined;
    calculator.result = undefined;

    let displayOperation = document.querySelector('.display_operation');
    let displayResult = document.querySelector('.display_result');
    
    calculator.numOne = Number(displayResult.value);
    calculator.operator = operator;
    operatorTypeDefine(operator);

    if (calculator.operatorType == 'uno') {
        computeStart();
    }
    else {
        displayResult.value = '0';
        displayOperation.value = calculator.numOne + ' ' + calculator.operator;
    }
}

function computeStart() {
    let displayOperation = document.querySelector('.display_operation');
    let displayResult = document.querySelector('.display_result');

    if (calculator.operatorType == 'uno') {
        let res = calculator.compute();
        displayResult.value = res;
        displayOperation.value = `${calculator.operator}(${calculator.numOne}) = ${res}`; 
        calculator.numOne = res;
    }

    else {
        calculator.numTwo = (calculator.numTwo == undefined) ? Number(displayResult.value) : calculator.numTwo;
        let res = calculator.compute();

        displayResult.value = res;
        displayOperation.value = `${calculator.numOne} ${calculator.operator} ${calculator.numTwo} = ${res}`; 
        calculator.numOne = res;
    }
};


function clearAll() {
    let displayOperation = document.querySelector('.display_operation');
    let displayResult = document.querySelector('.display_result');

    displayOperation.value = '';
    displayResult.value = '0';
    calculator.numOne = undefined;
    calculator.numTwo = undefined;
    calculator.operator = undefined;
    calculator.operatorType = undefined;
    calculator.result = undefined;
}



function operatorTypeDefine(operator) {
    switch(operator) {
        case '%':
        case 'negate':
        case '1/':
        case 'sqr':
        case '√':
            calculator.operatorType = 'uno';
            break;
        case '+':
        case '-':
        case '/':
        case '*':
            calculator.operatorType = 'bin';
            break;
    }
}






window.addEventListener('keydown', e=> {
    switch (true) {
        case (e.key >= 0 && e.key < 10 || e.key == '.'):
            displayAddNumber(e.key); 
            break;
        case (e.key == 'Backspace'):
            deleteLastNumeral();
            break;
        case (e.key == '-'):
        case (e.key == '+'):
        case (e.key == '/'):
        case (e.key == '*'):
        case (e.key == '%'):
            operatorAdd(e.key);
            break;
        case (e.key == 'Enter'):
            computeStart();
            break;
    }
});