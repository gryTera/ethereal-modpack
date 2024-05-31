const SettingsUI = require('tera-mod-ui').Settings;

const mod_settings = [
  {
    key: 'vg',
    name: 'Auto Vanguard',
    type: 'bool',
  },
  {
    key: 'gq',
    name: 'Auto Guildquest',
    type: 'bool',
  },
  {
    key: 'gl',
    name: 'Auto Guardian Legion',
    type: 'bool',
  },
  {
    key: 'dl',
    name: 'Auto Daily Rewards',
    type: 'bool',
  },
  {
    key: 'pet',
    name: 'Auto Pet',
    type: 'bool',
  },
  {
    key: 'sf',
    name: 'Just Spam F',
    type: 'bool',
  },
];

function registerCommands(mod) {
  // Helper method for chat commands.
  function toggleOption(opt) {
    mod.settings[opt] = !mod.settings.opt;
    
    const optObj = mod_settings.find(setting => setting.key === opt);
    mod.command.message(optObj.name + ': ' + (mod.settings[opt] ? 'ON' : 'OFF'))
  }

  // Initialize GUI. Stolen from https://github.com/CatAnnaDev/Auto-Guildquest/blob/master/index.js#L116
  let ui = { show: () => null };
  if (global.TeraProxy.GUIMode) {
    ui = new SettingsUI(mod, mod_settings, mod.settings, { alwaysOnTop: true, width: 550, height: 550 });
		ui.on('update', settings => { mod.settings = settings; });
  }

  // We create this constant outside of the call to mod.command.add so that commands can be
  // automatically added based on mod_settings.
  const commands = {
    ui: () => {
      ui.show();
    },

    $default: () => {
      mod.command.message('Ethereal Modpack Commands: \n');

      mod.command.message('ui | Open Settings UI');

      for (const setting of mod_settings) {
        mod.command.message(setting.key + ' | Toggle ' + setting.name);
      }
    }
  };

  for (const setting of mod_settings) {
    commands[setting.key] = () => toggleOption(setting.key);
  }

  mod.command.add('eth', commands);
}

module.exports = registerCommands;
