const destructor = require('./src/destructor');

class EtherealModpack {
	mod;

	constructor(mod) {
		this.mod = mod; // Add reference to passed mod for destructor.
		this.mod.log('Ethereal Modpack successfully loaded up!');
	}

	destructor() {
		destructor(this.mod);
	}
}

module.exports = EtherealModpack;
