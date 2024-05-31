function autoCompleteVanguard(utils) {
  utils.hookClient('COMPLETE_EVENT_MATCHING_QUEST', evt => {
    if (!utils.settings.vg) return;

    utils.sendServer('COMPLETE_DAILY_EVENT', { id: evt.questId }, 1);
    utils.sendServer('COMPLETE_EXTRA_EVENT', { type: 0 }, 2);
    utils.sendServer('COMPLETE_EXTRA_EVENT', { type: 1 }, 3);
  });
}

function autoRestartGuildQuests(utils) {
  utils.hookClient('UPDATE_GUILD_QUEST_STATUS', evt => {
    if (!utils.settings.gq) return;

    if (evt.targets[0].completed !== evt.targets[0].total) return;
    utils.sendServer('REQUEST_FINISH_GUILD_QUEST', { quest: evt.quest }, 2);
    utils.sendServer('REQUEST_START_GUILD_QUEST', { questId: evt.quest }, 5);
  });
}

module.exports = {
  autoCompleteVanguard,
  autoRestartGuildQuests,
};
