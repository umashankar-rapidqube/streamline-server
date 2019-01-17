

const mongoose = require('mongoose');
const config = require('../config');
var model = require('../model/model');
var DateDiff = require('date-diff');


var ObjectId = mongoose.Types.ObjectId;

mongoose.connect(config.databaseUri, { useNewUrlParser: true });

module.exports = {
    getAllLeaves : getAllLeaves,
    saveleave : saveleave,
    updateLeave : updateLeave,
   update:update,
   register:register

}

function saveleave(leaveRecordJson){
    var newLeave = new model.leaverecord();
    console.log("from====>",leaveRecordJson.selectedRange.start);
    console.log("end====>",leaveRecordJson.selectedRange.end);
    console.log("reason====>", leaveRecordJson.reason);
    console.log("leavetype====>", leaveRecordJson.leaveType);

    return new Promise((resolve, reject)=>{
        try{
            newLeave.from = (leaveRecordJson.selectedRange.start)
            newLeave.from.setDate(newLeave.from.getDate() + 1);
            newLeave.to = (leaveRecordJson.selectedRange.end)
            newLeave.to.setDate(newLeave.to.getDate() + 1);
            newLeave.reason = leaveRecordJson.reason;
            newLeave.leaveType = leaveRecordJson.leaveType;
            newLeave.count = leaveRecordJson.count;
            newLeave.status = leaveRecordJson.status;
              newLeave.user = leaveRecordJson.user;
            // newLeave.email = leaveRecordJson.email;
         
            

            newLeave.save();
            //console.log("newleave",newleave);
            return resolve(newLeave);
        }catch(error){
            return reject(error)
        }
        

       

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

 function updateLeave(leaveRecord){
    return new Promise(async(resolve, reject)=>{

   
    console.log("leaveRecord",leaveRecord.user);
    console.log("leaveRecord",leaveRecord.status);
    var from=leaveRecord.start;
    var to=leaveRecord.end;
       console.log("hkjfhdkhf",from);
       var str=from.substring(0,10);
       console.log("str",str);
       var str1=to.substring(0,10);
       console.log("str1",str1);

           var halfday = 0;
    if(halfday){
     halfday = 0.5
    }
    else
    var date1 = new Date(str);
    console.log("from",date1)
  var date2 = new Date(str1);

 var timeDiff = Math.abs(date2.getTime() - date1.getTime());
 var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))+halfday; 
console.log("diffdays",diffDays);

    
    model.employeeregistration.find({'employmail':leaveRecord.user}).then((result) =>{

        console.log("registration", result);

        var month = result[0].month;
        //console.log("month",month);
        var Balanceleave = result[0].Balanceleave - diffDays;
        var lop = result[0].lop

        console.log("month :", month);

       
        if(Balanceleave < 0){
            lop = (Balanceleave - lop);
            console.log("lop",lop)
        }

        var currentMonth = new Date().getMonth() + 1;
        console.log("currentmonth",currentMonth)

        if(month != currentMonth){

            if(month > currentMonth){
                month = 0;
            }
            Balanceleave = currentMonth - month + Balanceleave;
            month = currentMonth ;
            console.log("updatemonth", month)
        }

        if(Balanceleave < 0){
            Balanceleave = 0;
            console.log("Balanceleave",Balanceleave)
        }
                                                                                                                
        model.employeeregistration.findOneAndUpdate({"employmail":leaveRecord.user}, { $set: {"Balanceleave" : Balanceleave, "month":month,"lop":lop}}).then((doc) =>{

            console.log("updated_data", doc);
            return resolve({
            "data":doc
            })
        })
        .error((err) =>{
            console.log("err", err);
        });




    })
    .catch((err) =>{

    });
    //model.employRegistaion.findOneAndUpdate({'user':leaveRecord.user}, { $set: { "Balance_leave" : leaveRecord.status}})


        try{
            //find last leave
            // var leave_count = 0;
            // model.leaverecord.find({'user':leaveRecord.user, 'status':'Approved'}).sort({_id:-1}).limit(1).then((doc) =>{
            //     console.log("limit",doc[0]);
            //     leave_count = doc[0].count + 1;
               
            //     console.log("get leave", leave_count);
           

               // leave_count = 1200;
   
            model.leaverecord.findOneAndUpdate({ $and:[{'user':leaveRecord.user}, {"from":leaveRecord.start}]},{ $set: { "status" : leaveRecord.status}}).then((result1)=>{
         //  model.leaverecord.find({ $and:[{'user':leaveRecord.user}, {"from":leaveRecord.start}]}).then((result)=>{ 
            console.log("===",leaveRecord.user, leaveRecord.start);  
            console.log("qqqq", result1)
                //return resolve (result1._doc.user);
            })

        // })
        // .catch((err) =>{
        //     console.log("lomit error", err);
        // });

          

        }catch(error){
            return reject(error)
    
           }

    })


    //newLeave.findOneAndUpdate({'user':'5b5ad380eb41a308207f1bb1'},{new: true},  )

    
}


function update(input){
    console.log("INPUT")
    var employeeregistration=input;
    console.log("employeeregistration",employeeregistration)
    return new Promise(async(resolve, reject)=>{
        console.log(email.managermail)

         model.employeeregistration.find({"managermail":employeeregistration.managermail}).count().then((result) =>{
        
            console.log("registration", result);
            return resolve (result);

        })

   
    })

    
}

async function register(input) {
    

    return new Promise(async(resolve, reject)=>{
        let value = input;
     
         
          var month=new Date().getMonth() + 1;
          var Balanceleave=1;
          var lop=0;
        //   var currentMonth = new Date().getMonth() + 1;
console.log("hiiii",value.managermail)
        var data= new model.employeeregistration(
            { 
            "employmail":value.employmail,
            "managermail":value.managermail,
            "month":month,
            "Balanceleave":Balanceleave,
            "lop":lop,
            currentMonth: new Date().getMonth()+1

        })
        await data.save().then((result) =>{
            console.log("registration", result);
            return resolve (result);

        })


        //  model.employeeregistration.find({"managermail":employeeregistration.managermail}).count().then((result) =>{
        
            // console.log("registration", result);
            // return resolve (result);

        // })

   
    })

    
}







function getAllLeaves(userid){
    var leaveRecords = []
    return new Promise((resolve, reject)=>{
        console.log("mail",userid)
        if(userid == undefined){
            model.leaverecord.find({'user':userid}).then((resultset)=>{
                console.log("result114",resultset)
                for(var index in resultset){
                    var leaveRecord = {}
                    var item = resultset[index];
    
                    leaveRecord.from = item.from;
                    leaveRecord.to = item.to;
                    leaveRecord.reason = item.reason;
                    leaveRecord.id = item.user;
                    leaveRecord.count = item.count;
                    leaveRecord.status = item.status
                  

    
                    leaveRecords.push(leaveRecord);
    
                    resolve(leaveRecords);
                    
                }
                
            }).catch((error)=>{
                reject(error);
            })

        }else{
            model.leaverecord.find({'user':userid}).then((resultset)=>{
                console.log("result115",userid)
                for(var index in resultset){
                    var leaveRecord = {}
                    var item = resultset[index];
    
                    leaveRecord.from = item.from;
                    leaveRecord.to = item.to;
                    leaveRecord.reason = item.reason;
                    leaveRecord.id = item._id;
                    leaveRecord.status = item.status;
                    leaveRecord.count = item.count;
                    leaveRecord.remainingleaves = item.remainingleaves
    
                    leaveRecords.push(leaveRecord);
    
                    resolve(leaveRecords);
                    
                }
                
            }).catch((error)=>{
                reject(error);
            })

        }
        
    })
    
}


//updateLeaveInfo(null,null);
