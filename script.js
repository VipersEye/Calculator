const calculator = {
	history: [],
    operandFirst: undefined,
    operandSecond: undefined,
    operator: undefined,
    operatorType: undefined,
    result: undefined,
    compute() {
        let {operandFirst, operandSecond, operator, result} = calculator;
        switch(operator) {
            case '+':
                result = operandFirst + operandSecond;
                break;
            case '-':
                result = operandFirst - operandSecond;
                break;
            case '*':
                result = operandFirst * operandSecond;
                break;
            case '/':
                result = operandFirst / operandSecond;
                break;
            case '%':
                result = operandFirst / 100;
                break;
            case 'negate':
                result = -operandFirst;
                break;
            case '1/':
                result = 1 / operandFirst;
                break;
            case 'sqr':
                result = operandFirst**2;
                break;
            case '√':
                result = Math.sqrt(operandFirst);
                break;
        }
        this.result = result;
        return isNaN(this.result) || !isFinite(this.result) ? alert('Something went wrong... Try again') : this.result;
    }
}


let btnsFunction = document.querySelectorAll('.btn_function');
let btnsOperator = document.querySelectorAll('.btn_operator');
let btnsNumber = document.querySelectorAll('.btn_number');

btnsFunction.forEach(btn => {
    switch (btn.value) {
        case 'CE':
            btn.addEventListener('click', clearSecondOperand);
            break;
        case 'C':
            btn.addEventListener('click', clearAll);
            break;
        case 'Del':
            btn.addEventListener('click', deleteLastNumeral);
            break;
        case '=':
            btn.addEventListener('click', startCompute);
            break;
    }
});

btnsOperator.forEach(btn => {
    btn.addEventListener('click', e => { addOperator(e.target.value) });
});

btnsNumber.forEach(btn => {
	btn.addEventListener('click', e => { addNumeral(e.target.value) });
});






function addNumeral(number) {
    if (calculator.result !== undefined) {
        clearAll();
    }

    let displayResult = document.querySelector('.display_result');
    let newNumeral = number.toString();
    let currentNumber = displayResult.value.toString();
    let newNumber = (currentNumber === '0') ? newNumeral : (currentNumber.includes('.') && newNumeral === '.') ? currentNumber : currentNumber + newNumeral;
    displayResult.value = newNumber; /* Refactor */
    if (newNumber.length > 15) {
        deleteLastNumeral();
    }
}

function deleteLastNumeral() {
    let displayResult = document.querySelector('.display_result');
    let currentNumber = displayResult.value.toString();

    displayResult.value = (currentNumber.length === 1) ? '0' : displayResult.value.slice(0, currentNumber.length - 1);
}


function addOperator(operator) {
    calculator.operandSecond = undefined;
    calculator.operator = undefined;
    calculator.result = undefined;

    let displayOperation = document.querySelector('.display_operation');
    let displayResult = document.querySelector('.display_result');
    
    calculator.operandFirst = Number(displayResult.value);
    calculator.operator = operator;
    defineOperatorType(operator);

    if (calculator.operatorType === 'uno') {
        startCompute();
    } else {
        displayResult.value = '0';
        displayOperation.value = calculator.operandFirst + ' ' + calculator.operator;
    }
}

function startCompute() {
    let displayOperation = document.querySelector('.display_operation');
    let displayResult = document.querySelector('.display_result');

    if (calculator.operatorType === 'uno') {
        let res = calculator.compute();
        displayResult.value = res;
        displayOperation.value = `${calculator.operator}(${calculator.operandFirst}) = ${res}`; 
        calculator.operandFirst = res;
    } else {
        calculator.operandSecond = (calculator.operandSecond === undefined) ? Number(displayResult.value) : calculator.operandSecond;
        let res = calculator.compute();

        displayResult.value = res;
        displayOperation.value = `${calculator.operandFirst} ${calculator.operator} ${calculator.operandSecond} = ${res}`; 
        calculator.operandFirst = res;
    }
};


function clearAll() {
    let displayOperation = document.querySelector('.display_operation');
    let displayResult = document.querySelector('.display_result');

    displayOperation.value = '';
    displayResult.value = '0';
    calculator.operandFirst = undefined;
    calculator.operandSecond = undefined;
    calculator.operator = undefined;
    calculator.operatorType = undefined;
    calculator.result = undefined;
}

function clearSecondOperand() {
    let displayResult = document.querySelector('.display_result');

    displayResult.value = '0';
    calculator.operandSecond = undefined;
}



function defineOperatorType(operator) {
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






window.addEventListener('keydown', e => {
    switch (true) {
        case (e.key >= 0 && e.key < 10 || e.key === '.'):
            addNumeral(e.key); 
            break;
        case (e.key === 'Backspace'):
            deleteLastNumeral();
            break;
        case (e.key === '-'):
        case (e.key === '+'):
        case (e.key === '/'):
        case (e.key === '*'):
        case (e.key === '%'):
            addOperator(e.key);
            break;
        case (e.key === 'Enter'):
            startCompute();
            break;
    }
});