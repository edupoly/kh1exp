var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log("multer",req.body)
        cb(null,'public/foodImages/')
    },
    filename:function(req,file,cb){
        var x = path.parse(file.originalname)
        var filename = x.name+Date.now()+x.ext;
        cb(null,filename)
    }
})
var up = multer({storage:storage})
app.use(express.static(__dirname+"/public"))
const pug = require('pug');
app.set('view engine', 'pug')
app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/server2home.html")
})

app.get("/getallitems",function(req,res){
    var food = fs.readFileSync('food.txt');
    var foodArray = JSON.parse(food.toString())
    res.render("foodItems.pug",{items:foodArray})
})

app.get("/addFoodItem",function(req,res){
    res.sendFile(__dirname+"/public/foodForm.html")
})

app.post("/addFoodItem",up.single('img'),function(req,res){
    //console.log(req)
    console.log(req.file)
    console.log(req.body)
    var food = fs.readFileSync('food.txt');
    var foodArray = JSON.parse(food.toString())
    // console.log(foodArray)
    var newFood = {...req.body,img:req.file.path};
    foodArray.push(newFood);
    console.log(foodArray)
    fs.writeFileSync('food.txt',JSON.stringify(foodArray))
    res.send("please wait")
})
app.listen(4500)



