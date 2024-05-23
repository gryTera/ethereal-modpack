function addNeededOpcodes(mod) {
  // mod.log(typeof mod.dispatch.protocolMap);
  // mod.log(JSON.stringify(mod.dispatch.protocolMap, null, 2));

  // mod.log('protocol map version: ' + mod.clientInterface.info.protocolVersion);
  // mod.log(JSON.stringify(mod.clientInterface.info.protocol, null, 2));

  const opcodeOverrides = {
    C_REQUEST_FINISH_GUILD_QUEST: 41778,
  };

  for (const [name, opcode] of Object.entries(opcodeOverrides)) {
    mod.clientInterface.info.protocol[name] = opcode;
    mod.dispatch.addOpcode(name, opcode);
  }
}

module.exports = addNeededOpcodes;
