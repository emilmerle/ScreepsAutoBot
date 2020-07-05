var roleRepairer = {

	/** @param {Creep} creep **/
	run: function (creep) {

		//own harvest function
		var harvestModule = require("harvestModule");
		var buildingModule = require("buildingModule");

		if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
			creep.memory.building = true;
			creep.say('🚧 repair');
		}

		if(creep.memory.building) {
			var repairingFinished = buildingModule.ownRepairing(creep);
			if(repairingFinished != 1){
				creep.moveTo(Game.flags.CollectionPoint);
			}
		}
		else {
			var harvestFinished = harvestModule.ownLootTombstones(creep);
			if(harvestFinished != 1){
                harvestFinished = harvestModule.ownFindDroppedEnergy(creep);
            }
			if(harvestFinished != 1){
                harvestFinished = harvestModule.ownHarvestFromStorage(creep);
            }
            if(harvestFinished != 1){
                creep.moveTo(Game.flags.CollectionPoint);
            }
		}
	}
};
module.exports = roleRepairer;