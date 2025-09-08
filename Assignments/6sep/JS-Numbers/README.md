# Numeric Formatter & Validator

## 📌 What I Built
A JavaScript utility to format numbers (currency, significant digits, scientific notation) and check number safety for finance dashboards.

## 🛠️ Technologies Used
- **HTML**: Structure with semantic tags (`<header>`, `<main>`, `<footer>`).
- **CSS**: Styling for a clean look.
- **JavaScript**: Implemented formatting functions using `toFixed`, `toPrecision`, `toExponential`, and safety checks (`Number.isFinite`, `Number.isSafeInteger`, `Number.EPSILON`).

## 🚀 How to Run
1. Clone/download the project.
2. Open `index.html` in any browser.
3. Open Developer Tools → Console (F12) to test the outputs.

## ⚠️ Assumptions / Limitations
- Focused on basic numeric formatting, not full i18n currency formatting.
- Only handles decimal numbers, no BigInt.
- Safe integer checks are limited to JS Number range.
