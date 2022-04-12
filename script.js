function operator(operator, numOne, numTwo = NaN) {
	let res = NaN;
	switch(operator) {
		case '+':
			res = numOne + numTwo;
			break;
		case '-':
			res = numOne - numTwo;
			break;
		case '*':
			res = numOne * numTwo;
			break;
		case '/':
			res = numOne / numTwo;
			break;
		case '%':
			res = numOne / 100;
			break;
		case '+-':
			res = -numOne;
			break;
		case '1/x':
			res = 1 / numOne;
			break;
		case '^2':
			res = numOne**2;
			break;
		case 'sqrt':
			res = Math.sqrt(numOne);
			break;
	}
	return isNaN(res) || !isFinite(res) ? alert('Something went wrong... Try again') : res;
}