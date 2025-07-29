let buffer = "0";
let runningTotal = 0;
let previousOperation = null;
let screen = document.querySelector(".input");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}
function handleNumber(number) {
  console.log("number");
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
  rerender();
}

function handleMath(value) {
  if (buffer === "0") {
    //ne rien faire
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperation = value;
  buffer = "0";
  console.log(runningTotal);
}
function flushOperation(intBuffer) {
  if (previousOperation === "+") {
    runningTotal += intBuffer;
  } else if (previousOperation === "X") {
    runningTotal *= intBuffer;
  } else if (previousOperation === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperation === "÷") {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";

      break;
    case "=":
      if (previousOperation === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperation = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === "1") {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "X":
    case "-":
    case "÷":
      handleMath(symbol);
      break;
  }
  rerender();
}

function initialisation() {
  document
    .querySelector(".btn-calculator")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}
function rerender() {
  screen.innerText = buffer;
}
initialisation();
