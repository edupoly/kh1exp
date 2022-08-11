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

app.get("/",function(req,res){
    res.sendFile(__dirname+"/mypage.html")
})

app.get("/students",function(req,res){
    console.log(students);
    res.send(JSON.stringify(students))
})

app.get("/products",function(req,res){
    res.render("productsPage",{allProducts:products})
    // var productsPage =  `
    //                         <html>
    //                             <body>
    //                                 ${
    //                                     products.map((p)=>{
    //                                         return `<li>
    //                                                     <a href="/product/${p.id}">${p.title}</a>
    //                                                 </li>`
    //                                     })
    //                                 }
    //                             </body>
    //                         </html>
    //                     `;
    // res.send(productsPage)
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
    //console.log(req.query);
    res.send("please wait");
})

app.post("/registerStudent",function(req,res){
    students.push(req.body)
    res.send("thank you for registering with us....")
})

app.listen(4500)