module.exports = {

    /**
     * 
     * @param {Spawn} spawnToUse Spawn to use 
     * @param {String} roleToHave string which determines the role of the creep to be spawned
     * @param {Array} BP Array with the bodyparts of the creep to be spawned
     */
    spawnRoleCreep: function(spawnToUse, roleToHave, BP){
        var newName = roleToHave + Game.time;
        console.log('Trying to spawn new '+ roleToHave+ " : " + newName);
        var spawned = Game.spawns[spawnToUse.name].spawnCreep(BP, newName,
            {memory: {role: roleToHave}});
        //console.log(spawned);
        return spawned;
    },

    checkIfInQueue: function(roleToCheck){

    }
}