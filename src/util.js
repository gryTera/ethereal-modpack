class Util {
  mod;

  constructor(mod) {
    this.mod = mod;
  }

  tryCatch(cb, data) {
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

  log_verbose(msg) {
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

  sendServer() {}

  sendClient() {}

  addAction() {}

  addFilter() {}

  /* === END CMD HELPERS === */
}

module.exports = Util;
