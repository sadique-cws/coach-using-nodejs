var mongoose = require('mongoose')

var CourseCategoryModel = mongoose.Schema({
    cat_title: {type:String,require:true},
    cat_description: {type:String,require:false}
});


var courseCategory = mongoose.model("course-category",CourseCategoryModel)


module.exports  = courseCategory;