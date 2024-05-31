function autoClaimDaily(util) {
  util.hookClient('SPAWN_ME', () => {
    if (!util.settings.dl) return;

    util.sendServer('REQUEST_RECV_DAILY_TOKEN', {});
  }, 'event');
}

function autoCompleteGuardian(util) {
  util.hookClient('FIELD_EVENT_PROGRESS_INFO', () => {
    if (!util.settings.gl) return;

    util.sendServer('REQUEST_FIELD_POINT_REWARD', {}, 2);
    util.sendServer('REQUEST_ONGOING_FIELD_EVENT_LIST', {}, 4);
  });
}

module.exports = {
  autoClaimDaily,
  autoCompleteGuardian,
};
