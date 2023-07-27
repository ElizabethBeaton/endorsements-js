import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  set,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://we-are-the-champions-project-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const mainInputFieldEl = document.getElementById("main-input-field");
const publishBtnEl = document.getElementById("publish-btn");
const endorsementsEl = document.getElementById("endorsements");
const toInputEl = document.getElementById("to-input-field");
const fromInputEl = document.getElementById("from-input-field");

publishBtnEl.addEventListener("click", () => {
  let addToInput = toInputEl.value;
  let addFromInput = fromInputEl.value;
  let addValue = mainInputFieldEl.value;
  if (addValue === "" || addFromInput === "" || addFromInput === "") {
    clearInputField();
  } else {
    push(endorsementsInDB, {
      comment: addValue,
      toInput: addToInput,
      fromInput: addFromInput,
    });
    clearInputField();
    clearFromToInputs();
  }
});

onValue(endorsementsInDB, (snapshot) => {
  if (snapshot.exists()) {
    let endorsementsArray = Object.entries(snapshot.val());
    clearEndorsementsEl();
    for (let i = 0; i < endorsementsArray.length; i++) {
      let currentEnforsement = endorsementsArray[i];
      appendEndorsement(currentEnforsement);
    }
  } else {
    endorsementsEl.innerHTML = "";
  }
});
function clearInputField() {
  mainInputFieldEl.value = "";
  toInputEl.value = "";
  fromInputEl.value = "";
}
function clearEndorsementsEl() {
  endorsementsEl.innerHTML = "";
}
function clearFromToInputs() {
  toInputEl.value = "";
  fromInputEl.value = "";
}

function appendEndorsement(endorsementEntry) {
  let endorsementID = endorsementEntry[0];
  let endorsementValue = endorsementEntry[1].comment;
  let endorsementFrom = endorsementEntry[1].fromInput;
  let endorsementTo = endorsementEntry[1].toInput;
  let newComment = document.createElement("p");

  newComment.innerHTML = `
  <span class="bold-text"> To: ${endorsementTo}</span>
  <p class="endorsement-text"> ${endorsementValue}</p>
  <div id="post-footerr>
  <span class="bold-text"> From: ${endorsementFrom}</span>
  <span class="likes-counter"><span class="likes-count">0</span>♥️</span
  </div>
  `;

  newComment.addEventListener("dblclick", () => {
    let exactLocationOfItemInDB = ref(
      database,
      `endorsements/${endorsementID}`
    );
    remove(exactLocationOfItemInDB);
  });

  endorsementsEl.append(newComment);
  const likesCountEl = document.querySelector(".likes-count");
  let likesCount = 0;
  likesCountEl.addEventListener("click", function () {
    likesCount += 1;
  });
  likesCountEl.textContent = likesCount;
}
