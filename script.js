import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://we-are-the-champions-project-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsementsList");

const inputFieldEl = document.getElementById("input-field");
const endorsementsBtnEl = document.getElementById("publish-btn");

endorsementsBtnEl.addEventListener("click", function () {
  let inputValue = inputFieldEl;
  console.log(inputFieldEl.value);
});
