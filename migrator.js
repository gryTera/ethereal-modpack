const DefaultSettings = {
	vg: true,
  gq: true,
  gl: true,
  dl: true,
  pet: true,
  sf: true,

  pets: {},
};

module.exports = function MigrateSettings(fr, to, settings) {
  return { ...DefaultSettings, ...settings };
};
