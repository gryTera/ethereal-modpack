function addNeededOpcodes(mod) {
  // See: https://github.com/tera-private-toolbox/tera-toolbox/blob/master/data/data.json
  const opcodeOverrides = {
    C_REQUEST_FINISH_GUILD_QUEST: 41778,
    C_REQUEST_START_GUILD_QUEST: 30633,
    S_UPDATE_GUILD_QUEST_STATUS: 37029,
  };

  // Overloads the internal tera-toolbox opcodes to ensure the proper ops are implemented.
  for (const [name, opcode] of Object.entries(opcodeOverrides)) {
    mod.clientInterface.info.protocol[name] = opcode;
    mod.dispatch.addOpcode(name, opcode);
  }
}

module.exports = addNeededOpcodes;
