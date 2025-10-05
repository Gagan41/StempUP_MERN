let openedWindows = [];
let clockInterval = null;
let historyStorage = [];

function addHistory(action) {
  const list = document.getElementById("historyList");
  if (!list) return; 
  const item = document.createElement("div");
  item.className = "historyItem new";
  const time = new Date().toLocaleTimeString();
  item.textContent = `${time} — ${action}`;
  list.prepend(item);
  historyStorage.unshift({ time: Date.now(), text: action });
  console.log("History:", action);
  setTimeout(() => item.classList.remove("new"), 1200);
}

window.addEventListener("load", () => {
  alert("Welcome to the Browser Dashboard! Explore the Browser Object Model.");
  addHistory("Welcome alert shown");
  populateInfoPanels();
  startClock();

  setTimeout(() => {
    const msg = document.getElementById("delayedMsg");
    if (msg)
      msg.textContent = "Here is a delayed hello! (3 seconds after load)";
    addHistory("Delayed message shown");
  }, 3000);
});

document.getElementById("confirmBtn").addEventListener("click", () => {
  flashButton(this);
  const answer = confirm("Do you enjoy exploring the Browser Object Model?");
  document.getElementById("confirmResult").textContent = answer
    ? "Yes 😄"
    : "No 😕";
  addHistory(`Confirm answered: ${answer}`);
});

document.getElementById("promptBtn").addEventListener("click", () => {
  flashButton(this);
  const name = prompt("What is your name or favourite product?");
  document.getElementById("promptResult").textContent =
    name || "(user cancelled)";
  addHistory(`Prompt answered: ${name || "cancelled"}`);
});

document.getElementById("welcomeReplay").addEventListener("click", () => {
  flashButton(this);
  alert("Welcome back — have fun with the BOM dashboard!");
  addHistory("Welcome alert replayed");
});

function populateInfoPanels() {
  document.getElementById(
    "innerSize"
  ).textContent = `${innerWidth}px × ${innerHeight}px`;
  document.getElementById(
    "outerSize"
  ).textContent = `${outerWidth}px × ${outerHeight}px`;
  document.getElementById(
    "screenSize"
  ).textContent = `${screen.width}px × ${screen.height}px`;
  document.getElementById(
    "screenAvail"
  ).textContent = `${screen.availWidth}px × ${screen.availHeight}px`;
  document.getElementById("href").textContent = location.href;
  document.getElementById("protocol").textContent = location.protocol;
  document.getElementById("hostname").textContent = location.hostname;
  document.getElementById("pathname").textContent = location.pathname;
  document.getElementById("ua").textContent = navigator.userAgent;
  document.getElementById("platform").textContent = navigator.platform;
  document.getElementById("language").textContent = navigator.language;
}

window.addEventListener("resize", () => {
  populateInfoPanels();
  addHistory("Window resized");
});

document.getElementById("openWindow").addEventListener("click", () => {
  flashButton(this);
  const w = window.open("", "_blank", "width=420,height=320");
  if (w) {
    w.document.write(
      "<h2 style='font-family:system-ui;padding:18px'>New Window opened by Browser Dashboard</h2>"
    );
    openedWindows.push(w);
    addHistory("New window opened");
  } else {
    alert("Popup blocked!");
    addHistory("Popup blocked — could not open new window");
  }
});

document.getElementById("closeWindow").addEventListener("click", () => {
  flashButton(this);
  const w = openedWindows.pop();
  if (w && !w.closed) {
    w.close();
    addHistory("Opened window closed");
  } else {
    alert("No window to close.");
  }
});

document.getElementById("reloadPage").addEventListener("click", () => {
  flashButton(this);
  addHistory("Page reload triggered");
  setTimeout(() => location.reload(), 250);
});

document.getElementById("backBtn").addEventListener("click", () => {
  flashButton(this);
  history.back();
  addHistory("History back()");
});

document.getElementById("forwardBtn").addEventListener("click", () => {
  flashButton(this);
  history.forward();
  addHistory("History forward()");
});

document.getElementById("printBtn").addEventListener("click", () => {
  flashButton(this);
  addHistory("Print called");
  window.print();
});

function updateClock() {
  document.getElementById("currentTime").textContent =
    new Date().toLocaleTimeString();
}

function startClock() {
  if (clockInterval) return;
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
  addHistory("Clock started");
}

function stopClock() {
  if (!clockInterval) return;
  clearInterval(clockInterval);
  clockInterval = null;
  addHistory("Clock stopped");
}

document.getElementById("startClock").addEventListener("click", () => {
  flashButton(this);
  startClock();
});

document.getElementById("stopClock").addEventListener("click", () => {
  flashButton(this);
  stopClock();
});

document.getElementById("startTimerMsg").addEventListener("click", () => {
  flashButton(this);
  const msgBox = document.getElementById("delayedMsg");
  msgBox.textContent = "waiting...";
  setTimeout(() => {
    msgBox.textContent = "This message appeared after 3 seconds!";
    addHistory("Manual delayed message fired");
  }, 3000);
});

document.getElementById("clearHistory").addEventListener("click", () => {
  flashButton(this);
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  historyStorage = [];
  addHistory("History cleared");
});

function flashButton(btn) {
  btn.classList.add("clicked");
  setTimeout(() => btn.classList.remove("clicked"), 250);
}

console.log("✅ Browser Dashboard loaded successfully.");
