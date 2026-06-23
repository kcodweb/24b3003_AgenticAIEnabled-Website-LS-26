const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");

function showMessage(text, type) {
  message.textContent = text;
  message.className = type;

  setTimeout(function () {
    message.textContent = "";
    message.className = "";
  }, 2500);
}

function addTask() {
  const taskValue = taskInput.value.trim();

  if (taskValue === "") {
    showMessage("Please enter a task before adding.", "error");
    return;
  }

  const listItem = document.createElement("li");
  listItem.className = "task-item";

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = taskValue;

  taskText.addEventListener("click", function () {
    taskText.classList.toggle("completed");
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "task-buttons";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit-btn";

  editButton.addEventListener("click", function () {
    const updatedTask = prompt("Update your task:", taskText.textContent);

    if (updatedTask === null) {
      return;
    }

    if (updatedTask.trim() === "") {
      showMessage("Task cannot be empty.", "error");
      return;
    }

    taskText.textContent = updatedTask.trim();
    showMessage("Task updated successfully.", "success");
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-btn";

  deleteButton.addEventListener("click", function () {
    listItem.remove();
    showMessage("Task deleted successfully.", "success");
  });

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  listItem.appendChild(taskText);
  listItem.appendChild(buttonContainer);

  taskList.appendChild(listItem);

  taskInput.value = "";
  showMessage("Task added successfully.", "success");
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
