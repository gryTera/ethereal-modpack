const path = require('path');

// Some defs are not available by default in tera toolbox. We load them here.
function addDefs(mod) {
  mod.dispatch.addDefinition('C_REQUEST_SPAWN_SERVANT', 1, path.join(__dirname, '..', 'defs', 'C_REQUEST_SPAWN_SERVANT.1.def'));
	mod.dispatch.addDefinition('C_REQUEST_SPAWN_SERVANT', 2, path.join(__dirname, '..', 'defs', 'C_REQUEST_SPAWN_SERVANT.2.def'));
	mod.dispatch.addDefinition('C_START_SERVANT_ACTIVE_SKILL', 1, path.join(__dirname, '..', 'defs', 'C_START_SERVANT_ACTIVE_SKILL.1.def'));
	mod.dispatch.addDefinition('C_START_SERVANT_ACTIVE_SKILL', 2, path.join(__dirname, '..', 'defs', 'C_START_SERVANT_ACTIVE_SKILL.2.def'));
	mod.dispatch.addDefinition('S_START_COOLTIME_SERVANT_SKILL', 1, path.join(__dirname, '..', 'defs', 'S_START_COOLTIME_SERVANT_SKILL.1.def'));
	mod.dispatch.addDefinition('S_UPDATE_SERVANT_INFO', 1, path.join(__dirname, 'defs', '..', 'S_UPDATE_SERVANT_INFO.1.def'));
}

module.exports = addDefs;
