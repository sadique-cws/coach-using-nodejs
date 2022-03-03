AdminModel = require("../models/AdminModels")

module.exports.isAuthorized = function(req,res,next){
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