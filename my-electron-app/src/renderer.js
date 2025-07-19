const fileButton = document.getElementById("fileButton");
const startButton = document.getElementById("startButton");
const conditionalSection = document.getElementById("conditional-section");
const output = document.getElementById("output");

let selectedFile = null;
let playerName = document.getElementById("player-name").value;
let killsCheckBox = document.getElementById("kills").checked;
let deathsCheckBox = document.getElementById("deaths").checked;
let ecoCheckBox = document.getElementById("eco-kills").checked;

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
    outputDemoData();
    await generateScoreboard();
  }
});

async function checkForFile() {
  if (selectedFile) {
    conditionalSection.style.display = "flex";
    console.log("Displaying conditional section.");
    return true;
  }
}

async function outputDemoData() {
  let playerName = document.getElementById("player-name").value;
  let map_name = await dataParser.getMap(selectedFile);
  console.log(map_name);

  if (killsCheckBox) {
    if (ecoCheckBox) {
      console.log("Getting all non-eco kills!");
      dataParser.getKills(selectedFile, playerName);
    } else {
      console.log("Kills Checked!");
      dataParser.getKills(selectedFile, playerName);
    }
  }

  if (deathsCheckBox) {
    console.log("Deaths Checked!");
    dataParser.getDeaths(selectedFile, playerName);
  }

  if (ecoCheckBox && !killsCheckBox) {
    alert("You must have show kills selected to show non eco kills.");
  }
}

async function generateScoreboard() {
  let playerNames = await dataParser.displayPlayerNames(selectedFile);
  let tableNames = document.getElementById("table-names");

  playerNames.forEach((player) => {
    const playerRow = document.createElement("p");
    playerRow.textContent = `${player}`;
    tableNames.append(playerRow);
  });

  return;
}
