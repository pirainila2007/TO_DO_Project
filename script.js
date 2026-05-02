const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = [];

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, status: "Pending" };
  tasks.push(task);
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
    taskList.innerHTML = `<li class="empty-state">No tasks yet</li>`;
  } else {
    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="${task.status === "Complete" ? "completed" : ""}">
          ${task.text}
        </span>
        <button onclick="toggleStatus(${index})">
          ${task.status === "Pending" ? "✔" : "↩"}
        </button>
        <button onclick="deleteTask(${index})">🗑</button>
      `;
      taskList.appendChild(li);
    });
  }

  taskCount.textContent = `${filteredTasks.length} Tasks`;
}

function toggleStatus(index) {
  tasks[index].status = tasks[index].status === "Pending" ? "Complete" : "Pending";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function filterTask(status) {
  renderTasks(status);
}


