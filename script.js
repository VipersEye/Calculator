const calculator = {
	history: [],
    numOne: undefined,
    numTwo: undefined,
    operator: undefined,
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
let btnsNumber = document.querySelectorAll('.btn_number');

btnsFunction.forEach(btn => {
    switch (btn.value) {
        case 'CE':
            break;
        case 'C':
            break;
        case 'Del':
            btn.addEventListener('click', deleteLastNumeral);
            break;
        case '=':
            break;
    }
});

btnsNumber.forEach(btn => {
	btn.addEventListener('click', e => {displayAddNumber(e.target.value)});
});




function displayAddNumber(number) {
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