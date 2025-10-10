const API_KEY = ""; // <-- put your OpenWeatherMap API key here

// DOM elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const voiceBtn = document.getElementById("voiceBtn");
const unitToggle = document.getElementById("unitToggle");
const themeToggle = document.getElementById("themeToggle");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

const cityNameEl = document.getElementById("cityName");
const localTimeEl = document.getElementById("localTime");
const timezoneEl = document.getElementById("timezone");
const weatherIconEl = document.getElementById("weatherIcon");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const conditionEl = document.getElementById("condition");
const alertsEl = document.getElementById("alerts");
const forecastContainer = document.getElementById("forecastContainer");

let unit = localStorage.getItem("unit") || "metric"; // "metric" or "imperial"
let lastCity = localStorage.getItem("lastCity") || null;
unitToggle.textContent = unit === "metric" ? "°C" : "°F";

let history = JSON.parse(localStorage.getItem("history") || "[]");

// ----- simple helper functions -----
function qs(selector) { return document.querySelector(selector); }

function showAlert(text) {
  alertsEl.style.display = "block";
  alertsEl.textContent = text;
}
function hideAlert() {
  alertsEl.style.display = "none";
  alertsEl.textContent = "";
}

// format temperature with unit symbol
function formatTemp(val) {
  if (val === undefined || val === null) return "—";
  const symbol = unit === "metric" ? "°C" : "°F";
  return Math.round(val) + symbol;
}

// converts unix timestamp + timezone offset into local date/time string
function getLocalDateTime(dtUnix, tzOffsetSeconds) {
  // dtUnix is seconds since epoch (UTC). tzOffsetSeconds is seconds offset from UTC for the city.
  const localMillis = (dtUnix + tzOffsetSeconds) * 1000;
  const d = new Date(localMillis);
  // simple formatting
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const day = days[d.getUTCDay()];
  const hh = String(d.getUTCHours()).padStart(2,"0");
  const mm = String(d.getUTCMinutes()).padStart(2,"0");
  const date = d.getUTCDate();
  const month = d.getUTCMonth() + 1;
  return `${day}, ${date}/${month} ${hh}:${mm}`;
}

// set dynamic background by main weather condition and day/night
function setBackground(conditionMain, isNight) {
  // clear previous classes
  document.body.className = "";
  conditionMain = (conditionMain || "").toLowerCase();
  if (conditionMain.includes("rain") || conditionMain.includes("drizzle") || conditionMain.includes("thunderstorm")) {
    document.body.classList.add("body-rain");
  } else if (conditionMain.includes("cloud")) {
    document.body.classList.add("body-clouds");
  } else if (conditionMain.includes("snow")) {
    document.body.classList.add("body-snow");
  } else if (conditionMain.includes("clear")) {
    if (isNight) document.body.classList.add("body-clear-night");
    else document.body.classList.add("body-sunny");
  } else {
    document.body.classList.add("body-clouds");
  }
}

// save history
function saveHistory(city) {
  city = city.trim();
  if (!city) return;
  // avoid duplicates, keep latest first
  history = history.filter(c => c.toLowerCase() !== city.toLowerCase());
  history.unshift(city);
  if (history.length > 8) history.pop();
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

// render search history
function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => {
      cityInput.value = city;
      fetchWeatherByCity(city);
    });
    historyList.appendChild(li);
  });
}

// clear history button
clearHistory.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("history");
  renderHistory();
});

// toggle units
unitToggle.addEventListener("click", () => {
  unit = unit === "metric" ? "imperial" : "metric";
  unitToggle.textContent = unit === "metric" ? "°C" : "°F";
  localStorage.setItem("unit", unit);
  // refetch last city to update numbers
  const city = lastCity || cityInput.value;
  if (city) fetchWeatherByCity(city);
});

// theme toggle - auto / light / dark (very simple)
themeToggle.addEventListener("click", () => {
  const current = themeToggle.textContent;
  if (current === "Auto") themeToggle.textContent = "Dark";
  else if (current === "Dark") themeToggle.textContent = "Light";
  else themeToggle.textContent = "Auto";
  applyThemeChoice();
  localStorage.setItem("themeChoice", themeToggle.textContent);
});

