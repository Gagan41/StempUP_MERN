const addBookInput = document.getElementById("addBookInput");
const addFirstInput = document.getElementById("addFirstInput");

const pushBtn = document.getElementById("pushBtn");
const popBtn = document.getElementById("popBtn");
const unshiftBtn = document.getElementById("unshiftBtn");
const shiftBtn = document.getElementById("shiftBtn");

const searchInput = document.getElementById("searchInput");
const includesBtn = document.getElementById("includesBtn");
const indexOfBtn = document.getElementById("indexOfBtn");

const demoBtn = document.getElementById("demoBtn");
const output = document.getElementById("output");
const yearSpan = document.getElementById("year");

// Initial array of books
let books = ["Harry Potter", "The Hobbit", "The Alchemist", "Sherlock Holmes"];

function render(message) {
  output.innerHTML = message + "\n\nUpdated Array: " + JSON.stringify(books);
}

// Push
pushBtn.addEventListener("click", () => {
  const title = addBookInput.value.trim();
  if (!title) {
    output.textContent = "Enter a book title to push.";
    return;
  }
  books.push(title);
  render(`push(): Added "${title}" to the end.`);
  addBookInput.value = "";
});

// Pop
popBtn.addEventListener("click", () => {
  if (books.length === 0) {
    output.textContent = "pop(): The list is empty.";
    return;
  }
  const removed = books.pop();
  render(`pop(): Removed "${removed}" from the end.`);
});

// Unshift
unshiftBtn.addEventListener("click", () => {
  const title = addFirstInput.value.trim();
  if (!title) {
    output.textContent = "Enter a book title to unshift.";
    return;
  }
  books.unshift(title);
  render(`unshift(): Added "${title}" to the beginning.`);
  addFirstInput.value = "";
});

// Shift
shiftBtn.addEventListener("click", () => {
  if (books.length === 0) {
    output.textContent = "shift(): The list is empty.";
    return;
  }
  const removed = books.shift();
  render(`shift(): Removed "${removed}" from the beginning.`);
});

// Includes
includesBtn.addEventListener("click", () => {
  const term = searchInput.value.trim();
  if (!term) {
    output.textContent = "Enter a book title to check with includes().";
    return;
  }
  const result = books.includes(term);
  output.innerHTML = `includes(): Is "${term}" available? ${result}\n\nUpdated Array: ${JSON.stringify(books)}`;
});

// IndexOf
indexOfBtn.addEventListener("click", () => {
  const term = searchInput.value.trim();
  if (!term) {
    output.textContent = "Enter a book title to search with indexOf().";
    return;
  }
  const pos = books.indexOf(term);
  output.innerHTML = `indexOf(): Position of "${term}": ${pos}\n\nUpdated Array: ${JSON.stringify(books)}`;
});

// Demo sequence
demoBtn.addEventListener("click", () => {
  books = ["Harry Potter", "The Hobbit", "The Alchemist", "Sherlock Holmes"];
  render("Starting Demo with: " + JSON.stringify(books));

  books.push("Percy Jackson");
  render('After Adding (push "Percy Jackson"):');

  books.pop();
  render("After Removing Last (pop):");

  books.unshift("Game of Thrones");
  render('After Adding at Beginning (unshift "Game of Thrones"):');

  books.shift();
  render("After Removing First (shift):");

  const available = books.includes("The Hobbit");
  output.innerHTML += '\nIs "The Hobbit" available? ' + available;

  const pos = books.indexOf("The Alchemist");
  output.innerHTML += '\nPosition of "The Alchemist": ' + pos + "\n\n";
  output.innerHTML += "Final Array: " + JSON.stringify(books);
});

// Footer year
(function init() {
  yearSpan.textContent = new Date().getFullYear();
  render("Initial Array loaded.");
})();
