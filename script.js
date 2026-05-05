const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = [];


function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    
    tasks = tasks.map(task => {
      if (task.status === "Completed") {
        task.status = "Complete";
      }
      return task;
    });
    saveTasks(); 
  } else {
    tasks = [];
  }
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, status: "Pending" };
  tasks.push(task);
  saveTasks();
  taskInput.value = "";
  renderTasks();
}

function renderTasks(filter = "All") {
  taskList.innerHTML = "";
  let filteredTasks = tasks;

  if (filter !== "All") {
    filteredTasks = tasks.filter(t => t.status === filter);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<li class="empty">No tasks yet</li>`;
  } else {
    filteredTasks.forEach((task, taskIndex) => {
      
      const originalIndex = tasks.findIndex(t => t.text === task.text && t.status === task.status);
      
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="${task.status === "Complete" ? "completed" : ""}">
          ${task.text}
        </span>
        <button onclick="toggleStatus(${originalIndex})">
          ${task.status === "Pending" ? "✔" : "↩"}
        </button>
        <button onclick="deleteTask(${originalIndex})">🗑</button>
      `;
      taskList.appendChild(li);
    });
  }

  taskCount.textContent = `${filteredTasks.length} Tasks`;
}

function toggleStatus(index) {
  tasks[index].status = tasks[index].status === "Pending" ? "Complete" : "Pending";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTask(status) {
  renderTasks(status);
}


loadTasks();
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});