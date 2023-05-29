import Sortable from "sortablejs";
import { getDataFromHtml } from "./src/getDataFromHTML";
// import { getItem } from "./src/systemStorage.js";
import "./style.css";

Sortable.create(horizontal, {
  dataIdAttr: "sortable-item",
  animation: 150,
  fallbackOnBody: true,
  group: {
    name: "shared",
    pull: false,
    put: false,
  },

  onEnd: function () {
    console.log("🚀 ~ file: tasks.js:65 ~ event:", event);
    getDataFromHtml();
  },
});
// });
