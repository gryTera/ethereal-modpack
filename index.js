const Util = require('./src/util');

const { autoRestartGuildQuests } = require('./src/quest-completer');

class EtherealModpack {
	constructor(mod) {
		new Util(mod).then(utils => {
			autoRestartGuildQuests(utils);
		}).catch(e => {
			mod.err('Failed to bootstrap modpack. Fetch to tera-data tree failed.');
			mod.err(e);
		});
	}
}

module.exports = EtherealModpack;
