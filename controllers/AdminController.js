var studentModel = require("../models/StudentModels");
var AdminModel = require("../models/AdminModels");
var CourseModel = require("../models/CourseModels");
var PaymentModels = require("../models/PaymentModels");
const { response } = require("express");
const res = require("express/lib/response");



async function DashboardView(req,res){
    const students = await studentModel.countDocuments();
    const courses = await CourseModel.countDocuments();
    const requestedPayment = await PaymentModels.find({status:-1}).populate("stdId").populate("courseId");
    const NewAdmission = await studentModel.find({status:1}).countDocuments();

    res.render("admin/dashboard",{
        "students": students,
        "courses":courses,
        "newAdmission":NewAdmission,
        "requestedPayment":requestedPayment});
}

function approvePayment(req,res){
    pay_id = req.params.p_id;
    PaymentModels.updateOne({_id:pay_id},{status:1},(error, response)=>{
        if(error) {console.log(error)};
        return res.redirect("/admin/dashboard");
    })    
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

 checkAdminLogin = async (req,res) => {
    
     try{
         const {email, password} = req.body;
         const checkData = await AdminModel.findOne({email:email});
         if(checkData != null){
             if(checkData.email == email && checkData.password == password){
                req.session.user_id = checkData._id;
                console.log("this is testing: " + req.session.user_id)
                res.redirect("/admin/dashboard");     
             }
         }
        else{
            var err = new Error("Username or password in incorrect try again")
            err.status = 401;
            res.redirect("/admin/login");
        }
    }
    catch(error){
        console.log(error);
    }
};
    
function logout(req,res){
    req.session.destroy();
    res.redirect("/admin/login");
}

module.exports = {
    DashboardView,
    ManageStudent,
    NewAdmission,
    ViewStudent,
    ApproveStudent,
    InsertAdmin,
    checkAdminLogin,
    logout,
    approvePayment,
}