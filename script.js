let firstNumber = "";
let secondNumber = "";
let result = "";
let currentOperator = null;
let resetScreen = false;

const display = document.getElementById("display");
const numButton = document.getElementsByClassName("numButton");
const opButton = document.getElementsByClassName("opButton");
const equalButton = document.getElementById("eqButton");
const resetButton = document.getElementById("resetButton");

const openBracketBtn = document.querySelector(".openBracketBtn");

const closeBracketBtn = document.querySelector(".closeBracketBtn");


let numButtonArray = Array.from(numButton);

numButtonArray.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});
const updateFontSize = () => {
  const displayContent = display.textContent;
  const contentLength = displayContent.length;

  let baseFontSize = 24;
  if (contentLength > 15) {
    baseFontSize = Math.floor(240 / contentLength);
  }
  display.style.fontSize = `${baseFontSize}px`;
};

const appendChar = (char) => {
  if (resetScreen) {
    display.textContent = "";
    resetScreen = false;
  }
  display.textContent += char;
  updateFontSize();
};

// numButtonArray.forEach((button) => {
//   button.addEventListener("click", ()=>appendChar(button.textContent));
// });

let opButtonArray = Array.from(opButton);

opButtonArray.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

// opButtonArray.forEach((button) => {
//   if (button.textContent === "=") {
//     button.addEventListener("click", () => compute());
//   } else {
//     button.addEventListener("click", () => appendChar(button.textContent));
//   }
// });

equalButton.addEventListener("click", () => compute());

resetButton.addEventListener("click", () => clear());

openBracketBtn.addEventListener("click", () => appendChar("("));
closeBracketBtn.addEventListener("click", () => appendChar(")"));
const appendNumber = (num) => {
  if (resetScreen) {
    display.textContent = "";
    resetScreen = false;
  }
  if (num === "." && display.textContent.includes(".")) {
    return;
  }
  display.textContent += num;
  updateFontSize();
};

const setOperation = (op) => {
  if (currentOperator !== null) compute();
  firstNumber = display.textContent;
  currentOperator = op;
  resetScreen = true;
};

const compute = () => {
  secondNumber = display.textContent;
  const res = operate(currentOperator, firstNumber, secondNumber);
  if (res !== null) {
    display.textContent = res;
    currentOperator = null;
  } else {
    display.textContent = "Error!";
    resetScreen = true;
  }
  updateFontSize();
};


// const compute = ()=>{
//     const expression = display.textContent;
//     try{
//         const result = eval(expression);
//         display.textContent = result;
//         resetScreen = true;
//     }catch(error){
//         display.textContent = 'Error';
//         resetScreen = true;
//     }
//     updateFontSize();
// }
const clear = () => {
  display.textContent = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  updateFontSize();
};

const operate = (operator, a, b) => {
  a = Number(a);
  b = Number(b);

  if (isNaN(a) || isNaN(b)) {
    return "Error";
  }
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? null : a / b;
    default:
      return b;
  }
};

const backspaceButton = document.getElementById("backspaceButton");

const handleBackSpace = () => {
  const currentContent = display.textContent;
  display.textContent = currentContent.slice(0, -1);
  updateFontSize();
};

backspaceButton.addEventListener("click",()=>handleBackSpace());

const handleKeyPress = (e) => {
  const key = e.key;
  switch (key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
    case ".":
      appendNumber(key);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      setOperation(key);
      break;
    case "=":
    case "Enter":
      compute();
      break;
    case "Backspace":
      handleBackSpace();
      break;
    case "c":
    case "C":
      clear();
      break;
    default:
      break;
  }
};

document.addEventListener("keydown", handleKeyPress);
