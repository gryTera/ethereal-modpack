const Util = require('./src/util');

const { autoRestartGuildQuests } = require('./src/quest-completer');

class EtherealModpack {
	constructor(mod) {
		console.log(JSON.stringify(mod.clientInterface.info.protocol, null, 2));

		new Util(mod).then(utils => {
			autoRestartGuildQuests(utils);
		}).catch(e => {
			mod.error(e);
		});
	}
}

module.exports = EtherealModpack;
