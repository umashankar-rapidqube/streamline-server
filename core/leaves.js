var model = require('../model/model');
var mongodb = require('../db/leavesDao');

module.exports = {
    getAllLeaves : getAllLeaves,
    saveLeave : saveLeave
}

function getAllLeaves(userid){
    return new Promise(async (resolve,reject)=>{
        var responseObj = {};

        mongodb.getAllLeaves(userid).then((data)=>{
            
            responseObj.data = [];
            responseObj.leave = data;
            responseObj.errors = [];
            responseObj.meta={};

            resolve(responseObj);
        }).catch((error)=>{
            responseObj.data = [];
            responseObj.errors = [error];
            responseObj.meta={};
        });
    
        
    })}

function saveLeave(leaveRecord){
// console.log(leaveRecord,"leaveecord")
        return new Promise(async (resolve,reject)=>{
            var responseObj = {};
        
            var user = mongodb.saveleave(leaveRecord).then((data)=>{
            console.log(user,"user")
                responseObj.data = data;
                responseObj.errors = [];
                responseObj.meta={};
    
                resolve(responseObj);
            }).catch((error)=>{
                responseObj.data = [];
                responseObj.errors = [error];
                responseObj.meta={};
            });
        
            
            
        })}


 





