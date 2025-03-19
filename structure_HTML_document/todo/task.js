document.addEventListener("DOMContentLoaded", () => {
  let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

  const form = document.getElementById("tasks__form");
  const input = document.getElementById("task__input");
  const tasksList = document.getElementById("tasks__list");

  function displayTaskList() {
    tasksList.innerHTML = "";

    todoList.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.className = "task";
      taskElement.dataset.index = index; // Сохраняем индекс задачи

      const taskTitleElement = document.createElement("div");
      taskTitleElement.className = "task__title";
      taskTitleElement.textContent = task;

      const linkElement = document.createElement("a");
      linkElement.className = "task__remove";
      linkElement.href = "#";
      linkElement.textContent = "×";

      taskElement.appendChild(taskTitleElement);
      taskElement.appendChild(linkElement);
      tasksList.appendChild(taskElement);
    });
  }

  
  function addTask(taskText) {
    if (!taskText.trim()) return;

    todoList.push(taskText);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    displayTaskList();
  }

  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(input.value);
    input.value = "";
  });

  
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask(input.value);
      input.value = "";
    }
  });

  
  tasksList.addEventListener("click", (e) => {
    if (e.target.classList.contains("task__remove")) {
      const taskElement = e.target.closest(".task");
      const index = taskElement.dataset.index;

      todoList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      displayTaskList();
    }
  });

  displayTaskList();
});
