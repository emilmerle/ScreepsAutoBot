var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		//own harvest function
		var harvestModule = require("harvestModule");
		var buildingModule = require("buildingModule");

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    	if(!creep.memory.building && creep.store.getFreeCapacity() === 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
			var buildingFinished = buildingModule.ownBuilding(creep);
			if(buildingFinished != 1){
                buildingFinished = buildingModule.ownRepairing(creep);
            }
            if(buildingFinished != 1){
				buildingModule.ownUpgrading(creep);
            }
	    }
	    else {
			var harvestFinished = harvestModule.ownFindDroppedEnergy(creep);
			if(harvestFinished != 1){
				harvestFinished = harvestModule.ownHarvest(creep, 1);
				//console.log(harvestFinished);
            }
            if(harvestFinished != 1){
                creep.moveTo(Game.flags.CollectionPoint);
            }
	    }
	}
};

module.exports = roleBuilder;