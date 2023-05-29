import Sortable from "sortablejs";
import { getDataFromHtml } from "./getDataFromHtml.js";
import { getItem } from "./systemStorage.js";
import { createTaskElement } from "./tasks.js";
getItem("test1").then(function (value) {});

let groups = []; // Array to store the group objects

// let saveData = [];

getItem("test1").then(function (value) {
  if (value !== null) {
    // saveData = value;
    // Reload from saved data
    for (let i = 0; i < value.length; i++) {
      const sortableItem = value[i];
      const newGroup = handleFormSubmit(
        null,
        sortableItem.sortableItemText,
        true
      );

      for (let e = 0; e < sortableItem.taskItems.length; e++) {
        const taskItem = sortableItem.taskItems[e];
        const title = taskItem.title;
        const date = taskItem.date;
        const taskObject = { title, date };

        createTaskElement(newGroup, taskObject);
      }
    }

    let addTaskButton = document.getElementsByClassName("add-new-task-btn");
    for (let i = 0; i < addTaskButton.length - 1; i++) {
      const elementSibling = addTaskButton[i].previousElementSibling;
      addTaskButton[i].onclick = function () {
        let taskTitle = prompt("Enter task title:");
        if (taskTitle) {
          let taskDate = new Date().toLocaleDateString();
          let taskObject = {
            title: taskTitle,
            date: taskDate,
          };
          createTaskElement(elementSibling, taskObject);
        }
      };
    }
  }
  // END reload from saved data
});

// // // reload from saved data
// for (let i = 0; i < Object.keys(saveData).length; i++) {
//   const newGroup = handleFormSubmit(null, Object.keys(saveData)[i], true);

//   for (let e = 0; e < saveData[Object.keys(saveData)[i]].length; e++) {
//     const item = saveData.hello[e];
//     const title = item.title;
//     const date = item.date;
//     const taskObject = { title, date };

//     createTaskElement(newGroup, taskObject);
//   }
// }

// let addTaskButton = document.getElementsByClassName("add-new-task-btn");
// // addTaskButton.textContent = "Add New Task";
// // addTaskButton.setAttribute("class", "add-new-task-btn");
// for (let i = 0; i < addTaskButton.length - 1; i++) {
//   const elementSibling = addTaskButton[i].previousElementSibling;
//   addTaskButton[i].onclick = function () {
//     let taskTitle = prompt("Enter task title:");
//     if (taskTitle) {
//       let taskDate = new Date().toLocaleDateString();
//       let taskObject = {
//         title: taskTitle,
//         date: taskDate,
//       };
//       createTaskElement(elementSibling, taskObject);
//     }
//   };
// }
// // // END reload from saved data

let addButton = document.getElementById("addNewGrpBtn");
addButton.addEventListener("click", openAddNewGrp);
let form = document.getElementById("popupForm");
form.addEventListener("submit", handleFormSubmit);

let cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", closeAddNewGrp);

// Function to open the popup
function openAddNewGrp() {
  let popup = document.getElementById("popup");
  popup.style.display = "block";
}

// Function to close the popup
function closeAddNewGrp() {
  let popup = document.getElementById("popup");
  popup.style.display = "none";
  document.getElementById("groupName").value = "";
}

// Function to handle form submission
function handleFormSubmit(event, grpName, isFromSave) {
  let newGroup;
  // event !== null ? event.preventDefault() : null;
  let groupName =
    grpName === undefined
      ? document.getElementById("groupName").value
      : grpName;

  if (groupName) {
    newGroup = createSortableGroup(groupName, isFromSave);
    groups.push(newGroup); // Add the new group object to the array

    closeAddNewGrp();

    // Create the "Add New Task" button
    let addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Add New Task";
    addTaskButton.setAttribute("class", "add-new-task-btn");
    addTaskButton.onclick = function () {
      let taskTitle = prompt("Enter task title:");
      if (taskTitle) {
        let taskDate = new Date().toLocaleDateString();
        let taskObject = {
          title: taskTitle,
          date: taskDate,
        };
        createTaskElement(newGroup, taskObject);
      }
    };

    // Create a container div for the group and the button
    let groupContainer = document.createElement("div");
    groupContainer.classList.add("group-container");
    groupContainer.appendChild(newGroup);
    groupContainer.appendChild(addTaskButton);

    // Append the container to the horizontal element
    horizontal.appendChild(groupContainer);
  }

  getDataFromHtml();
  return newGroup;
}

// Function to create a new sortable group
function createSortableGroup(groupName) {
  let newGroup = document.createElement("div");
  newGroup.classList.add("sortable-item");
  newGroup.textContent = groupName;

  horizontal.appendChild(newGroup);

  Sortable.create(newGroup, {
    animation: 150,
    group: {
      name: "shared",
      pull: true,
      put: true, // Allow adding elements to empty groups
    },

    onEnd: function (/**Event*/ evt) {
      getDataFromHtml();
    },
  });

  return newGroup;
}
localforage.clear();
