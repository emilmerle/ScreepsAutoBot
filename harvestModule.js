module.exports = {

    /**
     * function to harvest energy from source in the room the creep is in
     * 
     * @param {Object} creep creep that should harvest energy
     * @param {Number} targetNumber index of source the creep should go to
     * @returns {Number} 1 if harvestable energy is found in the room, -1 else
     */

    ownHarvest: function(creep, targetNumber) {
        var source = creep.room.find(FIND_SOURCES);
        //adjusts the targetSource variable if the targetNumber was too high
        var targetSource = (source.length-1 < targetNumber) ? source.length-1 : targetNumber;
        //console.log(targetSource);
        

        if(source.length) {
            if(creep.harvest(source[targetSource]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source[targetSource]);
                return 1;
            } else if(creep.harvest(source[targetSource]) === ERR_NOT_ENOUGH_RESOURCES){
                return -1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    },

    /**
     * function for withdrawing energy from a container (e.g. if a source is empty)
     * 
     * @param {Object} creep creep that should withdraw from a container
     * @returns {Number} 1 if successfully withdrawn, -1 else
     */
    ownHarvestFromContainer: function(creep) {
        //finding containers in the room
        var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_CONTAINER)
                    && structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity();
            }
        });

        if (source) {
            if(creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
                return 1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    },

    /**
     * function for withdrawing energy from a storage (e.g. if a source is empty)
     * 
     * @param {Object} creep creep that should withdraw from a storage
     * @returns {Number} 1 if successfully withdrawn, -1 else
     */
    ownHarvestFromStorage: function(creep){
        //finding storage in the room
        var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_STORAGE)
                    && structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity();
            }
        });

        if(source) {
            if(creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
                return 1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    },

    /**
     * Function for finding dropped resources that the creep is in
     * @param {Object} creep Creep that should find dropped resources
     * @returns {Number} 1 if found dropped resources, -1 else
     */
    ownFindDroppedEnergy: function(creep){
        var source = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
            filter: (resource) => {
                return (resource.resourceType === RESOURCE_ENERGY);
            }
        });
        
        if(source) {
            if(creep.pickup(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
                return 1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    },

    /**
     * function for harvesting a mineral,
     * needs an extractor at the mineral source
     * 
     * @param {Object} creep creep that should harvest a mineral
     * @returns {Number} 1 if successfully harvested, -1 else
     */
    ownExtract: function(creep){
        var source = creep.pos.findClosestByRange(FIND_MINERALS);
        if(source) {
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
                return 1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    },

    /**
     * function for finding tombstones and withdraw the energy from it
     * @param {Object} creep creep that should loot the tombstone
     * @returns {Number} 1 if succesfull, -1 else
     */
    ownLootTombstones: function(creep) {
        var source = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
            filter: (structure) => {
                return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        
        if(source) {
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
                return 1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    }
};

