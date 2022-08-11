var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/mypage.html")
})


app.listen(4500)