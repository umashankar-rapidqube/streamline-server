const mongoose = require('mongoose');
const config = require('../config');
var model = require('../model/model');
var ObjectId = mongoose.Types.ObjectId;


module.exports = {
    findbyMail : findbyMail
}

 async function findbyMail(email){
    return new Promise(async(resolve, reject)=>{
    var resultset = await model.employee.findOne({email:email})
        console.log(resultset)
        if(resultset===null){
            var saveResult = await saveEmployee(email);
            resolve(saveResult)
        }
        else{
            resolve(resultset)
        }
    
    })
    
}


async function saveEmployee(email){
    return new Promise(async (resolve, reject)=>{
        var employee = new model.employee();
        employee.email = email;
        var data = await employee.save()
        console.log(data)
        resolve(data)
    })
}