/**
 * This is the module for controlling a room
 * This involves the creeps and tower, as well as other structures
 */

var roomControl = {
    
    /** @param {Roomname} roomName **/
    run: function(roomName) {

//
//  constants for the bodyparts of the creeps
        const BPNORMAL = [
            WORK, WORK,
            CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE
        ];
    
        const BPGENERAL = [
            WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
        ];
    
        const BPHARVESTER = [
            WORK, WORK, WORK, WORK, WORK, 
            MOVE, MOVE, MOVE
        ];
    
        const BPCARRIER = [
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
        ];
    
        const BPFIGHTER = [
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, 
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH
        ];
    
        const BPEMERGENCY = [
            MOVE, MOVE,
            WORK, WORK,
            CARRY, CARRY
        ];
    
        const BPCARRIEREMEGRENCY = [
            CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE
        ];

        const BPCLAIMER = [
            CLAIM, 
            MOVE, MOVE
        ];


//
// constants for how many creeps per role there should be in a room
        const WANTEDCARRIER = 3;
        const WANTEDSTATICHARVESTER = 2;
        const WANTEDUPGRADER = 3;
        const WANTEDBUILDER = 3;
        const WANTEDREPAIRER = 2;
        const WANTEDROADBUILDER = 0;
        const WANTEDEXTRACTOR = 0;
        const WANTEDFIGHTER = 1;
        const WANTEDEXPLORER = 0;
        const WANTEDCLAIMER = 0;

//
//  own modules
        var spawnControl = require("spawnControl");
        var roomCalculations = require('roomCalculations'); 
        var roleCarrier = require('role.carrier');
        var roleUpgrader = require('role.upgrader');
        var roleBuilder = require('role.builder');
        var roleRepairer = require("role.repairer");
        var roleStaticHarvester = require("role.staticHarvester");
        var towerModule = require("towerModule");


//
//  getting the object of the room to the given roomName
        var room = Game.rooms[roomName];
//
//  array with all the creeps in the room
        var myCreeps = room.find(FIND_MY_CREEPS);
//
//  hasSpawn is true when theres a spawn in the room, false if not
        var hasSpawn = roomCalculations.checkForSpawn(room);

//
//initializing memory objects
        if(!Memory[roomName]){
            console.log("Eintragen");
            Memory[roomName] = {};
            Memory[roomName].name = roomName;
            Memory[roomName].hasSpawn = hasSpawn;
            Memory[roomName].spawnQueue = [];
        } else {
            //console.log(Memory[roomName].name);
        }








//
//  filter creeps by role
        var carrier = _.filter(myCreeps, (creep) => creep.memory.role === 'carrier');
        var staticHarvester = _.filter(myCreeps, (creep) => creep.memory.role === "staticHarvester");
        var upgrader = _.filter(myCreeps, (creep) => creep.memory.role === 'upgrader');
        var builder = _.filter(myCreeps, (creep) => creep.memory.role === 'builder');
        var repairer = _.filter(myCreeps, (creep) => creep.memory.role === 'repairer');


//
//  MAIN LOOP (IMPORTANT!!!)



        //defines when and how many new creeps spawn
        //repairer have lowest priority
        //may be in its own module
        if(hasSpawn){

            //
            // finds spawns that are available to spawn creeps
            thisSpawn = room.find(FIND_MY_SPAWNS);
            var freeSpawn = thisSpawn[0];

            for(var j = 0; j < thisSpawn.length; j++){
                if(thisSpawn[j].spawning == null){
                    freeSpawn = thisSpawn[j];
                }
            }




            // if(Game.time % 1000 == 0){
            //     var testSpawned = spawnControl.spawnRoleCreep(freeSpawn, "test", [MOVE]);
            //     console.log(testSpawned + " " + Game.time);
            // }





// NOT FINISHED: 

            // var spawnQueueCounted = _.countBy(Memory[roomName].spawnQueue);

            // if  ( (spawnQueueCounted["carrier"]+carrier.length < WANTEDCARRIER && spawnQueueCounted["carrier"] != undefined)
            //     || (carrier.length < WANTEDCARRIER && spawnQueueCounted["carrier"] == undefined) ){
            //     Memory[roomName].spawnQueue.push("carrier");
            //     console.log("pushed carrier");
            // }

            // spawnQueueCounted = _.countBy(Memory[roomName].spawnQueue);

            // if(spawnQueueCounted["carrier"] > 0 && spawnQueueCounted["carrier"] != undefined){
            //     var spawned = spawnControl.spawnRoleCreep(freeSpawn, "carrier", BPCARRIER);
            //     console.log("Spawned one carrier: "+ spawned);
            //     if(spawned == 0){
            //         var index = Memory[roomName].spawnQueue.indexOf("carrier");
            //         Memory[roomName].spawnQueue.splice(index, 1);
            //     }
            // }
            // spawnQueueCounted = _.countBy(Memory[roomName].spawnQueue);
            // //console.log(spawnQueueCounted["carrier"]);

            // var spawningNow = [-1, -1, -1];
            // for(var i = 0; i < thisSpawn.length; i++){
            //     //console.log(thisSpawn[i].spawning);
            //     if(thisSpawn[i].spawning != null){
            //         spawningNow[i] = thisSpawn[i].spawning.name;
            //     } else {
            //         spawningNow[i] = -1;
            //     }
            // }
            // console.log(spawningNow);

            // spawnQueueCounted = _.countBy(Memory[roomName].spawnQueue);
            // var index = Memory[roomName].spawnQueue.indexOf("carrier");
            // Memory[roomName].spawnQueue.splice(index, 1);
            	

            if(carrier.length < 3) {
                spawnControl.spawnRoleCreep(freeSpawn, "carrier", roomCalculations.calculateOutfit(room));
            }

            // else if(staticHarvester.length < 2){
            //     var newName = "StaticHarvester" + 0;
            //     console.log("Trying to spawn StaticHarvester");
            //     if(Game.spawns[freeSpawn.name].spawnCreep(BPHARVESTER, newName, {memory: {role: "staticHarvester"}}) === ERR_NAME_EXISTS){
            //         newName = "StaticHarvester" + 1;
            //         Game.spawns[freeSpawn.name].spawnCreep(BPHARVESTER, newName, {memory: {role: "staticHarvester"}});
            //     }
            // }

            else if(upgrader.length < 3) {
                spawnControl.spawnRoleCreep(freeSpawn, "upgrader", roomCalculations.calculateOutfit(room));
            }

            else if(builder.length < 3) {
                spawnControl.spawnRoleCreep(freeSpawn, "builder", roomCalculations.calculateOutfit(room));
            }

            else if(repairer.length < 2) {
                spawnControl.spawnRoleCreep(freeSpawn, "repairer", roomCalculations.calculateOutfit(room));

            }


            //control towers
            towerModule.ownAttackHostiles();
            towerModule.ownHealAllies();


            //control creeps
            for(var name in myCreeps) {
                var creep = myCreeps[name];
                if(creep.memory.role === 'repairer') {
                    roleRepairer.run(creep);
                }
                if(creep.memory.role === "carrier") {
                    roleCarrier.run(creep);
                }
                if(creep.memory.role === 'upgrader') {
                    roleUpgrader.run(creep);
                }
                if (creep.memory.role === "builder") {
                    roleBuilder.run(creep);
                }
                if(creep.memory.role === "staticHarvester"){
                    roleStaticHarvester.run(creep);
                }
            }
        } else {
            //control creeps
            for(var name in myCreeps) {
                var creep = myCreeps[name];
                if(creep.memory.role === 'repairer') {
                    roleRepairer.run(creep);
                }
                if(creep.memory.role === "carrier") {
                    roleCarrier.run(creep);
                }
                if(creep.memory.role === 'upgrader') {
                    roleUpgrader.run(creep);
                }
                if (creep.memory.role === "builder") {
                    roleBuilder.run(creep);
                }
                if(creep.memory.role === "staticHarvester"){
                    roleStaticHarvester.run(creep);
                }
            }
        }


        // if(Game.time % 10 == 0){
        //     roomCalculations.pathSourcesSpawn(room);
        // }
        console.log(roomName + ": C:"+ carrier.length+ " SH:"+ staticHarvester.length+ " U:"+ upgrader.length+ " B:"+ builder.length+ " R:"+repairer.length);
        //console.log("\n");
        
        /*
        console.log('Carrier: ' + carrier.length + "/3");
        console.log("StaticHarvester: " + staticHarvester.length + "/2");
        console.log('Upgrader: ' + upgrader.length + "/3");
        console.log('Builder: ' + builder.length + "/3");
        console.log('Repairer: ' + repairer.length + "/1");
        console.log("Fighter:" + fighter.length + "/1");
        console.log("Claimer: " + claimer.length + "/1");
        */
        //console.log('Roadbuilder: ' + roadbuilder.length + "/0");
        //console.log("Extractor: " + extractor.length + "/0");
        //console.log("Explorer: "+ explorer.length + "/0");
    }
};

module.exports = roomControl;