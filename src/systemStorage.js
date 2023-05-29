import localforage from "localforage";

// let saveData = {
//   hello: [
//     { title: "item1", date: "12.4.2023" },
//     { title: "item2", date: "12.6.2024" },
//     { title: "item3", date: "12.4.2025" },
//     { title: "item4", date: "12.4.2025" },
//   ],
//   world: [
//     { title: "item1", date: "12.4.2023" },
//     { title: "item2", date: "12.6.2024" },
//   ],
// };

// [
//   {
//     sortableItemText: "hello",
//     taskItems: [
//       {
//         title: "item1",
//         date: "12.4.2023",
//         id: "item1",
//       },
//       {
//         title: "item2",
//         date: "12.6.2024",
//         id: "item2",
//       },
//       {
//         title: "item3",
//         date: "12.4.2025",
//         id: "item3",
//       },
//       {
//         title: "item4",
//         date: "12.4.2025",
//         id: "item4",
//       },
//     ],
//   },
//   {
//     sortableItemText: "world",
//     taskItems: [
//       {
//         title: "item1",
//         date: "12.4.2023",
//         id: "item1",
//       },
//       {
//         title: "item2",
//         date: "12.6.2024",
//         id: "item2",
//       },
//     ],
//   },
// ];

export function setItem(key, value) {
  return localforage
    .setItem(key, value)
    .then(function () {})
    .catch(function (error) {
      console.error("Error setting value:", error);
    });
}

export function getItem(key) {
  return localforage
    .getItem(key)
    .then(function (value) {
      return value;
    })
    .catch(function (error) {
      console.error("Error retrieving value:", error);
      return null; // or any default value you prefer
    });
}
// setItem("test1", saveData).then(function () {});

// setTimeout(function () {
// }, 100);
localforage.config();
localforage.clear();
