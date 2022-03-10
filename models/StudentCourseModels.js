var mongoose = require('mongoose')

var StudentCourseModel = mongoose.Schema({
    studentId : {type: mongoose.Schema.Types.ObjectId,ref:"students"},
    courseId : {type: mongoose.Schema.Types.ObjectId,ref:"course"},
    doj : {type:Date},
    status: {type:Number,require:true,default:1}
});


var studentCourse = mongoose.model("student-course",StudentCourseModel)


module.exports  = studentCourse;