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
        return result;
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
    let newNumber;

    if (currentNumber === '0' && newNumeral !== '.') {
        newNumber = newNumeral;
    } else if (currentNumber.includes('.') && newNumeral === '.') {
        newNumber = currentNumber;
    } else {
        newNumber = currentNumber + newNumeral;
    }
    
    displayResult.value = newNumber;
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
    calculator.operatorType = undefined;
    calculator.result = undefined;

    let displayOperation = document.querySelector('.display_operation');
    let displayResult = document.querySelector('.display_result');
    
    calculator.operandFirst = (calculator.operandFirst === undefined) ? Number(displayResult.value) : calculator.operandFirst;
    calculator.operator = operator;
    defineOperatorType(operator);

    if (calculator.operatorType === 'uno') {
        startCompute();
    } else {
        displayOperation.value = `${calculator.operandFirst} ${calculator.operator}`;
        displayResult.value = '0';
    }
}

function startCompute() {
    let displayResult = document.querySelector('.display_result');

    if (calculator.operatorType === 'bin') {
        calculator.operandSecond = (calculator.operandSecond === undefined) ? Number(displayResult.value) : calculator.operandSecond;
    }

    if (calculator.operator !== undefined) {
        let res = calculator.compute();
        let errorMessage = checkError();
        if (errorMessage === 'no errors') {
            showResult();
            calculator.operandFirst = res;
        } else {
            alert(checkError());
            clearAll();
        }
    }
}

function checkError() {
    let {operator, result} = calculator;
    let errorMessage = 'no errors';

    switch (true) {
        case ((operator === '1/' || operator === '/') && result === Infinity):
            errorMessage = 'Error: trying to divide to zero :(';
            break;
        case ( isNaN(result) ):
            errorMessage = 'Error: trying to find root square of negative number';
            break;    
    }
    return errorMessage;
}

function showResult() {
    let displayOperation = document.querySelector('.display_operation');
    let displayResult = document.querySelector('.display_result');
    let{operandFirst, operandSecond, operator, operatorType, result} = calculator;

    if (operatorType === 'uno') {
        displayOperation.value = `${operator}(${operandFirst}) = ${result}`; 
        displayResult.value = result;
    } else {
        displayOperation.value = `${operandFirst} ${operator} ${operandSecond} = ${result}`; 
        displayResult.value = result;
    }
}

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