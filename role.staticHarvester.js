var roleStaticHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //own modules
        var harvestModule = require("harvestModule");

        //determines which source the creep goes to
        var targetNumber = creep.name[creep.name.length-1];
        //console.log(targetNumber);
        var harvestFinished = harvestModule.ownHarvest(creep, targetNumber);
        //console.log(harvestFinished);
	}
};

module.exports = roleStaticHarvester;