var express  = require("express")
var router = express.Router();
var {InsertStudent} = require("../controllers/StudentController");
var {InsertCourseForm, InsertCourseCategory,InsertCourse} = require("../controllers/CourseController");
var {DashboardView, ManageStudent, NewAdmission, ViewStudent, ApproveStudent, InsertAdmin, checkAdminLogin} = require("../controllers/AdminController");
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
router.get("/admin/new-admission",auth.isAuthorized,NewAdmission);
router.get("/admin/approve-student/:id",auth.isAuthorized,ApproveStudent)
router.get("/admin/insert-course",auth.isAuthorized,InsertCourseForm)
router.post("/admin/insert-course-category",auth.isAuthorized,InsertCourseCategory)
router.post("/admin/insert-course",auth.isAuthorized,InsertCourse)
router.get("/admin/register",auth.isAuthorized,InsertAdmin)
router.get("/admin/login", (req,res) => res.render("login"));
router.post("/admin/login", checkAdminLogin);


module.exports = router;
