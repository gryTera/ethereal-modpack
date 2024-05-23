const Util = require('./src/util');

const { autoRestartGuildQuests } = require('./src/quest-completer');

class EtherealModpack {
	constructor(mod) {
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
