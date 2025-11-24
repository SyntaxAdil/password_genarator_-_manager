// Variable declares

// length indicator
const passLength = document.getElementById("pass-length");
const passLengthWeak = document.getElementById("pass-length-weak");
const passLengthMedium = document.getElementById("pass-length-medium");
const passLengthStrong = document.getElementById("pass-length-strong");
const passLengthVal = document.getElementById("pass-length-value");

// random password generation

const passDisplay = document.getElementById("pass-display");
const genaratePass = document.getElementById("pass-genarate-btn");
const resetPasswordBtn = document.getElementById("pass-reset-btn");

const uppercaseCheck = document.getElementById("upperCase-pass");
const lowercaseCheck = document.getElementById("lowerCase-pass");
const numericCheck = document.getElementById("numeric-pass");
const symbolCheck = document.getElementById("symbol-pass");

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const symbol = "~!@#$%^&*()_+{}|:<>?,./;[]-=";
const numeric = "0123456789";

// copy btn
const passDisplayCopyBtn = document.getElementById("pass-display-copy-btn");
const savedCopyBtn = document.getElementById("saved-pass-copy");

// error message
const errorMssg = document.getElementById("error-modal");
document.getElementById("close-error-pop").addEventListener("click", () => {
  errorMssg.style.display = "none";
});

// save modal
const modalForSave = document.getElementById("pass-save-modal-section");
const saveBtn = document.getElementById("pass-save-btn");
const agreetoSaveBtn = document.getElementById("pass-for-save-btn");
const dltModalForSave = document.getElementById("pass-modal-dlt-btn");
const savedPop = document.getElementById("saved-popup");
const passSaveModalContainer = document.querySelector(".pass-save-modal");
const passForName = document.getElementById("pass-for-name");

const agreeConditionForSave = document.getElementById("agree-to-save");
const genaratedPassDisplayOnSaveModal = document.getElementById(
  "generated-pass-for-save"
);

// displaying the value and href
const passForLinkDisplay = document.getElementById("pass-for-display");
const passForLink = document.getElementById("pass-for-name-link");

// delte modal
const dltModal = document.getElementById("delete-modal-section");
const yesBtn = document.getElementById("confirm-delete-btn");
const noBtn = document.getElementById("cancel-delete-btn");
let cardToDelte = null;

// password card
let passCardContainer = document.getElementById("pass-save-box");
let passCards = JSON.parse(localStorage.getItem("passCards")) || [];

// password total
const passTotalDisplay = document.getElementById("pass-total");

// Functionalites

function passTotalCount() {
  passTotalDisplay.textContent =
    passCards.length < 10 ? "0" + passCards.length : passCards.length;
}
passTotalCount();

// error message display
function errorMessage(text) {
  errorMssg.style.display = "flex";
  document.getElementById("error-mssg").innerHTML = text;
}

// genarate passsword
function generateRandomPassword() {
  let finalchar = "";

  if (uppercaseCheck.checked) finalchar += uppercase;
  if (lowercaseCheck.checked) finalchar += lowercase;
  if (numericCheck.checked) finalchar += numeric;
  if (symbolCheck.checked) finalchar += symbol;

  if (
    !symbolCheck.checked &&
    !uppercaseCheck.checked &&
    !lowercaseCheck.checked &&
    !numericCheck.checked
  ) {
    errorMessage("Select at least one option.");
  }

  if (finalchar.length === 0) return;

  let pass = "";
  let length = parseInt(passLength.value);

  for (let i = 0; i < length; i++) {
    let rand = Math.floor(Math.random() * finalchar.length);
    pass += finalchar[rand];
  }

  passDisplay.value = pass;
  genaratedPassDisplayOnSaveModal.value = pass;
  return pass;
}

genaratePass.addEventListener("click", () => {
  generateRandomPassword();
});

