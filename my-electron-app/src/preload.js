const { contextBridge, ipcRenderer } = require("electron");
const path = require("node:path");
const {
  parseEvent,
  parseTicks,
  parsePlayerInfo,
  parseHeader,
} = require("@laihoe/demoparser2");

contextBridge.exposeInMainWorld("dataParser", {
  getMap: async (filePath) => {
    let mapData = parseHeader(filePath);
    return mapData.map_name;
  },
  displayPlayerNames: async (filePath) => {
    let playerNames = [];

    let playerData = parsePlayerInfo(filePath);
    playerData.sort((a, b) => a.team_number - b.team_number);

    playerData.forEach((player) => {
      playerNames.push(player.name);
    });

    return playerNames;
  },

  getKills: async (filePath, playerName) => {
    console.log("Reading File!!!");
    console.log("Player name is: " + playerName);

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

    console.log(filteredDeaths);

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
