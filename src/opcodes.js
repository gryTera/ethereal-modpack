function addNeededOpcodes(mod) {
  const opCodeOverrides = {
    C_REQUEST_FINISH_GUILD_QUEST: 41778,
  };

  for (const [name, opcode] of Object.values(opCodeOverrides)) {
    mod.clientInterface.info.protocol[name] = opcode;
  }
}

module.exports = addNeededOpcodes;
