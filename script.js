import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
const endorsementListEl = document.getElementById("endorsements");

endorsementsBtnEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(endorsementsInDB, inputValue);

  clearInputFieldEl();
});

onValue(endorsementsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearEndorsementListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemToEndorsementListEl(currentItem);
    }
  } else {
    endorsementListEl.innerHTML = "No Endorsements Yet";
  }
});

function clearEndorsementListEl() {
  endorsementListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToEndorsementListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDB = ref(database, `endorsementsList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  endorsementListEl.append(newEl);
}
