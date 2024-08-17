document.getElementById("add-task").addEventListener("click", addTask);
document
  .getElementById("filter-category")
  .addEventListener("change", filterTasks);
document.getElementById("new-task").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

const tasks = [];

function addTask() {
  const taskText = document.getElementById("new-task").value;
  const category = document.getElementById("new-category").value;
  const taskInput = document.getElementById("new-task");
  const errorMessage = document.getElementById("task-error");
  const categoryErrorMessage = document.getElementById("category-error");

  errorMessage.style.display = "none";
  categoryErrorMessage.style.display = "none";

  if (!taskText) {
    errorMessage.style.display = "block";
    taskInput.classList.add("input-error");
    return;
  } else {
    taskInput.classList.remove("input-error");
  }

  if (!category) {
    categoryErrorMessage.style.display = "block";
    document.getElementById("new-category").classList.add("input-error");
    return;
  } else {
    document.getElementById("new-category").classList.remove("input-error");
  }

  const task = createTask(taskText, category);
  tasks.push(task);

  const li = document.createElement("li");
  li.dataset.category = category;

  li.addEventListener("click", () => openEditModal(task, li));

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  checkbox.addEventListener("change", (event) => {
    event.stopPropagation();
    toggleTask(event);
  });
  li.appendChild(checkbox);

  const span = document.createElement("span");
  span.textContent = taskText;
  span.addEventListener("click", (event) => {
    event.stopPropagation();
    openEditModal(task, span);
  });
  li.appendChild(span);

  const button = document.createElement("button");
  button.textContent = "Delete";
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTask(event);
  });
  li.appendChild(button);

  document.getElementById("task-list").appendChild(li);
  document.getElementById("new-task").value = "";
  document.getElementById("new-category").value = "";

  updateCategoryFilter();
}

function createTask(text, category) {
  return { text, category, description: "" };
}

function deleteTask(event) {
  const taskElement = event.target.parentElement;
  const taskIndex = Array.from(taskElement.parentElement.children).indexOf(
    taskElement
  );
  tasks.splice(taskIndex, 1);
  taskElement.remove();
}

function toggleTask(event) {
  const task = event.target.parentElement;
  task.classList.toggle("done");

  if (task.classList.contains("done")) {
    task.parentElement.appendChild(task);
  } else {
    task.parentElement.insertBefore(task, task.parentElement.firstChild);
  }
}

function filterTasks() {
  const filter = document.getElementById("filter-category").value;
  const tasks = document.getElementById("task-list").children;
  for (const task of tasks) {
    if (filter === "all" || task.dataset.category === filter) {
      task.style.display = "";
    } else {
      task.style.display = "none";
    }
  }
}

function updateCategoryFilter() {
  const filter = document.getElementById("filter-category");
  const categories = tasks.map((task) => task.category);
  const uniqueCategories = [...new Set(categories)];
  filter.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All";
  filter.appendChild(allOption);
  for (const category of uniqueCategories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filter.appendChild(option);
  }
}

function openEditModal(task, span) {
  const modal = document.getElementById("task-modal");
  const closeModal = document.getElementsByClassName("close")[0];
  const saveButton = document.getElementById("save-task");
  const deleteButton = document.getElementById("delete-task");

  document.getElementById("edit-task-text").value = task.text;
  document.getElementById("edit-task-category").value = task.category;
  document.getElementById("edit-task-description").value = task.description;

  modal.style.display = "block";
  modal.classList.add("show");

  closeModal.onclick = function () {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  };

  saveButton.onclick = function () {
    task.text = document.getElementById("edit-task-text").value;
    task.category = document.getElementById("edit-task-category").value;
    task.description = document.getElementById("edit-task-description").value;
    span.textContent = task.text;
    span.title = task.description;
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  };

  deleteButton.onclick = function () {
    const taskIndex = tasks.indexOf(task);
    tasks.splice(taskIndex, 1);
    span.parentElement.remove();
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  };
}
