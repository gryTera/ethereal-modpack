const Util = require('./src/util');

const addDefs = require('./src/defs');
const addNeededOpcodes = require('./src/opcodes');
const registerCommands = require('./src/commands');

const { autoPet } = require('./src/auto-pet');
const { autoCompleteVanguard, autoRestartGuildQuests } = require('./src/auto-quest');
const { autoClaimDaily, autoCompleteGuardian } = require('./src/auto-reward');
const { spamF } = require('./src/spam-f');

class EtherealModpack {
  constructor(mod) {
    try {
      // See: https://github.com/tera-toolbox/tera-game-state/tree/master
      //
      // It's 2024, we ignore the advice not to hook into potentially unnecessary modules.
      // Performance is not an issue at this point.
      mod.game.initialize([
        'me',
        'me.abnormalities',
        'contract',
        'inventory',
        'talents',
        'glyphs',
        'party',
      ]);

      addDefs(mod); // Alongside opcodes, some defs need to be loaded.
      addNeededOpcodes(mod); // This needs to be called before any bootstrapping so that hooks can work effectively.
      registerCommands(mod); // We use mod directly for command registration.
    } catch(e) {
      mod.error('Failed to initialize Ethereal Modpack!');
      mod.error(e);
    }

    // Initialize the `util` object, which overloads `mod` for safety.
    new Util(mod).then(utils => {
      autoPet(utils);

      autoCompleteVanguard(utils);
      autoRestartGuildQuests(utils);

      autoClaimDaily(utils);
      autoCompleteGuardian(utils);

      spamF(utils);
    }).catch(e => {
      mod.error(e);
    });
  }
}

module.exports = EtherealModpack;