function applyThemeChoice() {
  const choice = themeToggle.textContent;
  document.body.style.transition = "background .5s ease";
  if (choice === "Dark") {
    document.body.style.filter = "brightness(.9)";
  } else if (choice === "Light") {
    document.body.style.filter = "brightness(1.15)";
  } else {
    document.body.style.filter = "none";
  }
}

// search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeatherByCity(city);
});

// enter key triggers search
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) fetchWeatherByCity(city);
  }
});

// voice search simple implementation (optional)
voiceBtn.addEventListener("click", () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("Voice search not supported in this browser.");
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recog = new SpeechRecognition();
  recog.lang = 'en-US';
  recog.start();
  recog.onresult = function(e) {
    const text = e.results[0][0].transcript;
    cityInput.value = text;
    fetchWeatherByCity(text);
  };
  recog.onerror = function() {
    console.log("Voice recognition error");
  };
});

// ----- fetching functions (simple async/await) -----

async function fetchWeatherByCity(city) {
  hideAlert();
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("City not found");
    }
    const data = await res.json();
    lastCity = data.name;
    localStorage.setItem("lastCity", lastCity);
    saveHistory(lastCity);
    updateCurrentWeather(data);
    // fetch forecast by coords
    await fetchForecast(data.coord.lat, data.coord.lon);
  } catch (err) {
    alert("Error: " + err.message);
  }
}

async function fetchWeatherByCoords(lat, lon) {
  hideAlert();
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to get weather by coordinates");
    const data = await res.json();
    lastCity = data.name;
    localStorage.setItem("lastCity", lastCity);
    saveHistory(lastCity);
    updateCurrentWeather(data);
    await fetchForecast(lat, lon);
  } catch (err) {
    console.error(err);
  }
}

async function fetchForecast(lat, lon) {
  // Use 5-day forecast (3-hour steps) and aggregate into day summaries
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to get forecast");
    const data = await res.json();
    renderForecast(data);
    // simple alert detection: heavy rain or heat by thresholds in forecast items
    checkForAlerts(data);
  } catch (err) {
    console.error(err);
  }
}

// ----- UI update functions -----
function updateCurrentWeather(data) {
  // data is the /weather response
  const name = data.name + (data.sys && data.sys.country ? ", " + data.sys.country : "");
  cityNameEl.textContent = name;
  conditionEl.textContent = data.weather && data.weather[0] ? data.weather[0].description : "";
  humidityEl.textContent = (data.main && data.main.humidity != null) ? data.main.humidity + "%" : "—";
  windEl.textContent = (data.wind && data.wind.speed != null) ? `${data.wind.speed} ${unit === "metric" ? "m/s" : "mph"}` : "—";
  tempEl.textContent = (data.main && data.main.temp != null) ? formatTemp(data.main.temp) : "—";

  // icon
  if (data.weather && data.weather[0]) {
    const iconCode = data.weather[0].icon; // e.g., 01d
    weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIconEl.alt = data.weather[0].description;
  } else {
    weatherIconEl.src = "";
    weatherIconEl.alt = "";
  }

  // local time & timezone display (data.dt and data.timezone)
  const dt = data.dt; // seconds
  const tz = data.timezone || 0; // seconds offset
  localTimeEl.textContent = getLocalDateTime(dt, tz);
  timezoneEl.textContent = `Time zone offset: ${tz/3600 >= 0 ? "+" : ""}${tz/3600} hours`;

  // dynamic background
  const mainCond = data.weather && data.weather[0] ? data.weather[0].main : "";
  const isNight = data.weather && data.weather[0] && data.weather[0].icon && data.weather[0].icon.endsWith("n");
  setBackground(mainCond, isNight);

  // remember last city
  localStorage.setItem("lastCity", data.name);
  lastCity = data.name;
}

