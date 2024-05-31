// Recreation of the "Just Spam F" mod.
// See: https://github.com/Snugglez/JustSpamF/blob/master/index.js
function spamF(utils) {
  utils.hookClient('DIALOG', e => {
    if (!e.buttons.length || !utils.settings.sf) return;

    for (let i = 0; i < e.buttons.length; i++) {
      if ([1, 2, 3, 4, 5, 51, 53, 54, 55, 56, 63].includes(e.buttons[i].type)) e.buttons[i].type = 43;
    }

    e.type = 1;

    return true;
  }, '*');
}

module.exports = {
  spamF,
}
