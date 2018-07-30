var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var leaveRecordSchema = new Schema({
    from: Date,
    to: Date,
    count: Number,
    reason:String,
    leaveType: String,
    status:String,
    user :{ type: Schema.Types.ObjectId, ref: 'employee' }
   
})

var employeeSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    leavebalance :String
  });

var employee = mongoose.model('employee', employeeSchema);

var leaveRecord = mongoose.model('leaveRecord', leaveRecordSchema);

module.exports={
    employee : employee,
    leave : leave,
    leaverecord : leaveRecord
};