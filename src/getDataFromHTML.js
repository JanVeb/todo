import { setItem } from "./systemStorage.js";
// getDataFromHtml();
function getDataFromHtml() {
  const horizontalElement = document.getElementById("horizontal");
  const groupContainers = Array.from(
    horizontalElement.getElementsByClassName("group-container")
  );

  const extractedData = groupContainers.map((groupContainer) => {
    const sortableItem = groupContainer.querySelector(".sortable-item");
    const sortableItemText = Array.from(sortableItem.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent.trim())
      .join(" ");

    const taskItems = Array.from(
      sortableItem.getElementsByClassName("task-item")
    );

    const taskItemsData = taskItems.map((taskItem) => {
      const taskId = taskItem.id;
      const taskText = taskItem.textContent
        .replace("Title: ", "")
        .split(" - Date: ");
      const title = taskText[0];
      const date = taskText[1];

      // Check if the title is a valid number
      const isNumeric = !isNaN(parseFloat(title)) && isFinite(title);

      return {
        title: isNumeric ? String(title) : title,
        date,
        id: taskId,
      };
    });

    return { sortableItemText, taskItems: taskItemsData };
  });

  console.log(extractedData);

  setItem("test1", extractedData).then(function () {});
}
export { getDataFromHtml };
