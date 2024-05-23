const Util = require('./src/util');

const addNeededOpcodes = require('./src/opcodes');
const { autoRestartGuildQuests } = require('./src/quest-completer');

class EtherealModpack {
	constructor(mod) {
		addNeededOpcodes(mod);

		console.log(JSON.stringify(mod, null, 2));

		mod.log('protocol map version: ' + mod.clientInterface.info.protocolVersion);
		mod.log(JSON.stringify(mod.clientInterface.info.protocol, null, 2));

		new Util(mod).then(utils => {
			autoRestartGuildQuests(utils);
		}).catch(e => {
			mod.error(e);
		});
	}
}

module.exports = EtherealModpack;
