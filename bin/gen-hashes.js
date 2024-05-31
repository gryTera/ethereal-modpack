const { createHash } = require('crypto');
const { readFileSync, writeFileSync } = require('fs');

const manifest = {
  files: {},
  defs: {},
};

function generateHash(text) {
  return createHash('sha256').update(text).digest('hex');
}

// Any new files added to the modpack need to be listed here.
const includedFiles = [
  'index.js',
  'module.json',
  'migrator.js',

  'defs/C_REQUEST_SPAWN_SERVANT.4.def',
  'defs/C_START_SERVANT_ACTIVE_SKILL.1.def',
  'defs/C_START_SERVANT_ACTIVE_SKILL.2.def',
  'defs/S_START_COOLTIME_SERVANT_SKILL.1.def',
  'defs/S_UPDATE_SERVANT_INFO.1.def',

  'src/auto-pet.js',
  'src/auto-quest.js',
  'src/auto-reward.js',
  'src/commands.js',
  'src/defs.js',
  'src/opcodes.js',
  'src/spam-f.js',
  'src/util.js',
];

for (const file of includedFiles) {
  manifest.files[file] = generateHash(readFileSync(__dirname + '/../' + file));
}

writeFileSync(__dirname + '/../manifest.json', JSON.stringify(manifest, null, 2));
