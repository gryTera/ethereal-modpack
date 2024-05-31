// Various opcodes are necessary for the mods within this pack.
// Tera Toolbox for some reason does not come prepackaged with some of them.
// For safety, we overload the toolbox opcodes here with all used codes for the Menma's server.
function addNeededOpcodes(mod) {
  // See: https://github.com/tera-private-toolbox/tera-toolbox/blob/master/data/data.json
  const opcodeOverrides = {
    C_REQUEST_FINISH_GUILD_QUEST: 41778,
    C_REQUEST_START_GUILD_QUEST: 30633,
    S_UPDATE_GUILD_QUEST_STATUS: 37029,

    C_COMPLETE_DAILY_EVENT: 20411,
    C_COMPLETE_EXTRA_EVENT: 33216,
    S_COMPLETE_EVENT_MATCHING_QUEST: 26850,

    C_REQUEST_RECV_DAILY_TOKEN: 34651,
    S_SPAWN_ME: 33637,

    S_FIELD_EVENT_PROGRESS_INFO: 22827,
    C_REQUEST_FIELD_POINT_REWARD: 39121,
    C_REQUEST_ONGOING_FIELD_EVENT_LIST: 63719,

    C_REQUEST_SPAWN_SERVANT: 23680,
    C_START_SERVANT_ACTIVE_SKILL: 30372,
    S_START_COOLTIME_SERVANT_SKILL: 37160,
    S_UPDATE_SERVANT_INFO: 64247,
  };

  // Overloads the internal tera-toolbox opcodes to ensure the proper ops are implemented.
  for (const [name, opcode] of Object.entries(opcodeOverrides)) {
    mod.clientInterface.info.protocol[name] = opcode;
    mod.dispatch.addOpcode(name, opcode);
  }
}

module.exports = addNeededOpcodes;
