var studentModel = require("../models/StudentModels");


function InsertStudent(req,res){
    var stud = new studentModel({
        name: req.body.name,
        email : req.body.email,
        contact : req.body.contact,
        address : req.body.address,
        gender : req.body.gender,
        education : req.body.education,
        father_name : req.body.father_name,
        password : req.body.password
    });

    stud.save();
}

module.exports = {
    InsertStudent,
}