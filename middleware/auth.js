AdminModel = require("../models/AdminModels")
studentModel = require("../models/StudentModels")

function isAuthorized(req,res,next){
    AdminModel.findById(req.session.user_id).exec(function(error,admin){
        if(error){
            return next(error);
        }
        else{
            if(admin === null){
                 res.redirect("/admin/login");
            }
            else{
                return next();
            }
        }
    })

}

function isStudentAuthorized(req,res,next){
    studentModel.findById(req.session.student_id).exec(function(error,admin){
        if(error){
            return next(error);
        }
        else{
            if(admin === null){
                 res.redirect("/");
            }
            else{
                return next();
            }
        }
    })

}

module.exports = {
    isAuthorized,
    isStudentAuthorized,
}