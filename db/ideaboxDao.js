
const mongoose = require('mongoose');
const config = require('../config');
var model = require('../model/model');
var dateFormat = require('dateformat')
var ObjectId = mongoose.Types.ObjectId;
var uniqid = require('uniqid');
mongoose.connect(config.databaseUri, { useNewUrlParser: true });

module.exports = {
    getAllIdeas:getAllIdeas,
    saveIdeas : saveIdeas,
    saveIdealikes:saveIdealikes,
    saveIdeacomments:saveIdeacomments,
    getLC:getLC
}

function saveIdeas(ideaRecordJson){
var newIdeas = new model.ideabox();
console.log("ideas",newIdeas)
return new Promise((resolve, reject)=>{
    try{
        newIdeas.title = ideaRecordJson.title;
        console.log(newIdeas.title)
        newIdeas.domain = ideaRecordJson.domain;
        console.log(newIdeas.domain)
        newIdeas.suggestions = ideaRecordJson.suggestions;
        console.log(newIdeas.suggestions)
        newIdeas.description = ideaRecordJson.description;
        console.log(newIdeas.description)
        newIdeas.email = ideaRecordJson.email;
        console.log(newIdeas.email)
        created_at = new Date()
        console.log(created_at)
        newIdeas.created_at =dateFormat(created_at,"dd-mm-yyyy HH:mm:ss")
        console.log( newIdeas.created_at )
        console.log("from=hjjjk===>",);
        newIdeas.user = ObjectId(ideaRecordJson.user);
        console.log(newIdeas.user)
        newIdeas.uniqueid =uniqid();
        console.log(newIdeas.user)


        newIdeas.save();
        return resolve(newIdeas);
    }catch(error){
        return reject(error)
    }

   

})
}
function getAllIdeas(userid){
    var IdeaRecords = []
    return new Promise((resolve, reject)=>{
        model.ideabox.find().sort({created_at: -1}).then((resultset)=>{
            console.log("result",resultset)
            for(var index in resultset){
                var IdeaRecord = {}
                var item = resultset[index];

                IdeaRecord.title = item.title;
                IdeaRecord.domain = item.domain;
                IdeaRecord.description = item.description;
                IdeaRecord.email = item.email;
                IdeaRecord.created_at = item.created_at;
                IdeaRecord.suggestions = item.suggestions;

                IdeaRecords.push(IdeaRecord);

                resolve(IdeaRecords);
                
            }
            
        }).catch((error)=>{
            reject(error);
        })
    })
    
}
function getLC(userid){
    var uniqueid = userid.userid
    console.log(uniqueid)
    var IdeaRecords = []
    return new Promise((resolve, reject)=>{
        model.ideabox.find({'uniqueid':uniqueid}).then((resultset)=>{
            console.log("result",resultset)
            for(var index in resultset){
                var IdeaRecord = {}
                var item = resultset[index];

                IdeaRecord.likes = item.likes;
                IdeaRecord.comments = item.comments;
            

                IdeaRecords.push(IdeaRecord);

                resolve(IdeaRecords);
                
            }
            
        }).catch((error)=>{
            reject(error);
        })
    })
    
}
function saveIdealikes(ideaRecordJson){
    // var newIdeas = new model.ideabox();
  
    // console.log("ideas",newIdeas)
    return new Promise((resolve, reject)=>{
        try{
            var idea = ideaRecordJson
            console.log("idea",idea)

           var id = idea.userid
           console.log("idea",id)
          
        model.ideabox.findOneAndUpdate({
            uniqueid:id,
            // url:url
            
           
        }, {
            $inc: {
                likes:1
            }
        }).then((result)=>{
            console.log("end")
            return resolve(result);
        })}catch(error){
            console.log("end",error)
            return reject(error)
        }
    
       
    
    })
    }
    function saveIdeacomments(ideaRecordJson){
        // var newIdeas = new model.ideabox();
      
        // console.log("ideas",newIdeas)
        return new Promise((resolve, reject)=>{
            try{
                var idea = ideaRecordJson
                console.log("idea",idea)
    
               var comment = idea.comment
               console.log("idea",comment)
               var id =idea.ID
              
            model.ideabox.findOneAndUpdate({
                user:id,
                // url:url
                
               
            }, {
                $set: {
                    comments:comment
                }
            }).then((result)=>{
                console.log("end")
                return resolve(result);
            })}catch(error){
                console.log("end",error)
                return reject(error)
            }
        
           
        
        })
        }