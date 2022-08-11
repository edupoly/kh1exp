var express = require('express')
var path = require('path');
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log(req.body)
        cb(null,'uploads/'+req.body.firstname+"/")
    },
    filename:function(req,file,cb){
        var x = path.parse(file.originalname)
        var filename = x.name+Date.now()+x.ext;
        cb(null,filename)
    }
})
var up = multer({storage:storage})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/mypage.html")
})
app.post("/addstudent",up.single('abcfile'),function(req,res){
    res.send("Wait please")
})
app.listen(4500)