const { createHash } = require('crypto');
const { readFileSync, writeFileSync } = require('fs');

const manifest = {
  files: {},
  defs: {},
};

function generateHash(text) {
  return createHash('sha256').update(text).digest('hex');
}

const includedFiles = [
  'index.js',
  'module.json',
  'src/quest-completer.js',
  'src/register-commands.js',
  'src/util.js',
];

for (const file of includedFiles) {
  manifest.files[file] = generateHash(readFileSync(__dirname + '/../' + file));
}

writeFileSync(__dirname + '/../manifest.json', JSON.stringify(manifest, null, 2));
