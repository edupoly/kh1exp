var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var products = require('./products');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'pug');

var students = [];

app.use(function(req,res,next){
    console.log("request for::::",req.url)
    next();
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/mypage.html")
})

app.get("/students",function(req,res){
    res.send(JSON.stringify(students))
})

app.get("/products",function(req,res){
    res.render("productsPage",{allProducts:products})
})

app.get("/product/:id",function(req,res){

    var myprod = products.find(function(a){
        if(a.id==req.params.id){
            return true
        }
    })
    
    res.render("productDetails",myprod)
})

app.get("/getRegStuPage",function(req,res){
    res.sendFile(__dirname+"/addStudent.html")
})

app.get("/registerStudent",function(req,res){
    res.send("please wait");
})

app.post("/registerStudent",function(req,res){
    students.push(req.body)
    res.send("thank you for registering with us....")
})

app.listen(4500)