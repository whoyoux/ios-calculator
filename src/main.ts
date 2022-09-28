const numberButtons =
  document.querySelectorAll<HTMLButtonElement>("[data-number]");
const operationButtons =
  document.querySelectorAll<HTMLButtonElement>("[data-operation]");
const equalsButton = document.querySelector<HTMLButtonElement>("[data-equals]");
const deleteButton = document.querySelector<HTMLButtonElement>("[data-delete]");
const allClearButton =
  document.querySelector<HTMLButtonElement>("[data-all-clear]");
const previousOperandTextElement = document.querySelector<HTMLDivElement>(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector<HTMLDivElement>(
  "[data-current-operand]"
);

numberButtons!.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons!.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton!.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton!.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton!.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

class Calculator {
  previousOperandTextElement: HTMLDivElement;
  currentOperandTextElement: HTMLDivElement;

  currentOperand: string = "";
  previousOperand: string = "";
  operation: string | null = "";

  constructor(
    previousOperandTextElement: HTMLDivElement,
    currentOperandTextElement: HTMLDivElement
  ) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = null;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number: string) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation: string) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "X":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = null;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }

  getDisplayNumber(number: string) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
}

const calculator = new Calculator(
  previousOperandTextElement!,
  currentOperandTextElement!
);

export {};
