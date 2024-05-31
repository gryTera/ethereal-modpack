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

function autoPet(utils) {
  let characterId, playerLoc, playerW, petSkillTimeout;

  function getPet() {
    return utils.settings.pet[characterId] || {
      id: null,
      uniqueId: null,
      bondSkill: null,
    };
  }

  function savePet(pet) {
    utils.mod.settings.pets[characterId] = pet;
  }

  function summonPet() {
    if (!utils.settings.pet) return;

    utils.sendServer('REQUEST_SPAWN_SERVANT', {
      servantId: getPet().id,
      uniqueId: getPet().uniqueId,
      unk: 0,
    }, 4);

    usePetSkill();
  }

  function feedPet() {
    if (!utils.settings.pet || !getPet().id) return;

    foods.forEach(item => {
			const foodItem = mod.game.inventory.findInBagOrPockets(item.id);
			if (!foodItem) return;

      utils.sendServer('USE_ITEM', {
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
    if (!utils.settings.pet) return;

    utils.sendServer('START_SERVANT_ACTIVE_SKILL', {
      gameId: getPet().id,
      skill: getPet().bondSkill,
    }, 2);
  }

  // Set current character upon login for reference.
  utils.hookClient('LOGIN', evt => {
    characterId = `${evt.playerId}_${evt.serverId}`;
  }, 14);

  // Required when feeding pet.
  utils.hookServer('PLAYER_LOCATION', evt => {
    playerLoc = evt.loc;
    playerW = evt.w;
  });

  // When we go someplace new, summon pet.
  utils.hookClient('VISIT_NEW_SECTION', () => {
    if (!utils.settings.pet) return;
    summonPet();
  });

  // When we spawn, summon pet.
  utils.hookClient('SPAWN_ME', () => {
    if (!utils.settings.pet) return;
    summonPet();
  });

  // Detects and saves pets when they are summoned.
  utils.hookClient('REQUEST_SPAWN_SERVANT', evt => {
    if (!utils.game.me.is(evt.ownerId)) return;

    if (!getPet().id) {
      savePet({
        id: evt.id,
        uniqueId: evt.dbid,
      });
    }
  }, 2);

  // Cleanup if pet is manually despawned.
  utils.hookClient('REQUEST_DESPAWN_SERVANT', evt => {
    if (!evt.gameId === getPet().id) return;
    if (petSkillTimeout) clearTimeout(petSkillTimeout);
  });

  // Store bond skill on use.
  utils.hookServer('START_SERVANT_ACTIVE_SKILL', evt => {
    savePet({ ...getPet(), bondSkill: evt.skill });
  });

  // Detect and store bond skill cooldown to restart.
  utils.hookClient('START_COOLTIME_SERVANT_SKILL', evt => {
    if (!utils.settings.pet || !getPet().bondSkill) return;

    petSkillTimeout = utils.mod.setTimeout(() => {
      usePetSkill();
    }, evt.cooltime + 100);
  }, 1);

  // Use pet skill on rez.
  utils.game.me.on('resurrect', () => {
    if (!util.settings.pet || !getPet().bondSkill) return;
    usePetSkill();
  });

  // Feed pet when below 90% energy.
  utils.hookClient('UPDATE_SERVANT_INFO', evt => {
    if (!utils.settings.pet) return;

    const energy = (evt.energy / 300) * 100;
    if (energy < 90) feedPet();
  });
}

module.exports = {
  autoPet,
};
