var studentModel = require("../models/StudentModels");



async function DashboardView(req,res){
    const students = await studentModel.countDocuments();
    res.render("admin/dashboard",{"students": students});
}

function ManageStudent(req,res){
   studentModel.find((error, response) => {
        res.render("admin/manageStudent", {'students': response});
    });
}


module.exports = {
    DashboardView,
    ManageStudent,
}