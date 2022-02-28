var mongoose = require('mongoose')

var AdminModel = mongoose.Schema({
    name: {type:String,require:true},
    email : {type:String,require:true},
    password : {type:String,require:true},
});


var admin = mongoose.model("admin",AdminModel)


module.exports  = admin;