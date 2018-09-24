const mongoose = require('mongoose');
const config = require('../config');
var model = require('../model/model');
var ObjectId = mongoose.Types.ObjectId;
var mongodb = require('../db/ideaboxDao');
var dateFormat = require('dateformat')


mongoose.connect(config.databaseUri, { useNewUrlParser: true });

module.exports = {
    saveideas: saveideas,
    getAllIdeas:getAllIdeas,
    saveidealikes:saveidealikes,
    saveideacomments:saveideacomments,
    getLC:getLC

}
function saveideas(ideaRecordJson){
    return new Promise(async (resolve,reject)=>{
        var responseObj = {};
    
        var user = mongodb.saveIdeas(ideaRecordJson).then((data)=>{
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
    
        
        
    })
}




function getAllIdeas(userid){
    return new Promise(async (resolve,reject)=>{
        var responseObj = {};

        mongodb.getAllIdeas().then((data)=>{
            
            responseObj.data = [];
            responseObj.ideas = data;
            responseObj.errors = [];
            responseObj.meta={};

            resolve(responseObj);
        }).catch((error)=>{
            responseObj.data = [];
            responseObj.errors = [error];
            responseObj.meta={};
        });
    
        
    })
}
function getLC(userid){
    return new Promise(async (resolve,reject)=>{
        var responseObj = {};

        mongodb.getLC(userid).then((data)=>{
            
            responseObj.data = [];
            responseObj.ideas = data;
            responseObj.errors = [];
            responseObj.meta={};

            resolve(responseObj);
        }).catch((error)=>{
            responseObj.data = [];
            responseObj.errors = [error];
            responseObj.meta={};
        });
    
        
    })
}

function saveidealikes(ideaRecordJson){
    return new Promise(async (resolve,reject)=>{
        var responseObj = {};
    console.log(ideaRecordJson)
        var user = mongodb.saveIdealikes(ideaRecordJson).then((data)=>{
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
    
        
        
    })
}
function saveideacomments(ideaRecordJson){
    return new Promise(async (resolve,reject)=>{
        var responseObj = {};
    console.log(ideaRecordJson)
        var user = mongodb.saveIdeacomments(ideaRecordJson).then((data)=>{
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
    
        
        
    })
}
