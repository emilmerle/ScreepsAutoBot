var roomControl = require("roomControl");
const roomCalculations = require("./roomCalculations");

module.exports.loop = function () {

    //console logs:
    console.log('\n');
    console.log("CPU used: " + Math.floor(Game.cpu.getUsed() * 100)/100);

    //run all rooms (important!)
    var myRooms = Game.rooms;
    for(var i in myRooms){
        roomControl.run(i);
        roomCalculations.pathSourcesSpawn(i);
            
    }
    
    //Clearing memory of dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}