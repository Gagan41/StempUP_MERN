# 🧮 Responsive Interactive Calculator

## 📌 Project Overview
I built a simple **responsive calculator web app** using HTML, CSS, and JavaScript.  
It performs basic arithmetic operations (addition, subtraction, multiplication, division), includes a clear (`C`) button, and adapts to desktop and mobile layouts with a modern, styled design.

## 🏗️ Technologies & Reasoning
- **HTML5 Semantic Tags**: Used `<header>`, `<main>`, `<section>`, and `<footer>` to structure content clearly and improve accessibility.  
- **CSS**: Applied Flexbox/Grid for button layout, media queries for responsiveness, hover/active effects, gradient background, rounded corners, and shadows for a polished look.  
- **JavaScript**: Used `functions`, `event listeners (onclick)`, and `eval()` (with safety checks) to handle calculations, prevent invalid inputs, show a welcome alert, and dynamically update the footer year.

## 🚀 How to Run 
1. Place all files in the same folder (ensure `index.html`, `styles.css`, and `script.js` are linked correctly).  
2. Open **index.html** in any modern web browser.  
3. Use the calculator buttons for input; the display updates dynamically.  

## ⚠️ Assumptions & Limitations
- Supports only **basic arithmetic** (+, −, ×, ÷).  
- Input validation prevents invalid sequences (like `++` or `..`).  
- Division by zero shows an error alert.  
- Designed for learning/demo purposes — not a scientific calculator.  