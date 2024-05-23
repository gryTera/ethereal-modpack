function autoRestartGuildQuests(utils) {
  // Attempts to finish and restart guild quests when they are complete.
  utils.hookClient('UPDATE_GUILD_QUEST_STATUS', evt => {
    if (evt.targets[0].completed !== evt.targets[0].total) return;

    // utils.log('Data from Guild Quest Finalization: \n' + JSON.stringify(evt, null, 2));

    utils.sendServer('REQUEST_FINISH_GUILD_QUEST', { quest: evt.quest }, 5);
    utils.sendServer('REQUEST_START_GUILD_QUEST', { questId: evt.quest }, 10);
  });
}

module.exports = {
  autoRestartGuildQuests,
};
