'use strict';

const currentNumber = document.querySelector('.curNum');
const previousNumber = document.querySelector('.prevNum p');
const mathSign = document.querySelector('.mathSign');
const numbersButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const calculatroHistory = document.querySelector('.history');
const historyBtn = document.querySelector('.history-btn');

let result = '';

function displayNumber() {
  if (this.textContent === '.' && currentNumber.innerHTML.includes('.')) return;
  if (this.textContent === '.' && currentNumber.innerHTML === '')
    return (currentNumber.innerHTML = '.0');

  currentNumber.innerHTML += this.textContent;
}

function operate() {
  if (currentNumber.innerHTML === '' && this.textContent === '-') {
    currentNumber.innerHTML = '-';
    return;
  } else if (currentNumber.innerHTML === '') {
    return;
  }

  if (mathSign.innerHTML !== '') {
    showResult();
  }
  previousNumber.innerHTML = currentNumber.innerHTML;
  mathSign.innerHTML = this.textContent;
  currentNumber.innerHTML = '';
}

function showResult() {
  if (previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return;

  let a = +currentNumber.innerHTML;
  let b = +previousNumber.innerHTML;
  let operator = mathSign.innerHTML;

  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = b - a;
      break;
    case 'x':
      result = a * b;
      break;
    case ':':
      result = b / a;
    case '2^':
      result = b ** a;
      break;
  }

  addToHistory();
  historyBtn.classList.add('active');
  currentNumber.innerHTML = result;
  previousNumber.innerHTML = '';
  mathSign.innerHTML = '';
}

function addToHistory() {
  const newHistoryItem = document.createElement('li');
  newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result}`;
  newHistoryItem.classList.add('history-item');
  calculatroHistory.appendChild(newHistoryItem);
}

function clearHistory() {
  calculatroHistory.textContent = '';
  if (calculatroHistory.textContent === '')
    historyBtn.classList.remove('active');
}

function clearScreen() {
  result = '';
  currentNumber.innerHTML = '';
  previousNumber.innerHTML = '';
  mathSign.innerHTML = '';
}

// Nasłuchiwanie przycisków
operatorButtons.forEach(button => button.addEventListener('click', operate));

equalsButton.addEventListener('click', showResult);

clearButton.addEventListener('click', clearScreen);

numbersButtons.forEach(button =>
  button.addEventListener('click', displayNumber)
);

historyBtn.addEventListener('click', clearHistory);
