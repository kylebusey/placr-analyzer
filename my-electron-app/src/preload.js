const { contextBridge, ipcRenderer } = require("electron");
const path = require("node:path");
const { parseEvent, parseTicks } = require("@laihoe/demoparser2");

contextBridge.exposeInMainWorld("dataParser", {
  displayPlayerNames: async (filePath) => {
    let playerNames = [];

    let kills = parseEvent(
      filePath,
      "player_death",
      ["last_place_name", "team_name", "round_start_equip_value"],
      ["total_rounds_played", "is_warmup_period"]
    );

    kills.forEach((death) => {
      let currentPlayer = death.user_name;
      if (!playerNames.includes(currentPlayer)) {
        playerNames.push(currentPlayer);
      }
    });

    console.log(playerNames);
    return;
  },

  getKills: async (filePath, playerName) => {
    console.log("Reading File!!!");

    let kills = parseEvent(
      filePath,
      "player_death",
      ["last_place_name", "team_name", "round_start_equip_value"],
      ["total_rounds_played", "is_warmup_period"]
    );

    let killsNoWarmup = kills.filter(
      (kills) => kills.is_warmup_period == false
    );

    let filteredKills = killsNoWarmup.filter(
      (killsNoWarmup) => killsNoWarmup.attacker_name == playerName
    );
    console.log(filteredKills);

    return filteredKills;
  },

  getDeaths: async (filePath, playerName) => {
    let deaths = parseEvent(
      filePath,
      "player_death",
      ["player_name", "last_place_name", "X", "Y", "current_equip_value"],
      ["total_rounds_played"]
    );

    let filteredDeaths = deaths.filter(
      (deaths) => deaths.user_name == playerName
    );

    return filteredDeaths;
  },

  //still needs to be done
  getGunRoundKills: async (filePath, playerName) => {
    filteredKills = getKills(filePath, playerName);

    let gunRoundKills = filteredKills.filter(
      (filteredKills) => filteredKills.attacker_name == playerName
    );

    return gunRoundKills;
  },
});

contextBridge.exposeInMainWorld("path", {
  resolveDemoPath: (fileName) => {
    return path.resolve("demos", fileName);
  },
});
