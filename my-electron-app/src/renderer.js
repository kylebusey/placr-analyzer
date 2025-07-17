import { outputDemoData } from "./demoParser.js";

const fileButton = document.getElementById("fileButton");
const startButton = document.getElementById("startButton");
const conditionalSection = document.getElementById("conditional-section");
const output = document.getElementById("output");
let selectedFile = null;

let playerElement = document.getElementById("player-name");
let playerName = playerElement.value;
let killsCheckBox = document.getElementById("kills");
let deathsCheckBox = document.getElementById("deaths");
let ecoCheckBox = document.getElementById("eco-kills");

let killsChecked = killsCheckBox.checked;
let deathsChecked = deathsCheckBox.checked;
let ecoKillsChecked = ecoCheckBox.checked;

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-bar button");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const clickedTab = button.getAttribute("data-tab");

      document.querySelectorAll(".tab-content").forEach((tab) => {
        tab.classList.remove("active");
      });
      document.getElementById(clickedTab).classList.add("active");
    });
  });
});

fileButton.addEventListener("click", async () => {
  console.log("file button clicked");

  const input = document.createElement("input");
  input.type = "file";

  input.onchange = (e) => {
    const filePath = e.target.files[0];
    output.innerText = "Current Demo Selected: " + "\n" + filePath.name;
    selectedFile = path.resolveDemoPath(filePath.name);
    checkForFile();
  };

  input.click();
});

startButton.addEventListener("click", async () => {
  if (!selectedFile) {
    console.log("No file currently selected!");
    return;
  } else {
    console.log("testing: " + selectedFile);
    outputDemoData(selectedFile);
  }
});

async function checkForFile() {
  if (selectedFile) {
    conditionalSection.style.display = "flex";
    console.log("Displaying conditional section.");
  }
}

// export async function outputDemoData() {
//   demoParser.displayPlayerNames();

//   if (killsChecked) {
//     if (ecoKillsChecked) {
//       console.log("Getting all non-eco kills!");
//       dataParser.getKills(selectedFile, playerName);
//     } else {
//       console.log("Kills Checked!");
//       dataParser.getKills(selectedFile, playerName);
//     }
//   }

//   if (deathsChecked) {
//     console.log("Deaths Checked!");
//     dataParser.getDeaths(selectedFile, playerName);
//   }

//   if (ecoKillsChecked && !killsChecked) {
//     alert("You must have show kills selected to show non eco kills.");
//   }
// }
