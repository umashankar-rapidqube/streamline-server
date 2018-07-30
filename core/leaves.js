var model = require('../model/model');
var mongodb = require('../db/mongodb');

module.exports = {
    getAllLeaves : getAllLeaves,
    saveLeave : saveLeave
}

function getAllLeaves(user){
    return new Promise(async (resolve,reject)=>{
        
        
        
    })}

function saveLeave(useid, leaves, leaveRecord){
        return new Promise(async (resolve,reject)=>{
            
            var user = mongodb.findleaveObj(useid);
            
            
        })}


 





