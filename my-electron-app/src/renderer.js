const scoreboardSection = document.getElementById("scoreboardSection");
const individualSection = document.getElementById("individualSection");

const fileButton = document.getElementById("fileButton");
const startButton = document.getElementById("startButton");
const output = document.getElementById("output");
const conditionalSection = document.getElementById("conditional-section");

let playerElement = document.getElementById("player-name");
let selectedFile = null;

let killsCheckBox = document.getElementById("kills");
let deathsCheckBox = document.getElementById("deaths");
let ecoCheckBox = document.getElementById("eco-kills");

async function checkForFile() {
  if (selectedFile) {
    conditionalSection.style.display = "flex";
    console.log("Displaying conditional section.");
  }
}

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
  }

  let playerName = playerElement.value;

  let killsChecked = killsCheckBox.checked;
  let deathsChecked = deathsCheckBox.checked;
  let ecoKillsChecked = ecoCheckBox.checked;

  // if (!playerName) {
  //   alert("No Player Selected!");
  //   return;
  // }
  dataParser.displayPlayerNames(selectedFile);

  if (killsChecked) {
    if (ecoKillsChecked) {
      console.log("Getting all non-eco kills!");
      dataParser.getKills(selectedFile, playerName);
    } else {
      console.log("Kills Checked!");
      dataParser.getKills(selectedFile, playerName);
    }
  }

  if (deathsChecked) {
    console.log("Deaths Checked!");
    dataParser.getDeaths(selectedFile, playerName);
  }

  if (ecoKillsChecked && !killsChecked) {
    alert("You must have show kills selected to show non eco kills.");
    return;
  }
});
