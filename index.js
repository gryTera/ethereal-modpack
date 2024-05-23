const Util = require('./src/util');

const addNeededOpcodes = require('./src/opcodes');
const { autoRestartGuildQuests } = require('./src/quest-completer');

class EtherealModpack {
  constructor(mod) {
    addNeededOpcodes(mod); // This needs to be called before any bootstrapping so that hooks can work effectively.

    new Util(mod).then(utils => {
      autoRestartGuildQuests(utils);
    }).catch(e => {
      mod.error(e);
    });
  }
}

module.exports = EtherealModpack;
