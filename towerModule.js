//TODO: Write tower behaviour
module.exports = {
    ownAttackHostiles: function() {
        var rooms = Game.rooms;
        for(var i in rooms){
            var roomName = rooms[i].name;
            var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES,  {filter: {structureType: STRUCTURE_TOWER}});
            var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
            for(var tower in towers) {
                towers[tower].attack(hostiles[0]);
                //console.log(tower[towers].pos);
            }
        }
    },

    ownHealAllies: function(){
        var rooms = Game.rooms; 
        for(var i in rooms){
            var roomName = rooms[i].name;
            var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES,  {filter: {structureType: STRUCTURE_TOWER}});
            var alliesToBeHealed = Game.rooms[roomName].find(FIND_MY_CREEPS, {
                filter: (ally) => {
                    return ally.hits < ally.hitsMax;
                }
            });
            for(var tower in towers){
                towers[tower].heal(alliesToBeHealed[0]);
            }
        }
    }
};