// 1. Function Hoisting
console.log("Hoisting Example (Works):");
hoistedFunction(); // works because function declarations are hoisted

function hoistedFunction() {
  console.log("This function is hoisted!");
}

console.log("Hoisting Example (Does NOT work):");
// notHoistedFunction(); // ❌ Uncommenting will throw error
var notHoistedFunction = function () {
  console.log("This is a function expression, not hoisted.");
};

// 2. Function Expressions & Arrow Functions
console.log("\nFunction Expressions vs Arrow Functions:");

const squareExpression = function (n) {
  return n * n;
};

const squareArrow = (n) => n * n;

console.log("Expression Square(4):", squareExpression(4));
console.log("Arrow Square(4):", squareArrow(4));
// Difference: Function expressions can use 'this', arrow functions do not bind their own 'this'.

// 3. Self-Invoking & Anonymous Functions
(function () {
  console.log("\nAssignment Started!");
})();

// 4. Call, Apply, Bind
console.log("\nCall, Apply, Bind Example:");
const student = { name: "Alex", marks: 85 };

function printStudentInfo(subject) {
  console.log(`Student ${this.name} scored ${this.marks} in ${subject}`);
}

printStudentInfo.call(student, "Math"); // Call
printStudentInfo.apply(student, ["Science"]); // Apply
const boundFn = printStudentInfo.bind(student, "English");
boundFn(); // Bind

// 5. Closures
console.log("\nClosures Example:");
function counter() {
  let count = 0;
  return function () {
    count++;
    console.log("Current Count:", count);
  };
}
const myCounter = counter();
myCounter();
myCounter();
myCounter();

// 6. Function Constructors
console.log("\nFunction Constructor Example:");
function Car(brand, model) {
  this.brand = brand;
  this.model = model;
  this.getDetails = function () {
    return `Brand: ${this.brand}, Model: ${this.model}`;
  };
}
const car1 = new Car("Toyota", "Fortuner");
console.log(car1.getDetails());

// 1. Destructuring
console.log("\nDestructuring Example:");
const person = { name: "Sara", age: 25, city: "Delhi" };
const { name, age, city } = person;
console.log(name, age, city);

const numbers = [10, 20, 30];
const [x, y, z] = numbers;
console.log(x, y, z);

// 2. Template Literals
console.log("\nTemplate Literals Example:");
console.log(`Hello, my name is ${name}. I am ${age} years old and live in ${city}.`);

// 3. Spread & Rest Operators
console.log("\nSpread & Rest Operators Example:");
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
console.log("Sum:", sum(1, 2, 3, 4, 5));

const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2];
console.log("Merged Array:", merged);

// 4. Optional Chaining & Nullish Coalescing
console.log("\nOptional Chaining & Nullish Coalescing:");
const user = { profile: { email: "abc@gmail.com" } };
console.log("Safe Access:", user.profile?.address?.city); // undefined
const phone = user.profile.phone ?? "No phone available";
console.log("Phone:", phone);

// 5. Strict Mode
console.log("\nStrict Mode Example:");
function withoutStrict() {
  undeclaredVar = 10; // Works (bad practice!)
  console.log("Without strict:", undeclaredVar);
}
withoutStrict();

function withStrict() {
  "use strict";
  // undeclaredVar2 = 20; // ❌ Uncommenting throws ReferenceError
  console.log("With strict mode enforced, undeclared variables are not allowed.");
}
withStrict();

// 6. JS Versions Note
/*
ES6 introduced major improvements to JavaScript:
1. Arrow functions, classes, template literals for cleaner syntax.
2. let/const for better scoping.
3. Spread/rest, destructuring, modules, promises, async/await.
4. More powerful, concise, and maintainable code compared to ES5.
*/
