var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./routers/web');
var db = require("./config/db");
var session = require("express-session")
var connection = db("mongodb://localhost/coach");
require("express-dynamic-helpers-patch")(app)


app.use(session({
    secret:"testing dasfasdfadsf fsafa sd",
    resave:false,
    saveUninitialized:false,
}))
var urlEncoded = bodyParser.urlencoded({extended:false})

// customize helper
app.dynamicHelpers({
    session: function (req,res){
        return req.session;
    }
})


app.use(urlEncoded)
app.use("/",router);



app.set("view engine","pug")
app.set("views","./public/views");




app.listen(8081)