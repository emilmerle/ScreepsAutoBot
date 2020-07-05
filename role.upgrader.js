var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //own harvest function
        var harvestModule = require("harvestModule");
        var buildingModule = require("buildingModule");

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            buildingModule.ownUpgrading(creep);
        }
        else {
            var harvestFinished = harvestModule.ownHarvest(creep, 1);
            if(harvestFinished != 1){
                creep.moveTo(Game.flags.CollectionPoint);
            }
        }
	}
};

module.exports = roleUpgrader;