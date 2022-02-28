var studentModel = require("../models/StudentModels");
var AdminModel = require("../models/AdminModels");



async function DashboardView(req,res){
    // req.session.user_id = "12345";
    console.log(req.session.user_id)
    const students = await studentModel.countDocuments();
    res.render("admin/dashboard",{"students": students});
}

function ManageStudent(req,res){
   studentModel.find({status:2},(error, response) => {
        res.render("admin/manageStudent", {'students': response});
    });
}
function ViewStudent(req,res){
    var id = req.params.id;
   studentModel.findOne({_id: id},(error, response) => {
        res.render("admin/viewStudent", {'student': response});
    });
}
function NewAdmission(req,res){
   studentModel.find({status:1},(error, response) => {
        res.render("admin/manageStudent", {'students': response});
    });
}
async function ApproveStudent(req,res){
    id = req.params.id;
    await studentModel.findOneAndUpdate({"_id": id},{status:2})
    res.redirect("/admin/manage-students");
}

// admin insertion work

function InsertAdmin(req,res){
    var admin = new AdminModel({
        name: "admin",
        email : "admin@gmail.com",
        password : "1234"
    });

    admin.save();
}
module.exports = {
    DashboardView,
    ManageStudent,
    NewAdmission,
    ViewStudent,
    ApproveStudent,
    InsertAdmin,
}