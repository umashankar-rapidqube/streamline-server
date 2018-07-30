const mongoose = require('mongoose');
const config = require('../config');
var model = require('../model/model');
var ObjectId = mongoose.Types.ObjectId;

mongoose.connect(config.databaseUri);

module.exports = {
    saveleave : saveleave
}

function saveleave(userid, leaverecord){

  model.employee.find({'email' : 'umashankar.somasekar@rapidqube.com'}).then((resultSet)=>{
    console.log(JSON.stringify(resultSet))
  }).catch((error)=>{
      console.log(error)
  }) 
    
}

function saveuser(userInfo){
    var newUser = new model.employee(userInfo);

    newUser.save()
}

function addLeaveRecord(){
    var newLeave = new model.leaverecord();

    newLeave.from = new Date('01.02.2012');
    newLeave.to = new Date('02.02.2012');
    newLeave.reason = "sick leave";
    newLeave.leaveType = "E";
    newLeave.count = 1;
    
    newLeave.save().then((data)=>{
        console.log(data);

    })
}

function updateLeaveInfo(userid, leaveid){

   
    

    model.leave.findOne({'user':ObjectId('5b5ad13fb671cd3aa0f6e473')}).then((leaveObj)=>{

        console.log(leaveObj)
        var leaveRecords = leaveObj.leaves;
        if (leaveRecords === undefined){
            leaveRecords = [];
        }
        leaveRecords.splice(1,1);
        leaveObj.set({'leaves':leaveRecords});
        leaveObj.save().then((updatedleaveObj)=>{
            console.log(updatedleaveObj);
        });

    })

    //newLeave.findOneAndUpdate({'user':'5b5ad380eb41a308207f1bb1'},{new: true},  )

    
}

//updateLeaveInfo(null,null);
