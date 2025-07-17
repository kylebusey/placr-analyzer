const output = document.getElementById("output");

let playerElement = document.getElementById("player-name");
let playerName = playerElement.value;
let killsCheckBox = document.getElementById("kills");
let deathsCheckBox = document.getElementById("deaths");
let ecoCheckBox = document.getElementById("eco-kills");

let killsChecked = killsCheckBox.checked;
let deathsChecked = deathsCheckBox.checked;
let ecoKillsChecked = ecoCheckBox.checked;

export async function outputDemoData(demoFile) {
  //   dataParser.displayPlayerNames(demoFile);

  if (killsChecked) {
    if (ecoKillsChecked) {
      console.log("Getting all non-eco kills!");
      dataParser.getKills(demoFile, playerName);
    } else {
      console.log("Getting kills for: " + demoFile);
      dataParser.getKills(demoFile, playerName);
    }
  }

  if (deathsChecked) {
    console.log("Deaths Checked!");
    dataParser.getDeaths(demoFile, playerName);
  }

  if (ecoKillsChecked && !killsChecked) {
    alert("You must have show kills selected to show non eco kills.");
  }
}

export async function generateScoreboard(demoFile) {
  let playerNames = await dataParser.displayPlayerNames(demoFile);
  console.log("inside of generate scoreboard");
  console.log(playerNames);

  let tableNames = document.getElementById("table-names");

  playerNames.forEach((player) => {
    const playerRow = document.createElement("p");
    playerRow.textContent = `${player}`;
    tableNames.append(playerRow);
  });

  return;
}
