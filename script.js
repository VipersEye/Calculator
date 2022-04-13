const calculator = {
	history: [],
    numOne: undefined,
    numTwo: undefined,
    operator: undefined,
    result: undefined,
    compute() {
        switch(this.operator) {
            case '+':
                this.res = this.numOne + this.numTwo;
                break;
            case '-':
                this.res = this.numOne - this.numTwo;
                break;
            case '*':
                this.res = this.numOne * this.numTwo;
                break;
            case '/':
                this.res = this.numOne / this.numTwo;
                break;
            case '%':
                this.res = this.numOne / 100;
                break;
            case '+-':
                this.res = -this.numOne;
                break;
            case '1/x':
                this.res = 1 / this.numOne;
                break;
            case '^2':
                this.res = this.numOne**2;
                break;
            case 'sqrt':
                this.res = Math.sqrt(this.numOne);
                break;
        }
        return isNaN(this.res) || !isFinite(this.res) ? alert('Something went wrong... Try again') : this.res;
    }
}

let display = document.querySelector('.display_number');
let btnsNumber = document.querySelectorAll('.btn_number');

let btnDeleteLast = document.querySelector('.btn_function[value=Del]');

btnsNumber.forEach(btn => {
	btn.addEventListener('click', evt=>{
		displayAddNumber(evt.target.value);
        numLimitCheck();
	});
});

btnDeleteLast.addEventListener('click', deleteLastNumeral);






function displayAddNumber(number) {
    display.value = (display.value).toString() + number.toString();
}

function numLimitCheck() {
    if (display.value.toString().length > 16) {
        deleteLastNumeral();
    }
}

function deleteLastNumeral() {
    display.value = display.value.slice(0, display.value.toString().length - 1);
}