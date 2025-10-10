// script.js
// Smart Joke Dashboard - uses JokeAPI v2 (https://v2.jokeapi.dev)
// Features: fetch by category, history (localStorage), joke of the day, date/time, animated reaction, dynamic styling

const API_BASE = "https://v2.jokeapi.dev/joke";

// DOM refs
const categorySelect = document.getElementById("category");
const getJokeBtn = document.getElementById("getJokeBtn");
const randomJokeBtn = document.getElementById("randomJokeBtn");

const currentCard = document.getElementById("currentCard");
const currentContent = document.getElementById("currentContent");
const currentMeta = document.getElementById("currentMeta");
const currentReaction = document.getElementById("currentReaction");

const jotdCard = document.getElementById("jotdCard");
const jotdContent = document.getElementById("jokeContent");
const jotdMeta = document.getElementById("jokeMeta");
const reaction = document.getElementById("reaction");

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");
const saveBtn = document.getElementById("saveBtn");

const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");

let history = []; // array of {id, category, type, content, fullText, timestamp}
const HISTORY_KEY = "smartjokestation_history_v1";
const JOTD_KEY = "smartjokestation_jotd_v1";

// util: format time & date
function startDateTime() {
  function update() {
    const now = new Date();
    const dateStr = now.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const timeStr = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    dateEl.textContent = dateStr;
    timeEl.textContent = timeStr;
  }
  update();
  setInterval(update, 1000);
}

// util: store/load history
function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    history = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Could not load history", e);
    history = [];
  }
}
function saveHistory() {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn("Failed saving history", e);
  }
}

// render history list
function renderHistory() {
  historyList.innerHTML = "";
  if (history.length === 0) {
    historyList.innerHTML =
      '<li style="opacity:.6">No jokes yet — get one!</li>';
    return;
  }
  // show recent first
  [...history].reverse().forEach((item) => {
    const li = document.createElement("li");
    li.textContent =
      item.fullText.length > 90
        ? item.fullText.slice(0, 90) + "…"
        : item.fullText;
    li.title = new Date(item.timestamp).toLocaleString();
    li.addEventListener("click", () =>
      displayJoke(
        item,
        currentCard,
        currentContent,
        currentMeta,
        currentReaction
      )
    );
    historyList.appendChild(li);
  });
}

// helper: create an internal joke object from API response
function normalizeJoke(apiResponse, categoryOverride) {
  // apiResponse from JokeAPI v2
  const cat = categoryOverride || apiResponse.category || "Any";
  if (apiResponse.type === "single") {
    const text = apiResponse.joke;
    return {
      id: apiResponse.id || "j_" + Date.now(),
      category: cat,
      type: "single",
      content: { joke: text },
      fullText: text,
      flags: apiResponse.flags || {},
      timestamp: Date.now(),
    };
  } else if (apiResponse.type === "twopart") {
    const text = apiResponse.setup + "\n\n" + apiResponse.delivery;
    return {
      id: apiResponse.id || "j_" + Date.now(),
      category: cat,
      type: "twopart",
      content: { setup: apiResponse.setup, delivery: apiResponse.delivery },
      fullText: text,
      flags: apiResponse.flags || {},
      timestamp: Date.now(),
    };
  } else {
    // fallback if we get something else
    const text = JSON.stringify(apiResponse);
    return {
      id: "j_" + Date.now(),
      category: cat,
      type: "unknown",
      content: { raw: text },
      fullText: text,
      timestamp: Date.now(),
    };
  }
}

// display a joke into a card
function displayJoke(obj, cardEl, contentEl, metaEl, reactionEl) {
  // set text
  contentEl.textContent = obj.fullText;
  metaEl.textContent = `${obj.category} • ${new Date(
    obj.timestamp
  ).toLocaleString()}`;

  // set reaction emoji and animation based on category / text
  const emoji = pickReactionEmoji(obj);
  reactionEl.textContent = emoji;
  animateReaction(reactionEl);

  // category class for neon styling
  const categoryClass = "cat-" + (obj.category || "Any");
  // remove previous cat- classes
  cardEl.className = cardEl.className
    .split(" ")
    .filter((c) => !c.startsWith("cat-"))
    .join(" ");
  cardEl.classList.add(categoryClass);
}

// choose emoji reaction
function pickReactionEmoji(obj) {
  const cat = (obj.category || "Any").toLowerCase();
  if (cat.includes("program")) return "🤖";
  if (cat.includes("pun")) return "😜";
  if (cat.includes("dark")) return "🕯️";
  if (cat.includes("spooky")) return "👻";
  if (cat.includes("christmas")) return "🎄";
  if (cat.includes("misc")) return "😆";
  // fallback: inspect text for question mark (setup) to choose thinking emoji
  if (obj.fullText.includes("?")) return "🤔";
  return "😂";
}

// animate emoji briefly
function animateReaction(el) {
  el.classList.remove("animate");
  // force reflow
  void el.offsetWidth;
  el.classList.add("animate");
}

