
class Calculator{
  constructor(previousOperandTextElement,currentOperandTextElement){
     this.previousOperandTextElement = previousOperandTextElement;
     this.currentOperandTextElement = currentOperandTextElement;
     this.clear();
  }

  clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.opration = undefined;
    this.readyToReset = false;
  }

  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
    
  }

  chooseOperation(operation){
    if (this.currentOperand === '') return;
    if (this.currentOperand !== '' && this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }

  
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    //if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = +(prev + current).toFixed(4);
        break
      case '-':
        computation = +(prev - current).toFixed(4);
        break
      case '*':
        computation = +(prev * current).toFixed(4);
        break
      case '÷':
        computation = +(prev / current).toFixed(4);
        break
      case 'xy':
        computation = +(Math.pow(prev,current)).toFixed(4);
        break  
      case '√x':
        if (prev < 0) computation = "INCORRECTLY";
        else computation = +(Math.sqrt(prev)).toFixed(4)
        break    
      default:
        return;
    }
    this.readyToReset = true;
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }
  plusMinus() {
    if (this.currentOperand.includes('-')) 
        this.currentOperand = this.currentOperand.slice(1)
      else
        this.currentOperand = `-${this.currentOperand}`

  }
}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const plusMinusButton = document.querySelector('[data-operation-plus-minus]')
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {

      if(calculator.previousOperand === "" &&
      calculator.currentOperand !== "" &&
  calculator.readyToReset) {
          calculator.currentOperand = "";
          calculator.readyToReset = false;
      }
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    console.log(button.innerText);
  })
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
plusMinusButton.addEventListener('click', button => {
  calculator.plusMinus()
  calculator.updateDisplay()
})