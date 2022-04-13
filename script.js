const calculator = {
	history: [],
    numOne: undefined,
    numTwo: undefined,
    operator: undefined,
    result: undefined,
    copmute() {
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