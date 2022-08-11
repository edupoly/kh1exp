var express = require('express')
var multer = require('multer');

var up = multer({dest:"uploads/"})
var app = express()
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/mypage.html")
})
app.post("/addstudent",up.single('abcfile'),function(req,res){
    res.send("Wait please")
})
app.listen(4500)