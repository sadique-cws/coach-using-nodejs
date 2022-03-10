var express  = require("express")
var router = express.Router();
var {InsertStudent, checkLogin, dashboard, manageStudentCourse, addStudentCourse, addStudentCourseStore} = require("../controllers/StudentController");
var {InsertCourseForm, InsertCourseCategory,InsertCourse, ManageCourses} = require("../controllers/CourseController");
var {DashboardView, ManageStudent, NewAdmission, ViewStudent, ApproveStudent, InsertAdmin, checkAdminLogin, logout} = require("../controllers/AdminController");
const { route } = require("express/lib/application");
var auth = require("../middleware/auth");

router.get("/",(req,res) => {
    res.render("home");
})

router.get("/apply",(req,res) => {
    res.render("applyStudent");
})

router.post("/apply",InsertStudent);


// admin routes 
router.get("/admin/dashboard",auth.isAuthorized,DashboardView);
router.get("/admin/student/:id/view/",auth.isAuthorized,ViewStudent);
router.get("/admin/manage-students",auth.isAuthorized,ManageStudent);
router.get("/admin/manage-courses",auth.isAuthorized,ManageCourses);
router.get("/admin/new-admission",auth.isAuthorized,NewAdmission);
router.get("/admin/approve-student/:id",auth.isAuthorized,ApproveStudent)
router.get("/admin/insert-course",auth.isAuthorized,InsertCourseForm)
router.post("/admin/insert-course-category",auth.isAuthorized,InsertCourseCategory)
router.post("/admin/insert-course",auth.isAuthorized,InsertCourse)
router.get("/admin/register",auth.isAuthorized,InsertAdmin)
router.get("/admin/login", (req,res) => {
    if(req.session.user_id){
        return res.redirect("/admin/dashboard");
    }
    res.render("login")
});
router.post("/admin/login", checkAdminLogin);
router.get("/admin/logout", logout);


//student routes 
router.get("/student/dashboard",auth.isStudentAuthorized,dashboard);
router.get("/student/course/manage",auth.isStudentAuthorized,manageStudentCourse);
router.get("/student/course/add",auth.isStudentAuthorized,addStudentCourse);
router.post("/student/course/add",auth.isStudentAuthorized,addStudentCourseStore);
router.post("/student/login",checkLogin);



module.exports = router;
