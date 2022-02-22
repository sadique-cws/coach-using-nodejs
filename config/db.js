var mongoose = require('mongoose')

const DBConnect = async(url) => {
    try{
        await mongoose.connect(url);
        console.log("connected");
    }
    catch(error){
        console.log("not connected");
    }
}

module.exports = DBConnect;