// reset button
function resetPassword() {
  uppercaseCheck.checked = false;
  lowercaseCheck.checked = false;
  symbolCheck.checked = false;
  numericCheck.checked = false;
  passDisplay.value = "";
  passLength.value = 6;
  passLengthVal.textContent = "06";
  passLengthWeak.classList.remove(
    "active-weak",
    "active-medium",
    "active-strong"
  );
  passLengthMedium.classList.remove(
    "active-weak",
    "active-medium",
    "active-strong"
  );
  passLengthStrong.classList.remove(
    "active-weak",
    "active-medium",
    "active-strong"
  );
  genaratedPassDisplayOnSaveModal.value = "";
}

// Indicator function

function passStrengthIndicator() {
  passLengthVal.textContent =
    passLength.value < 10 ? "0" + passLength.value : passLength.value;

  let val = parseInt(passLength.value);

  // reset all
  passLengthWeak.classList.remove(
    "active-weak",
    "active-medium",
    "active-strong"
  );
  passLengthMedium.classList.remove(
    "active-weak",
    "active-medium",
    "active-strong"
  );
  passLengthStrong.classList.remove(
    "active-weak",
    "active-medium",
    "active-strong"
  );

  // Weak Level (6–13)
  if (val >= 6 && val <= 13) {
    passLengthWeak.classList.add("active-weak");
  }
  // Medium Level (14–17)
  else if (val > 13 && val <= 17) {
    passLengthWeak.classList.add("active-medium");
    passLengthMedium.classList.add("active-medium");
  }
  // Strong Level (18–20)
  else if (val > 17 && val <= 20) {
    passLengthWeak.classList.add("active-strong");
    passLengthMedium.classList.add("active-strong");
    passLengthStrong.classList.add("active-strong");
  }
}
passLength.addEventListener("input", passStrengthIndicator);

// copy logic for generated password

function copyBtn(dataToCopy, clicktoCopy) {
  if (dataToCopy.value.trim().length === 0) {
    errorMessage("No data to copy!");
    return;
  } else {
    navigator.clipboard.writeText(dataToCopy.value).then(() => {
      clicktoCopy.classList.remove("fa-copy");
      clicktoCopy.classList.add("fa-check");
      setTimeout(() => {
        clicktoCopy.classList.add("fa-copy");
        clicktoCopy.classList.remove("fa-check");
      }, 2000);
    });
  }
}
// copy for genrated password dispplay
passDisplayCopyBtn.addEventListener("click", () => {
  copyBtn(passDisplay, passDisplayCopyBtn);
});
// name validation check

passForName.addEventListener("input", () => {
  let isValid = passForName.value.trim().length;
  if (isValid > 0) {
    passForName.style.borderColor = "green";
  } else {
    passForName.style.borderColor = "red";
  }
});

// delete modal

dltModalForSave.addEventListener("click", () => {
  modalForSave.style.display = "none";
  passForName.value = "";
  passForName.style.borderColor = "";
  passForLink.value = "";
});

// save password mdoal

saveBtn.addEventListener("click", () => {
  if (passDisplay.value.length === 0) {
    errorMessage("Generate a password first");
    return;
  }
  modalForSave.style.display = "flex";
});

// agree and save

agreetoSaveBtn.addEventListener("click", () => {
  document.getElementById("noSearchMessage").style.display = "none";
  if (!passForName.value.trim()) {
    passForName.style.borderColor = "red";
    passForName.focus();
    return;
  }
  if (agreeConditionForSave.checked) {
    passForName.style.borderColor = "";
    passSaveModalContainer.style.display = "none";
    savedPop.classList.add("show");
    pushPassToCard();
    generatePassCard(passCards);
    passForName.value = "";
    passForLink.value = "";
    genaratedPassDisplayOnSaveModal.value = "";
    passDisplay.value = "";
    setTimeout(() => {
      passSaveModalContainer.style.display = "block";
      modalForSave.style.display = "none";
      savedPop.classList.remove("show");
    }, 1500);
  } else {
    const conditionBox = document.querySelector(".condition-box");
    conditionBox.classList.add("error");
    setTimeout(() => {
      conditionBox.classList.remove("error");
    }, 3000);
  }
  agreeConditionForSave.checked = false;
});

