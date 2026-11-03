// 2.1 - Variables
let age = 25;
age = 26;

const name = "Ada";
console.log(name, age);
// name = "Grace"; // TypeError: Assignment to constant variable.

// 2.2 - Data types
console.log(typeof 42); // "number"
console.log(typeof 3.14); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof { name: "Ada" }); // "object"
console.log(typeof [1, 2, 3]); // "object"
console.log(typeof null); // "object" (a known bug in the language)

// 2.3 - Comparison and type coercion
console.log("5" + 3); // "53"
console.log("5" - 3); // 2
console.log("5" * "2"); // 10
console.log(5 == "5"); // true
console.log(5 === "5"); // false
console.log(0 == ""); // true
console.log(null == undefined); // true
console.log(null === undefined); // false

// 2.4 - Truthy and falsy
// Only 0, "" and null are falsy here. "0", " ", [], {} and "false" are truthy.
const values = [0, 1, "", "0", " ", null, [], {}, "false"];

for (const value of values) {
  // JSON.stringify shows strings with quotes, so we can tell 0 and "0" apart
  const shown = JSON.stringify(value);
  if (value) {
    console.log(shown, "is truthy");
  } else {
    console.log(shown, "is falsy");
  }
}

// 2.5 - Template literals
const firstName = "Ada";
const birthYear = 1815;

console.log("Hello, " + firstName + "! You were born in " + birthYear + ".");
console.log(`Hello, ${firstName}! You were born in ${birthYear}.`);
console.log(`In ten years it will be ${new Date().getFullYear() + 10}.`);

// 2.6 - Functions
function add(a, b) {
  return a + b;
}

const multiply = (a, b) => {
  return a * b;
};

const square = (x) => x * x;

console.log(add(2, 3)); // 5
console.log(multiply(2, 3)); // 6
console.log(square(4)); // 16

// Without the default value, greet() would return "Hello, undefined!"
function greet(name = "you") {
  return `Hello, ${name}!`;
}

console.log(greet("Grace")); // "Hello, Grace!"
console.log(greet()); // "Hello, you!"

const isEven = (number) => number % 2 === 0;

console.log(isEven(8)); // true
console.log(isEven(7)); // false

function grade(points) {
  if (points >= 90) {
    return "A";
  } else if (points >= 80) {
    return "B";
  } else if (points >= 60) {
    return "C";
  } else if (points >= 40) {
    return "D";
  } else {
    return "F";
  }
}

console.log(grade(95), grade(72), grade(12)); // A C F

// 🌶️ Extra

// 0.1 + 0.2 is 0.30000000000000004, because numbers are stored in binary
// and 0.1 cannot be represented exactly.
console.log(0.1 + 0.2 === 0.3); // false

const almostEqual = (a, b) => Math.abs(a - b) < Number.EPSILON;

console.log(almostEqual(0.1 + 0.2, 0.3)); // true

// NaN ("Not a Number") is not equal to anything, not even itself,
// so we need Number.isNaN to check for it
function toNumber(text) {
  const number = Number(text);
  if (Number.isNaN(number)) {
    return null;
  }
  return number;
}

console.log(toNumber("42")); // 42
console.log(toNumber("abc")); // null

// Closure: the inner function remembers the count variable.
// Each call to createCounter() creates a new, separate count variable.
function createCounter() {
  let count = 0;
  return () => {
    count = count + 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

const anotherCounter = createCounter();
console.log(anotherCounter()); // 1

// Scope: let and const only exist inside the block {} where they are declared
const x = "global";

function test() {
  const x = "local";
  if (true) {
    const x = "block";
    console.log(x); // "block"
  }
  console.log(x); // "local"
}

test();
console.log(x); // "global"
