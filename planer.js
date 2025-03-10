// Routine tasks
function addRoutineTask() {
  const input = document.getElementById("routine-input");
  const task = input.value.trim();
  if (task) {
    const li = document.createElement("li");
    li.textContent = task;
    document.getElementById("routine-list").appendChild(li);
    input.value = "";
  }
}

function eraseRoutineTasks() {
  document.getElementById("routine-list").innerHTML = "";
}

// To-Do list
function addTodoItem() {
  const input = document.getElementById("todo-input");
  const item = input.value.trim();
  if (item) {
    const li = document.createElement("li");
    li.textContent = item;
    document.getElementById("todo-list-items").appendChild(li);
    input.value = "";
  }
}

function eraseTodoItems() {
  document.getElementById("todo-list-items").innerHTML = "";
}

// Water reminder
let waterReminderInterval;
function startWaterReminder() {
  const interval = document.getElementById("water-interval-input").value;
  const milliseconds = interval * 60 * 60 * 1000; // Convert to milliseconds

  if (waterReminderInterval) {
    clearInterval(waterReminderInterval);
  }

  waterReminderInterval = setInterval(() => {
    alert("Time to drink water!");
  }, milliseconds);
}

function resetWaterReminder() {
  if (waterReminderInterval) {
    clearInterval(waterReminderInterval);
  }
}

// Notes
function eraseNotes() {
  document.getElementById("notes-textarea").value = "";
}

// Goal Tracker
function addGoal() {
  const input = document.getElementById("goal-input");
  const goal = input.value.trim();
  if (goal) {
    const div = document.createElement("div");
    div.classList.add("goal-item");
    div.textContent = goal;
    document.getElementById("goal-list").appendChild(div);
    input.value = "";
  }
}

function eraseGoals() {
  document.getElementById("goal-list").innerHTML = "";
}

// Upcoming Events
function addEvent() {
  const input = document.getElementById("event-input");
  const event = input.value.trim();
  if (event) {
    const li = document.createElement("li");
    li.textContent = event;
    document.getElementById("events-list").appendChild(li);
    input.value = "";
  }
}

function eraseEvents() {
  document.getElementById("events-list").innerHTML = "";
}

// Personal Development
function addDevelopmentActivity() {
  const input = document.getElementById("development-input");
  const activity = input.value.trim();
  if (activity) {
    const li = document.createElement("li");
    li.textContent = activity;
    document.getElementById("development-list").appendChild(li);
    input.value = "";
  }
}

function eraseDevelopmentActivities() {
  document.getElementById("development-list").innerHTML = "";
}

// Data Management
function saveData() {
  const data = {
    routineTasks: Array.from(document.querySelectorAll("#routine-list li")).map(
      (li) => li.textContent
    ),
    todoItems: Array.from(document.querySelectorAll("#todo-list-items li")).map(
      (li) => li.textContent
    ),
    notes: document.getElementById("notes-textarea").value,
    ideas: document.getElementById("ideas-textarea").value,
    waterReminderInterval: document.getElementById("water-interval-input")
      .value,
    goals: Array.from(document.querySelectorAll("#goal-list .goal-item")).map(
      (div) => div.textContent
    ),
    events: Array.from(document.querySelectorAll("#events-list li")).map(
      (li) => li.textContent
    ),
    developmentActivities: Array.from(
      document.querySelectorAll("#development-list li")
    ).map((li) => li.textContent),
  };

  localStorage.setItem("dashboardData", JSON.stringify(data));
  alert("Data saved successfully!");
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("dashboardData"));

  if (!data) {
    alert("No data found!");
    return;
  }

  // Load routine tasks
  const routineList = document.getElementById("routine-list");
  routineList.innerHTML = "";
  data.routineTasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task;
    routineList.appendChild(li);
  });

  // Load to-do items
  const todoListItems = document.getElementById("todo-list-items");
  todoListItems.innerHTML = "";
  data.todoItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    todoListItems.appendChild(li);
  });

  // Load notes and ideas
  document.getElementById("notes-textarea").value = data.notes || "";
  document.getElementById("ideas-textarea").value = data.ideas || "";

  // Load water reminder interval
  document.getElementById("water-interval-input").value =
    data.waterReminderInterval || "1";

  // Load goals
  const goalList = document.getElementById("goal-list");
  goalList.innerHTML = "";
  data.goals.forEach((goal) => {
    const div = document.createElement("div");
    div.classList.add("goal-item");
    div.textContent = goal;
    goalList.appendChild(div);
  });

  // Load upcoming events
  const eventsList = document.getElementById("events-list");
  eventsList.innerHTML = "";
  data.events.forEach((event) => {
    const li = document.createElement("li");
    li.textContent = event;
    eventsList.appendChild(li);
  });

  // Load personal development activities
  const developmentList = document.getElementById("development-list");
  developmentList.innerHTML = "";
  data.developmentActivities.forEach((activity) => {
    const li = document.createElement("li");
    li.textContent = activity;
    developmentList.appendChild(li);
  });

  alert("Data loaded successfully!");
}

function viewSavedData() {
  const data = JSON.parse(localStorage.getItem("dashboardData"));

  if (!data) {
    alert("No data found to display!");
    return;
  }

  let content = "<h3>Routine Tasks</h3><ul>";
  data.routineTasks.forEach((task) => (content += `<li>${task}</li>`));
  content += "</ul><h3>To-Do Items</h3><ul>";
  data.todoItems.forEach((item) => (content += `<li>${item}</li>`));
  content +=
    "</ul><h3>Notes</h3><p>" + (data.notes || "No notes saved") + "</p>";
  content += "<h3>Ideas</h3><p>" + (data.ideas || "No ideas saved") + "</p>";
  content +=
    "<h3>Water Reminder Interval</h3><p>" +
    (data.waterReminderInterval || "Not set") +
    " hour(s)</p>";
  content += "<h3>Goals</h3><div>";
  data.goals.forEach((goal) => (content += `<div>${goal}</div>`));
  content += "</div><h3>Upcoming Events</h3><ul>";
  data.events.forEach((event) => (content += `<li>${event}</li>`));
  content += "</ul><h3>Personal Development</h3><ul>";
  data.developmentActivities.forEach(
    (activity) => (content += `<li>${activity}</li>`)
  );
  content += "</ul>";

  document.getElementById("modal-body").innerHTML = content;
  document.getElementById("data-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("data-modal").style.display = "none";
}