// key event
function keyEnter(input, btn) {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      btn.click();
    }
  });
}
// key enter calls
keyEnter(passForName, agreetoSaveBtn);
keyEnter(passForLink, agreetoSaveBtn);
keyEnter(agreeConditionForSave, agreetoSaveBtn);

// generate pass card dynamically
function generatePassCard(data) {
  passCardContainer.innerHTML = data
    .map(
      (cards) =>
        `  <div class="pass-card">
            <div class="d-flex">
              <h4>
                Your Password for:
                <a  href="${cards.href}" target="_blank" class="pass-for-display" >${cards.passName}</a>
              </h4>
              <i class="fa-solid fa-close pass-dlt-btn" ></i>
            </div>
            <!-- pass-show-box -->
            <div class="d-flex">
              <label for="pass-saved-view" class="pass-view-box">
                <input type="password" class="pass-view" readonly value="${cards.passVal}" />
                <i
                  class="fa-solid fa-eye pass-toggle"
                  
                ></i>
              </label>
              <i class="fa-solid fa-copy saved-pass-copy" ></i>
            </div>
          </div>`
    )
    .join("");
}

generatePassCard(passCards);
function pushPassToCard() {
  passCards.push({
    passName: passForName.value,
    href: passForLink.value,
    passVal: genaratedPassDisplayOnSaveModal.value,
  });
  localStorage.setItem("passCards", JSON.stringify(passCards));
  generatePassCard(passCards);
  passTotalCount();
}

// dynamic card rendering copy show toggle
passCardContainer.addEventListener("click", (e) => {
  // select closest card
  const card = e.target.closest(".pass-card");
  if (!card) return;

  // check for input
  const input = card.querySelector(".pass-view");

  if (e.target.classList.contains("pass-toggle")) {
    if (input.type == "password") input.type = "text";
    else input.type = "password";

    e.target.classList.toggle("fa-eye");
    e.target.classList.toggle("fa-eye-slash");
  }

  // copy
  if (e.target.classList.contains("saved-pass-copy")) {
    copyBtn(input, e.target);
  }

  // delete logic
  if (e.target.classList.contains("pass-dlt-btn")) {
    cardToDelte = card;
    dltModal.style.display = "flex";
  }
});

// confirm to delete pass card
yesBtn.addEventListener("click", () => {
  if (!cardToDelte) return;

  passCards = passCards.filter(
    (i) => i.passName !== cardToDelte.querySelector("h4 a").textContent
  );
  localStorage.setItem("passCards", JSON.stringify(passCards));
  generatePassCard(passCards);
  passTotalCount();
  noPassMessage();
  dltModal.style.display = "none";
  cardToDelte = null;
});
// cancel to delete
noBtn.addEventListener("click", () => {
  dltModal.style.display = "none";
  dltModal.style.display = "none";
  cardToDelte = null;
});

// function for search
function searchPass(query) {
  const filtered = passCards.filter((i) =>
    i.passName.toLowerCase().includes(query)
  );
  generatePassCard(filtered);
  document.getElementById("noSearchMessage").style.display =
    filtered.length === 0 ? "block" : "none";
}

// search via input
document.getElementById("pass-search-input").addEventListener("input", (e) => {
  searchPass(e.target.value.toLowerCase().trim());
});

// search via search btn
document.getElementById("pass-search-btn").addEventListener("click", () => {
  searchPass(document.getElementById("pass-search-input").value);
});

// no Password Message
function noPassMessage() {
  if (passCards.length === 0) {
    document.getElementById("noSearchMessage").style.display = "block";
    document.getElementById("noSearchMessage").style.color = "#6d6969ff";
    document.getElementById("noSearchMessage").textContent =
      "Your password vault is empty.";
  }
}
// initial call
noPassMessage();

// reset call
resetPasswordBtn.addEventListener("click", resetPassword);
