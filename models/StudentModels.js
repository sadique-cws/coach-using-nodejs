var mongoose = require('mongoose')

var StudentModel = mongoose.Schema({
    name: {type:String,require:true},
    father_name : {type:String,require:true},
    contact : {type:Number,require:true},
    email : {type:String,require:true},
    address : {type:String,require:true},
    gender : {type:String,require:true},
    education : {type:String,require:false}
});


var student = mongoose.model("student",StudentModel)


module.exports  = student;