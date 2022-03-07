var mongoose = require('mongoose')

var StudentCourseModel = mongoose.Schema({
    studentId : {type: mongoose.Schema.Types.ObjectId,ref:"students"},
    CourseId : {type: mongoose.Schema.Types.ObjectId,ref:"courses"},
    status: {type:Number,require:true,default:1}
});


var studentCourse = mongoose.model("student-course",StudentCourseModel)


module.exports  = studentCourse;