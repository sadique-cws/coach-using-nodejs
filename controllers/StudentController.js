var studentModel = require("../models/StudentModels");


function dashboard(req,res){
    return res.render("students/dashboard")
}   

function addStudentCourse(){
    // pending works
}

checkLogin = async (req,res) => {
    
    try{
        const {email, password} = req.body;
        const checkData = await studentModel.findOne({email:email});
        if(checkData != null){
            if(checkData.email == email && checkData.password == password){
               req.session.student_id = checkData._id;
               console.log("this is testing for student: " + req.session.student_id)
               res.redirect("/student/dashboard");     
            }
        }
       else{
           var err = new Error("Username or password in incorrect try again")
           err.status = 401;
           res.redirect("/student/login");
       }
   }
   catch(error){
       console.log(error);
   }
};


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
    res.redirect("/apply");
}

module.exports = {
    InsertStudent,
    addStudentCourse,
    checkLogin,
    dashboard,
}