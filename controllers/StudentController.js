const res = require("express/lib/response");
const courseModel = require("../models/CourseModels");
const studentCourse = require("../models/StudentCourseModels");
var studentModel = require("../models/StudentModels");


function dashboard(req,res){
    studentModel.findById(req.session.student_id,(error, response) => {
        return res.render("students/dashboard",{"student":response})
    });
}   

async function addStudentCourse(req,res){
    var log = req.session.student_id;
    std = await studentModel.findById(log);
    courseData = await courseModel.find({});
    return res.render("students/addCourse",{"student":std,"course":courseData});
}



async function addStudentCourseStore(req,res){
    var log = req.session.student_id;
    std = await studentModel.findById(log);
    var currentDate = new Date();
    var stdCourse = studentCourse({
        studentId:std._id,
        courseId:req.body.courseId,
        doj : currentDate,
        status : 1
    });

    stdCourse.save();
    res.redirect("/student/course/manage");
}

async function manageStudentCourse(req,res){
    var log = req.session.student_id;
    std = await studentModel.findById(log);
    stdCourse = await studentCourse.find({studentId:log}).populate("courseId");
    res.render("students/manageCourse",{'student':std,"studentCourse":stdCourse})
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
    manageStudentCourse,
    addStudentCourseStore,
}