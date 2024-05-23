class Util {
  mod;
  defs;

  constructor(mod) {
    this.mod = mod; // Internal pointer to the default toolbox mod object.
    this.defs = new Map(); // Defs get retrieved below.

    // Before we startup any additional services, we retrieve "latest" def versions from GitHub.
    // This allows us to omit the manual versioning when using this utilities class.
    return new Promise((resolve, reject) => {
      this.mod.log('Starting defs bootstrapping');

      fetch('https://api.github.com/repos/tera-toolbox/tera-data/git/trees/master?recursive=true')
        .then(res => res.json())
        .then(({ tree }) => {
          for (const file of tree) {
            const matches = file.path.match(/definitions\/([a-z_]+).([0-9]).def/i);
            if (matches && matches.length > 1) {
              this.defs.set(matches[1], parseInt(matches[2])); // i.e. [CMD (str), ver (int)]
            }
          }

          this.mod.log('Defs bootstrapping complete');

          resolve(this);
        })
        .catch(reject);
    });
  }

  // Retrieves the appropriate cmd API versions from `this.defs`.
  getCmdVersion(cmd) {
    if (!this.defs.has(cmd)) {
      this.mod.warn(`Unknown command ${cmd}. Using "raw" as placeholder.`);
    }
    return this.defs.get(cmd);
  }

  // Random timer offset
  rOff() {
    return Math.random() * 1000; // Somewhere between 0 and 1 seconds.
  }

  // try/catch wrapper for cleanliness
  tryCatch(cb, data = null) {
    try {
      cb();
    } catch(e) {
      this.mod.err(e, JSON.stringify(data, null, 2));
    }
  }

  /* === BEGIN LOGGING === */

  log(msg) {
    this.mod.log(msg);
  }

  warn(msg) {
    this.mod.warn(msg);
  }

  err(msg) {
    this.mod.err(msg);
  }

  /* === END LOGGING === */

  /* === BEGIN CMD HELPERS === */

  // NOTE: Server communications begin with `C_`, while client communications begin with `S_`.
  // See: https://github.com/tera-private-toolbox/tera-toolbox/blob/master/doc/mod/hooks.md

  sendServer(cmd, vars, inSeconds = 0) {
    this.tryCatch(() => {
      const realCommand = 'C_' + cmd;
      const cmdVersion = this.getCmdVersion(realCommand);
      
      this.mod.setTimeout(() => {
        this.tryCatch(() => this.mod.send(realCommand, cmdVersion, vars), arguments);
      }, (inSeconds * 1000) + this.rOff());
    }, arguments);
  }

  sendClient(cmd, vars, inSeconds = 0) {
    this.tryCatch(() => {
      const realCommand = 'S_' + cmd;
      const cmdVersion = this.getCmdVersion(realCommand);

      this.mod.setTimeout(() => {
        this.tryCatch(() => this.mod.send(realCommand, cmdVersion, vars), arguments);
      }, (inSeconds * 1000) + this.rOff());
    }, arguments);
  }

  hookServer(cmd, cb) {
    this.tryCatch(() => {
      const realCommand = 'C_' + cmd;
      const cmdVersion = this.getCmdVersion(realCommand);
      this.mod.hook(realCommand, cmdVersion, evt => tryCatch(() => cb(evt), arguments));
    }, arguments);
  }

  hookClient(cmd, cb) {
    this.tryCatch(() => {
      const realCommand = 'S_' + cmd;
      const cmdVersion = this.getCmdVersion(realCommand);
      this.mod.hook(realCommand, cmdVersion, evt => tryCatch(() => cb(evt), arguments));
    }, arguments);
  }

  debugHookServer(cmd, prefix = '') {
    const realCommand = 'C_' + cmd;
    const cmdVersion = this.getCmdVersion(realCommand);

    this.mod.hook(realCommand, cmdVersion, evt => {
      this.mod.log(prefix + JSON.stringify(evt, null, 2));
    });
  }

  debugHookClient(cmd, prefix = '') {
    const realCommand = 'S_' + cmd;
    const cmdVersion = this.getCmdVersion(realCommand);

    this.mod.hook(realCommand, cmdVersion, evt => {
      this.mod.log(prefix + JSON.stringify(evt, null, 2));
    });
  }

  /* === END CMD HELPERS === */
}

module.exports = Util;
