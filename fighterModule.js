var fighterModule = {

    ownAttackHostiles: function(creep){
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                return 1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    },

    ownHealAllies: function(creep){
        const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if(target) {
            if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                return 1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    }
};
module.exports = fighterModule;