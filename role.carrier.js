var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //own modules
        var harvestModule = require("harvestModule");
        var transferModule = require("transferModule");

        //set "working" status to true or false based on energy stored in the creep
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.store.getFreeCapacity() === 0) {
	        creep.memory.working = true;
	        creep.say('transfering');
	    }

        if(creep.memory.working) {
            //transfering stored energy to spawn or other structures
            var transferingFinished = transferModule.ownMineralTransfering(creep);
            //console.log(harvestFinished);
            transferingFinished = transferModule.ownTransfering(creep);

            if(transferingFinished != 1){
                creep.moveTo(Game.flags.CollectionPoint);
            }
        } else {
            //trying to harvest energy from container or Storage
            var harvestFinished = harvestModule.ownHarvest(creep, 0);
            if(harvestFinished != 1){
                harvestFinished = harvestModule.ownHarvestFromStorage(creep);
            }
            if(harvestFinished != 1){
                //moving to CollectionPoint if nothing to do
                creep.moveTo(Game.flags.CollectionPoint);
            }
        }
	}
};

module.exports = roleHarvester;