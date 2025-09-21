// Task Manager
let tasks = [];
let taskIdCounter = 1;

// Add Task
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = new Date(document.getElementById("dueDate").value);

  const task = {
    id: taskIdCounter++,
    title,
    description,
    dueDate,
    status: "pending",
  };

  tasks.push(task);
  displayTasks(tasks);
  updateCountdown();
  this.reset();
});

// Mark Task Complete
function markComplete(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.status = "completed";
  }
  displayTasks(tasks);
  updateCountdown();
}

function getPendingTasks() {
  return tasks.filter((t) => t.status === "pending");
}

function getOverdueTasks() {
  const today = new Date();
  return tasks.filter((t) => t.dueDate < today && t.status === "pending");
}

function getTasksForToday() {
  const today = new Date();
  return tasks.filter((t) => {
    return (
      t.dueDate.getDate() === today.getDate() &&
      t.dueDate.getMonth() === today.getMonth() &&
      t.dueDate.getFullYear() === today.getFullYear()
    );
  });
}

function showAllTasks() {
  displayTasks(tasks);
}

function showTodayTasks() {
  displayTasks(getTasksForToday());
}

function displayTasks(taskArray) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  if (taskArray.length === 0) {
    taskList.innerHTML = "<li>No tasks available</li>";
    return;
  }

  taskArray.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task");

    // Status color
    if (task.status === "completed") li.classList.add("completed");
    else if (task.dueDate < new Date() && task.status === "pending")
      li.classList.add("overdue");
    else li.classList.add("pending");

    li.innerHTML = `
      <div>
        <strong>${task.title}</strong> - ${task.description} <br>
        Due: ${task.dueDate.toLocaleDateString()} | Status: ${task.status}
      </div>
      ${
        task.status === "pending"
          ? `<button onclick="markComplete(${task.id})">Mark Complete</button>`
          : ""
      }
    `;

    taskList.appendChild(li);
  });
}

function updateCountdown() {
  const countdown = document.getElementById("countdown");
  const pendingTasks = getPendingTasks();

  if (pendingTasks.length === 0) {
    countdown.textContent = "No upcoming tasks 🎉";
    return;
  }
  const nearestTask = pendingTasks.reduce((prev, curr) =>
    prev.dueDate < curr.dueDate ? prev : curr
  );

  function calculateTimeLeft() {
    const now = new Date();
    const diff = nearestTask.dueDate - now;

    if (diff <= 0) {
      countdown.textContent = "⚠️ Deadline passed!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    countdown.textContent = `Next Deadline in: ${days} days ${hours} hours ${minutes} minutes`;
  }

  calculateTimeLeft();
  setInterval(calculateTimeLeft, 60000); 
}
