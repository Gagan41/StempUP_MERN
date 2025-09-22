const registeredStudents = ["Alice", "Bob", "Charlie"];
let todaySet = new Set();
let attendanceMap = new Map();
registeredStudents.forEach((s) => attendanceMap.set(s, 0));

const form = document.getElementById("attendanceForm");
const studentInput = document.getElementById("studentName");
const errorMessage = document.getElementById("errorMessage");
const todayAttendance = document.getElementById("todayAttendance");
const reportList = document.getElementById("attendanceReport");
const endDayBtn = document.getElementById("endDayBtn");
const showReportBtn = document.getElementById("showReportBtn");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = studentInput.value.trim();
  if (!registeredStudents.includes(name)) {
    errorMessage.textContent = "Error: Student not registered.";
  } else {
    todaySet.add(name);
    errorMessage.textContent = "";
    renderTodayAttendance();
  }
  studentInput.value = "";
});

function renderTodayAttendance() {
  todayAttendance.innerHTML = "";
  todaySet.forEach((student) => {
    const li = document.createElement("li");
    li.textContent = student;
    todayAttendance.appendChild(li);
  });
}

// End day → update totals
endDayBtn.addEventListener("click", function () {
  todaySet.forEach((student) => {
    attendanceMap.set(student, attendanceMap.get(student) + 1);
  });
  todaySet.clear();
  todayAttendance.innerHTML = "";
  alert("Day ended. Records updated!");
});

// Show full attendance report
showReportBtn.addEventListener("click", function () {
  reportList.innerHTML = "";
  registeredStudents.forEach((student) => {
    const li = document.createElement("li");
    li.textContent = `${student} has attended ${attendanceMap.get(
      student
    )} classes.`;
    reportList.appendChild(li);
  });
});