// fetch joke from JokeAPI v2
async function fetchJoke(category = "Any") {
  // build endpoint
  // allow both single and twopart types for variety (no explicit type param)
  const safeCat = category === "Any" ? "Any" : category;
  const url = `${API_BASE}/${encodeURIComponent(
    safeCat
  )}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=1`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response not OK");
    const data = await res.json();
    // API can return an object (one joke) or array when amount>1; here amount=1 => object.
    return normalizeJoke(data, category);
  } catch (err) {
    console.error("fetchJoke error", err);
    // fallback to Official Joke API (random)
    try {
      const fallback = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      const fd = await fallback.json();
      const text =
        fd.setup && fd.punchline
          ? fd.setup + "\n\n" + fd.punchline
          : fd.joke || JSON.stringify(fd);
      return {
        id: fd.id || "fallback_" + Date.now(),
        category: category,
        type: fd.setup ? "twopart" : "single",
        content: fd,
        fullText: text,
        timestamp: Date.now(),
      };
    } catch (e) {
      console.error("fallback failed", e);
      return {
        id: "err_" + Date.now(),
        category: category,
        type: "error",
        content: {},
        fullText:
          "Could not fetch a joke — please check your internet connection.",
        timestamp: Date.now(),
      };
    }
  }
}

// event: get and show a new joke in current card and push to history
async function showNewJoke(category) {
  getJokeBtn.disabled = true;
  getJokeBtn.textContent = "Fetching...";
  try {
    const j = await fetchJoke(category);
    // display in current area
    displayJoke(j, currentCard, currentContent, currentMeta, currentReaction);
    // add to history (prevent duplicates in a row)
    if (
      history.length === 0 ||
      history[history.length - 1].fullText !== j.fullText
    ) {
      history.push(j);
      if (history.length > 200) history.shift(); // cap history size
      saveHistory();
      renderHistory();
    }
  } finally {
    getJokeBtn.disabled = false;
    getJokeBtn.textContent = "Get Another Joke";
  }
}

// load/show Joke of the Day (stored or fetch new once per day)
async function loadJokeOfTheDay() {
  try {
    const stored = localStorage.getItem(JOTD_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const storedDate = new Date(parsed._createdAt);
      const now = new Date();
      // if same date, reuse
      if (storedDate.toDateString() === now.toDateString()) {
        displayJoke(parsed.joke, jotdCard, jotdContent, jotdMeta, reaction);
        return;
      }
    }
  } catch (e) {
    /* ignore and fetch new */
  }

  // fetch a random joke for JOTD
  const jotd = await fetchJoke("Any");
  displayJoke(jotd, jotdCard, jotdContent, jotdMeta, reaction);

  // store with createdAt
  try {
    localStorage.setItem(
      JOTD_KEY,
      JSON.stringify({ _createdAt: new Date().toISOString(), joke: jotd })
    );
  } catch (e) {
    console.warn("Could not store JOTD");
  }
}

// clear history
function clearHistory() {
  if (!confirm("Clear all saved history?")) return;
  history = [];
  saveHistory();
  renderHistory();
}

// copy current joke to clipboard
async function copyCurrent() {
  const text = currentContent.textContent || "";
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } else {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      alert("Copied to clipboard!");
    }
  } catch (e) {
    alert("Copy failed");
  }
}

// share via navigator.share if available
async function shareCurrent() {
  const text = currentContent.textContent || "";
  if (navigator.share) {
    try {
      await navigator.share({ title: "Joke", text });
    } catch (e) {}
  } else {
    alert("Share not supported in this browser. Try copying instead.");
  }
}

// save currently displayed joke manually to history
function saveCurrentManually() {
  const text = currentContent.textContent;
  if (!text || text.trim().length === 0)
    return alert("No current joke to save.");
  const obj = {
    id: "userSaved_" + Date.now(),
    category: categorySelect.value || "Any",
    type: "manual",
    content: { saved: text },
    fullText: text,
    timestamp: Date.now(),
  };
  history.push(obj);
  saveHistory();
  renderHistory();
  alert("Saved to history.");
}

// random surprise fetch
async function fetchSurprise() {
  const cats = ["Programming", "Misc", "Pun", "Dark", "Spooky", "Christmas"];
  const pick = cats[Math.floor(Math.random() * cats.length)];
  categorySelect.value = pick;
  await showNewJoke(pick);
}

// initial setup
function init() {
  startDateTime();

  loadHistory();
  renderHistory();

  // load JOTD (either existing for the day or fetch new)
  loadJokeOfTheDay();

  // set event listeners
  getJokeBtn.addEventListener("click", () => showNewJoke(categorySelect.value));
  randomJokeBtn.addEventListener("click", fetchSurprise);
  clearHistoryBtn.addEventListener("click", clearHistory);
  copyBtn.addEventListener("click", copyCurrent);
  shareBtn.addEventListener("click", shareCurrent);
  saveBtn.addEventListener("click", saveCurrentManually);

  // show last history item in current view if present
  if (history.length > 0) {
    const last = history[history.length - 1];
    displayJoke(
      last,
      currentCard,
      currentContent,
      currentMeta,
      currentReaction
    );
  }
}

// run
init();
