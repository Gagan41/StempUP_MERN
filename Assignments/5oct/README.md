Browser Wizard Dashboard

An interactive Browser Dashboard built using pure HTML, CSS, and JavaScript — no frameworks, no backend!
It lets you explore and interact with all the major features of the Browser Object Model (BOM) in a fun, visual way.

Think of it as your mini “control center” for the browser itself

Project Overview
The Browser Dashboard demonstrates how JavaScript interacts with the browser window, screen, navigator, and history using BOM (Browser Object Model) APIs.

It includes
User interaction popups (alert, confirm, prompt)
Window & screen information display
Navigator and URL details
Functional buttons for window actions (open, close, reload, etc.)
Dynamic clock and delayed messages using timers
Visual history of all user actions
Animated buttons and modern card-style layout

File Structure
BrowserDashboard/
│
├── index.html → Main HTML structure
├── style.css → Styling & layout
└── script.js → JavaScript logic and interactivity

How It Was Built

This dashboard is built entirely using vanilla JavaScript, focusing on the Browser Object Model (BOM) features.

1. User Interaction
   On page load → alert() shows a welcome message.
   confirm() asks a yes/no question.
   prompt() collects user input (like a name or favorite product).
   Each response updates the dashboard dynamically and gets logged in the interaction history.

2. Window & Screen Info
   Displays:
   innerWidth / innerHeight (viewport size)
   outerWidth / outerHeight (full browser window size)
   screen.width / screen.height
   URL details via window.location
   Browser info via navigator.userAgent, platform, language
   Auto-updates when the browser window is resized.

3. Window Methods
   Buttons demonstrate real browser actions:
   Open New Window: window.open()
   Close Window: Closes last opened window
   Reload Page: location.reload()
   Back / Forward: Uses history.back() and history.forward()
   Print Page: Opens browser print dialog

4. Timers & Dynamic Updates
   A real-time digital clock runs using setInterval().
   A delayed message appears after 3 seconds with setTimeout().
   You can manually trigger or stop timers.

5. History Tracker
   Every interaction (button click, resize, etc.) is logged in a live history panel.
   Each log entry includes a timestamp.
   Users can clear history with one click.

6. Animations & Feedback
   Buttons flash when clicked (CSS .clicked animation).
   New history items animate into view.
   Dashboard uses a bright, friendly color theme and card layout.

How to Run the Project

You have two easy ways to run it:
Option 1 — Using Live Server (Recommended)
Install the Live Server extension in VS Code.
Open the BrowserDashboard folder in VS Code.
Right-click index.html → “Open with Live Server”.
The dashboard will open automatically in your browser.

Option 2 — Directly in Browser
Locate your index.html file in File Explorer / Finder.
Double-click it (or right-click → Open with → Your Browser).
The dashboard will run directly, no setup required.
Works perfectly on Chrome, Edge, Firefox, or Brave.
