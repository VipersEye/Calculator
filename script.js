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

let btnsNumber = document.querySelectorAll('.btn_number');

btnsNumber.forEach(btn => {
	btn.addEventListener('click', displayAddNumber);
});





function displayAddNumber(e) {
    let displayResult = document.querySelector('.display_result');
    let newNumeral = e.target.value.toString();
    let currentNumber = displayResult.value.toString();
    let newNumber = currentNumber + newNumeral;
    displayResult.value = newNumber;
    if (newNumber.length > 15) deleteLastNumeral();
}

function deleteLastNumeral() {
    let displayResult = document.querySelector('.display_result');
    displayResult.value = displayResult.value.slice(0, displayResult.value.toString().length - 1);
}