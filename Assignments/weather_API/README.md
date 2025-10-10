Smart Weather Forecast Dashboard - README

Files included:
- index.html   -> main HTML page
- style.css    -> styling (dark neon theme, responsive)
- script.js    -> JavaScript logic (fetch weather, forecast, UI, storage)
- README.txt   -> this file

Features implemented:
1. Search any city (search box + Enter + search button).
2. Current weather: temperature, humidity, wind speed, condition, icon.
3. Local date/time and timezone offset for the searched city (computed from API).
4. 5-day forecast (aggregated from OpenWeatherMap 5-day/3-hour forecast).
5. Search history (clickable list), stored in localStorage (keeps last 8 searches).
6. Geolocation on page load (if user allows) to show user's current city weather.
7. Unit toggle (Celsius ↔ Fahrenheit) with persistence in localStorage.
8. Dynamic backgrounds based on weather condition (sunny, rain, clouds, snow, clear-night).
9. Simple alerts detection: heavy rain or heatwave detection from forecast data.
10. Voice search (basic) using Web Speech API when supported by the browser.
11. Theme toggle (Auto/Dark/Light) with persistence (affects page brightness).

APIs used:
- OpenWeatherMap Current Weather API:
  https://api.openweathermap.org/data/2.5/weather
- OpenWeatherMap 5-day / 3-hour Forecast API:
  https://api.openweathermap.org/data/2.5/forecast

Important setup:
- Get a free API key from https://openweathermap.org/ and replace YOUR_API_KEY_HERE inside script.js:
  const API_KEY = "YOUR_API_KEY_HERE";

Notes / limitations:
- This is a frontend-only project using fetch(). No backend needed.
- Alerts are simple heuristics (heavy rain by precipitation >= 10mm in a 3h slot, heat by temperature threshold).
- Timezone is derived from the 'timezone' field in the current weather response. Local times in forecast are computed using that offset.
- Voice search uses the browser's SpeechRecognition; it is optional and may not work in all browsers.
- The forecast aggregation is a simple daily average/min/max from the 3-hourly data.
- Icons are directly loaded from OpenWeatherMap icon URLs.

Tips:
- Test with several city names (e.g., London, New York, Tokyo).
- For styling changes, edit style.css. The background classes are:
  body-sunny, body-rain, body-clouds, body-snow, body-clear-night

If you want more features (charts, animated backgrounds, more precise alerts using One Call API), tell me which one and I can provide a beginner-friendly extension.

Enjoy building — bring the sky to your screen!
