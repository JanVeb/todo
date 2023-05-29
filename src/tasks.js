import { getDataFromHtml } from "./getDataFromHtml";
// Function to create a new task element in a group
function createTaskElement(group, task, className) {
  var taskElement = document.createElement("div");

  taskElement.classList.add("task-item");
  if (className) {
    taskElement.classList.add(className);
  }
  taskElement.setAttribute("id", task.title);
  taskElement.textContent = "Title: " + task.title + " - Date: " + task.date;

  // Add onclick event handler to show popup menu
  taskElement.onclick = function () {
    showPopupMenu(taskElement, task);
  };

  group.appendChild(taskElement);
  getDataFromHtml();
}

// Function to show the popup menu for editing or deleting a task
function showPopupMenu(taskElement, task) {
  // Create the popup menu container
  var popupMenu = document.createElement("div");
  popupMenu.classList.add("edit-task-menu");

  // Create the menu items
  var editItem = document.createElement("div");
  editItem.textContent = "Edit Task";
  editItem.onclick = function () {
    var newTitle = prompt("Enter new task title:", task.title);
    if (newTitle) {
      task.title = newTitle;
      taskElement.textContent =
        "Title: " + task.title + " - Date: " + task.date;
    }
    closePopupMenu();
    console.log("🚀 ~ file: tasks.js:65 ~ event:", event);
    getDataFromHtml();
  };
  var deleteItem = document.createElement("div");
  deleteItem.textContent = "Delete Task";
  deleteItem.onclick = function () {
    taskElement.remove();
    closePopupMenu();
    console.log("🚀 ~ file: tasks.js:65 ~ event:", event);
    getDataFromHtml();
  };

  // Append the menu items to the popup menu
  popupMenu.appendChild(editItem);
  popupMenu.appendChild(deleteItem);

  // Position the popup menu relative to the task element
  var rect = taskElement.getBoundingClientRect();
  popupMenu.style.left = rect.left + "px";
  popupMenu.style.top = rect.bottom + "px";

  // Append the popup menu to the document body
  document.body.appendChild(popupMenu);

  // Close the popup menu when clicking outside of it
  document.addEventListener("click", closePopupMenu);

  // Prevent the task element click event from triggering the document click event
  taskElement.addEventListener("click", function (event) {
    event.stopPropagation();
  });
}

// Function to close the popup menu
function closePopupMenu() {
  var popupMenu = document.querySelector(".edit-task-menu");
  if (popupMenu) {
    popupMenu.remove();
    document.removeEventListener("click", closePopupMenu);
  }
}

export { createTaskElement };
