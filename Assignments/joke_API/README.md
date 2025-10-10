Smart Joke Dashboard
====================

What this is
-------------
A single-page, front-end web app that fetches jokes from public APIs (primary: JokeAPI v2, fallback: Official Joke API).
It displays a Joke of the Day, allows fetching by category, stores a clickable history (localStorage) and has a neon-styled, responsive UI.

Files
-----
- index.html       -> Main HTML page
- style.css        -> Styling (neon theme, responsive)
- script.js        -> All JavaScript logic (fetching, UI updates, history)
- output_screenshot.png -> (optional) add your screenshot here

Features implemented
--------------------
- Fetch jokes by category: Programming, Misc, Pun, Dark, Spooky, Christmas, Any.
- "Get Another Joke" button to fetch a new joke.
- "Surprise Me" button to fetch a random category joke.
- Joke of the Day (stored once per day in localStorage).
- Animated reaction emoji whenever a new joke is shown.
- History of previously shown jokes, clickable to revisit; persisted in localStorage.
- Copy and share actions for the current joke.
- Dynamic neon visual changes based on category.
- Responsive layout for desktop and mobile.
- Clean, commented code and easy to extend.

Technical notes
---------------
- Main joke source: https://v2.jokeapi.dev
  - The script uses `fetch()` and `async/await` to retrieve jokes and handles both single and twopart joke formats.
  - Blacklisted flags are included in the request to avoid explicit/NSFW material.
- Fallback: Official Joke API (https://official-joke-api.appspot.com) is used if JokeAPI fails.
- History and Joke-of-the-Day persistence use localStorage keys:
  - HISTORY_KEY = smartjokestation_history_v1
  - JOTD_KEY = smartjokestation_jotd_v1

Customization ideas (optional)
------------------------------
- Add animations for the card transitions using GSAP or simple CSS.
- Add a toggle to exclude certain joke flags (e.g., dark).
- Save favorites separately and export/import history.
- Add icons per category and small sound effects (careful with accessibility).

How to run
----------
1. Put all files in the same folder.
2. Open index.html in any modern browser (Chrome, Firefox, Edge).
3. No backend required.

Notes
-----
- The app retrieves jokes from third-party APIs; reliability depends on availability of those services.
- If you plan to deploy publicly, check CORS and rate limits for the used APIs.
