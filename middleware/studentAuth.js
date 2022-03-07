studentModel = require("../models/StudentModels")

module.exports.isAuthorized = function(req,res,next){
    studentModel.findById(req.session.student_id).exec(function(error,admin){
        if(error){
            return next(error);
        }
        else{
            if(admin === null){
                 res.redirect("/student/login");
            }
            else{
                return next();
            }
        }
    })

}