var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var students = [];

app.get("/",function(req,res){
    res.sendFile(__dirname+"/mypage.html")
})

app.get("/students",function(req,res){
    console.log(students);
    res.send(JSON.stringify(students))
})

app.get("/getRegStuPage",function(req,res){
    res.sendFile(__dirname+"/addStudent.html")
})

app.get("/registerStudent",function(req,res){
    //console.log(req.query);
    res.send("please wait");
})

app.post("/registerStudent",function(req,res){
    students.push(req.body)
    res.send("thank you for registering with us....")
})

app.listen(4500)