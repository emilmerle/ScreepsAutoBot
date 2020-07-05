module.exports = {
    /**
     * building function for building the construction sites in the room it is in
     * 
     * @param {Object} creep creep that should build something
     * @returns {Number} 1 if there are construction sites to build, -1 else
     */
    ownBuilding: function(creep) {
        var buildingTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (buildingTargets.length) {
            if (creep.build(buildingTargets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(buildingTargets[0]);
                return 1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    },

    ownRoadBuilding: function(creep){
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD);
            }
        });
        if (targets.length) {
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                return 1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    },


    /**
     * repairing function to repair structures that have less than max Hits in the room it is in
     * 
     * @param {Object} creep creep that should repair something
     * @returns {Number} 1 if there are structures to repair, -1 else
     */
    ownRepairing: function(creep) {
        var repairingTargets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_ROAD) && structure.hits < structure.hitsMax);
            }
        });
        
        if(repairingTargets.length == 0){
            repairingTargets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType != STRUCTURE_WALL) && structure.hits < structure.hitsMax);
            }
            });
        }
        if (repairingTargets.length) {
            if (creep.repair(repairingTargets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(repairingTargets[0]);
                return 1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    },

    /**
     * function for upgradig the own controller in the room the creep is in
     * 
     * @param {Object} creep creep that should upgrade
     * @returns {Number} always 1, because upgrading should always be possible
     */
    ownUpgrading: function(creep) {
        if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
            return 1;
        } else {
            return 1;
        }
    }
};