// forecast rendering (group by date)
function renderForecast(forecastData) {
  // forecastData.list is array of 3-hour steps
  // We will group by date (local date at city timezone)
  const tz = forecastData.city.timezone || 0;
  const groups = {}; // key = YYYY-MM-DD
  forecastData.list.forEach(item => {
    // compute local date string
    const localMs = (item.dt + tz) * 1000;
    const d = new Date(localMs);
    const key = d.getUTCFullYear() + "-" + String(d.getUTCMonth()+1).padStart(2,"0") + "-" + String(d.getUTCDate()).padStart(2,"0");
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });

  // take up to 5 days from groups
  const keys = Object.keys(groups).slice(0, 5);
  forecastContainer.innerHTML = "";
  keys.forEach(key => {
    const items = groups[key];
    // compute average temp, min, max, main condition by frequency
    let sum = 0, count = 0, min = Infinity, max = -Infinity;
    const condCount = {};
    let icon = items[0].weather[0].icon || "";
    items.forEach(it => {
      const t = it.main.temp;
      sum += t; count++;
      if (t < min) min = t;
      if (t > max) max = t;
      const m = it.weather && it.weather[0] ? it.weather[0].main : "";
      if (m) condCount[m] = (condCount[m] || 0) + 1;
      // choose icon near midday if possible
      const hour = new Date((it.dt + tz) * 1000).getUTCHours();
      if (hour >= 11 && hour <= 15) icon = it.weather[0].icon;
    });
    const avg = sum / Math.max(1, count);
    // pick most frequent condition
    let mostCond = "";
    let best = 0;
    for (let k in condCount) {
      if (condCount[k] > best) { best = condCount[k]; mostCond = k; }
    }

    // readable day label
    const parts = key.split("-");
    const dd = new Date(Date.UTC(parts[0], parts[1]-1, parts[2]));
    const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const day = dayNames[dd.getUTCDay()];

    const card = document.createElement("div");
    card.className = "fcard";
    card.innerHTML = `
      <div class="day">${day}</div>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${mostCond}" />
      <div class="small muted">${mostCond}</div>
      <div class="temp">${formatTemp(avg)}</div>
      <div class="muted small">L:${Math.round(min)} / H:${Math.round(max)}</div>
    `;
    forecastContainer.appendChild(card);
  });
}

// simple alert detection using forecast data
function checkForAlerts(forecastData) {
  // simple rules:
  // - If any forecast item has rain volume >= 10 mm -> heavy rain alert
  // - If any temp >= 38°C (or 100°F) -> heat alert
  const isMetric = unit === "metric";
  const rainThreshold = 10; // mm in 3h
  const heatThreshold = isMetric ? 38 : 100;

  let heavyRain = false;
  let heatWave = false;

  forecastData.list.forEach(it => {
    if (it.rain && (it.rain["3h"] || 0) >= rainThreshold) heavyRain = true;
    if (it.main && it.main.temp >= heatThreshold) heatWave = true;
  });

  if (heavyRain) showAlert("⚠️ Heavy rain expected in the coming days. Take precautions.");
  else if (heatWave) showAlert("⚠️ High temperatures expected (heat alert) — stay hydrated.");
  else hideAlert();
}

// ----- geolocation for user's current location -----
function tryGeolocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    // fetch by coords
    fetchWeatherByCoords(lat, lon);
  }, err => {
    // if user denies, fallback to last city or nothing
    const city = lastCity || localStorage.getItem("lastCity");
    if (city) fetchWeatherByCity(city);
  });
}

// ----- startup -----
function init() {
  // render saved history
  renderHistory();
  // apply theme choice
  const savedTheme = localStorage.getItem("themeChoice");
  if (savedTheme) themeToggle.textContent = savedTheme;
  applyThemeChoice();

  // if last city exists, load it
  lastCity = localStorage.getItem("lastCity") || lastCity;
  if (lastCity) {
    // try loading last city's weather
    fetchWeatherByCity(lastCity);
  } else {
    // otherwise try geolocation
    tryGeolocation();
  }
}

init();
