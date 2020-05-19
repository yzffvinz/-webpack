/**
 * base functions
 */
function add(a, b = 3) {
  return a + b;
}

function multiply(a, b = 2) {
  return a * b;
}

function substract(a, b = 1) {
  return a - b;
}

function divide(a, b = 0.5) {
  return a / b;
}

/**
 * compose function
 * @param {Array} functions 
 */
function compose(functions) {
  return function(first) {
    return functions.reduceRight((accumulator, currentValue) => currentValue(accumulator), first);
  }
}

function pipe(functions) {
  return function(first) {
    return functions.reduce((accumulator, currentValue) => currentValue(accumulator), first);
  }
}

/**
 * example
 */
let composed = compose([add, multiply, substract, divide]);
console.log(composed(1)); // 5

let piped = pipe([add, multiply, substract, divide]);
console.log(piped(1)); // 14