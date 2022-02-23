var express  = require("express")
var router = express.Router();
var {InsertStudent} = require("../controllers/StudentController");


router.get("/",(req,res) => {
    res.render("home");
})

router.get("/apply",(req,res) => {
    res.render("applyStudent");
})

router.post("/apply",InsertStudent);


module.exports = router;