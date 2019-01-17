var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var leaverecordSchema = new Schema({
    from: Date,
    to: Date,
    count: Number,
    reason:String,
    leaveType: String,
    status:String,
    email:String,
    remainingleaves:Number,
   // user :{ type: Schema.Types.ObjectId, ref: 'employee' }
   user : String
   
})

var employeeregistrationSchema = new Schema({

    employmail:String,
    managermail:String,
    Balanceleave:Number,
    month:Number,
    lop:Number
});

var employeeSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    month:Number,
    leavebalance :String
  });

  var ideaboxschema = new Schema({
      title: String,
      domain: String,
      description: String,
      email: String,
      created_at: String,
      suggestions: String,
      uniqueid:String,
      likes: Number,
      comments: String,
      user: { type: Schema.Types.ObjectId, ref: 'employee' },
      

  })

var employee = mongoose.model('employee', employeeSchema);

var leaverecord = mongoose.model('leaverecord', leaverecordSchema);
var employeeregistration = mongoose.model('employeeregistration', employeeregistrationSchema); 


var ideabox = mongoose.model('ideabox', ideaboxschema);

module.exports={
    employee : employee,
    leaverecord : leaverecord,
    employeeregistration:employeeregistration,
    ideabox: ideabox
};