const foods = [
  {
    id: 206049,
    name: 'Puppy Figurine',
    cd: 2
  },
  {
    id: 206050,
    name: 'Piglet Figurine',
    cd: 2
  },
  {
    id: 206051,
    name: 'Popori Figurine',
    cd: 2
  }
];

function autoPet(util) {
  let characterId, playerLoc, playerW, petSkillTimeout;

  function getPet() {
    return util.settings.pet[characterId] || {
      id: null,
      uniqueId: null,
      bondSkill: null,
    };
  }

  function savePet(pet) {
    util.mod.settings.pets[characterId] = pet;
  }

  function summonPet() {
    if (!util.settings.pet) return;

    util.sendServer('REQUEST_SPAWN_SERVANT', {
      servantId: getPet().id,
      uniqueId: getPet().uniqueId,
      unk: 0,
    });

    usePetSkill();
  }

  function feedPet() {
    if (!util.settings.pet || !getPet().id) return;

    foods.forEach(item => {
			const foodItem = mod.game.inventory.findInBagOrPockets(item.id);
			if (!foodItem) return;

      util.sendServer('USE_ITEM', {
        gameId: mod.game.me.gameId,
        id: foodItem.id,
        dbid: foodItem.dbid,
        target: 0,
        amount: 1,
        dest: 0,
        loc: playerLoc,
        w: playerW,
        unk1: 0,
        unk2: 0,
        unk3: 0,
        unk4: true,
      });
		});
  }

  function usePetSkill() {
    if (!util.settings.pet) return;

    util.sendServer('START_SERVANT_ACTIVE_SKILL', {
      gameId: getPet().id,
      skill: getPet().bondSkill,
    });
  }

  // Set current character upon login for reference.
  util.hookClient('LOGIN', evt => {
    characterId = `${evt.playerId}_${evt.serverId}`;
  });

  // Required when feeding pet.
  util.hookServer('PLAYER_LOCATION', evt => {
    playerLoc = evt.loc;
    playerW = evt.w;
  });

  // When we go someplace new, summon pet.
  util.hookClient('VISIT_NEW_SECTION', () => {
    if (!mod.settings.pet) return;
    summonPet();
  });

  // When we spawn, summon pet.
  util.hookClient('SPAWN_ME', () => {
    if (!mod.settings.pet) return;
    summonPet();
  });

  // Detects and saves pets when they are summoned.
  util.hookClient('REQUEST_SPAWN_SERVANT', evt => {
    if (!util.game.me.is(evt.ownerId)) return;

    if (!getPet().id) {
      savePet({
        id: evt.id,
        uniqueId: evt.dbid,
      });
    }
  });

  // Cleanup if pet is manually despawned.
  util.hookClient('REQUEST_DESPAWN_SERVANT', evt => {
    if (!evt.gameId === getPet().id) return;
    if (petSkillTimeout) clearTimeout(petSkillTimeout);
  });

  // Store bond skill on use.
  util.hookServer('START_SERVANT_ACTIVE_SKILL', evt => {
    savePet({ ...getPet(), bondSkill: evt.skill });
  });

  // Detect and store bond skill cooldown to restart.
  util.hookClient('START_COOLTIME_SERVANT_SKILL', evt => {
    if (!util.settings.pet || !getPet().bondSkill) return;

    petSkillTimeout = util.mod.setTimeout(() => {
      usePetSkill();
    }, evt.cooltime + 100);
  });

  // Use pet skill on rez.
  mod.game.me.on('resurrect', () => {
    if (!util.settings.pet || !getPet().bondSkill) return;
    usePetSkill();
  });

  // Feed pet when below 90% energy.
  util.hookClient('UPDATE_SERVANT_INFO', evt => {
    if (!util.settings.pet) return;

    const energy = (evt.energy / 300) * 100;
    if (energy < 90) feedPet();
  });
}

module.exports = {
  autoPet,
};
