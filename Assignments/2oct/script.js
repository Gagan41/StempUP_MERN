// ---------------- Mouse Events ---------------- //
const mouseBox = document.getElementById("mouseBox");
const mouseCoords = document.getElementById("mouseCoords");

// Generate random color
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// click → toggle background color
mouseBox.addEventListener("click", () => {
  mouseBox.style.backgroundColor = getRandomColor();
  console.log("Box color changed!");
});

// dblclick → double the size
mouseBox.addEventListener("dblclick", () => {
  mouseBox.style.width = mouseBox.offsetWidth * 2 + "px";
  mouseBox.style.height = mouseBox.offsetHeight * 2 + "px";
  console.log("Box size doubled!");
});

// mouseenter / mouseleave
mouseBox.addEventListener("mouseenter", () => {
  console.log("Mouse entered");
});
mouseBox.addEventListener("mouseleave", () => {
  console.log("Mouse left");
});

// mousemove → show coordinates
mouseBox.addEventListener("mousemove", (e) => {
  mouseCoords.textContent = `Coordinates: X:${e.offsetX}, Y:${e.offsetY}`;
  console.log(`Mouse moved at X:${e.offsetX}, Y:${e.offsetY}`);
});

// ---------------- Keyboard Events ---------------- //
const circle = document.getElementById("circle");
let posX = 0, posY = 0;

document.addEventListener("keydown", (e) => {
  const step = 20;

  switch (e.key) {
    case "ArrowUp":
      posY -= step;
      console.log("ArrowUp pressed → circle moved up");
      break;
    case "ArrowDown":
      posY += step;
      console.log("ArrowDown pressed → circle moved down");
      break;
    case "ArrowLeft":
      posX -= step;
      console.log("ArrowLeft pressed → circle moved left");
      break;
    case "ArrowRight":
      posX += step;
      console.log("ArrowRight pressed → circle moved right");
      break;
    case " ":
      console.log("Spacebar pressed!");
      circle.style.backgroundColor = getRandomColor();
      break;
  }
  circle.style.transform = `translate(${posX}px, ${posY}px)`;
});

// ---------------- Clipboard Events ---------------- //
const textArea = document.getElementById("textArea");
const clipboardOutput = document.getElementById("clipboardOutput");

textArea.addEventListener("copy", (e) => {
  clipboardOutput.textContent = "Copied: " + window.getSelection().toString();
  console.log("Copied:", window.getSelection().toString());
});

textArea.addEventListener("cut", (e) => {
  clipboardOutput.textContent = "Cut: " + window.getSelection().toString();
  console.log("Cut:", window.getSelection().toString());
});

textArea.addEventListener("paste", (e) => {
  const pasted = e.clipboardData.getData("text");
  clipboardOutput.textContent = "Pasted: " + pasted;
  console.log("Pasted text:", pasted);
});

// ---------------- Drag & Drop Events ---------------- //
const draggables = document.querySelectorAll(".draggable");
const dropZone = document.getElementById("dropZone");
const dropMessage = document.getElementById("dropMessage");

draggables.forEach(item => {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    console.log("Drag started:", e.target.id);
  });
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.style.backgroundColor = "#d3ffd3";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.backgroundColor = "";
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const item = document.getElementById(id);

  dropMessage.textContent = `Item ${item.textContent} dropped successfully!`;
  console.log(`Item ${item.textContent} dropped successfully!`);

  dropZone.style.backgroundColor = "";
});
