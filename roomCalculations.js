const roomControl = require("./roomControl");

module.exports = {

    checkForSpawn: function(room){ 
        return (room.find(FIND_MY_SPAWNS).length > 0);
    },

    checkForStorage: function(room){
        return (room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_STORAGE);
            }
        }).length > 0)
    },

    pathSourcesSpawn(roomName){
        var room = Game.rooms[roomName];
        var spawn = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN);
            }
        })[0].pos;
        //console.log(spawn[0].pos);
        let goals = _.map(room.find(FIND_SOURCES), function(source) {
            // We can't actually walk on sources-- set `range` to 1 
            // so we path next to it.
            return { pos: source.pos, range: 1 };
        });
        var ret = [];
        for(var i = 0; i < goals.length; i++){
            var onePath = (PathFinder.search(spawn, goals[i]).path);
            ret.push(onePath);
        }
        //console.log(ret);
        Memory[room.name].testPath = ret;
        //console.log(ret);
        for(var onePath in ret){
            for(var position in ret[onePath]){
                var created = ret[onePath][position].createConstructionSite(STRUCTURE_ROAD);
                //console.log(created);
            }
        }
    },

    createRoads: function(pathToUse){
        var ret;
        for(var i in pathToUse){
            ret = pathToUse[i].createConstructionSite(STRUCTURE_ROAD);
        }
        return ret;
    },


    calculateOutfit(room){
        
        var spawns = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN);
            }
        }).length;
        var extensions = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION);
            }
        }).length;

        var availableEnergy = (spawns*300 + extensions*50)-100;
        var moveParts = (availableEnergy/2)/50;
        var workParts = (availableEnergy/4)/100;
        var carryParts = (availableEnergy/4)/50;
        var retArr = [];
        for(var i= 0; i < moveParts; i++){
            retArr.push(MOVE);
        }
        for(var i = 0; i < workParts; i++){
            retArr.push(WORK);
        }
        for(var i = 0; i < carryParts; i++){
            retArr.push(CARRY);
        }
        //console.log(retArr)
        return retArr;
    },

};
