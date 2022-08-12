var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
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

app.post("/addFoodItem",function(req,res){
    console.log(req.body)
    var food = fs.readFileSync('food.txt');
    var foodArray = JSON.parse(food.toString())
    console.log(foodArray)
    var newFood = req.body;
    foodArray.push(newFood);
    console.log(foodArray)
    fs.writeFileSync('food.txt',JSON.stringify(foodArray))
    res.send("please wait")
})
app.listen(4500)



