var express = require('express')
var path = require('path');
var app = express();
var fs = require('fs')
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

// var data = fs.readFileSync("books.txt");
// var books = JSON.parse(data.toString());
// console.log(books)
// var newbook = {
//     id: books[books.length-1].id+1,
//     title: 'Ipad ',
//     price: 122.3,
//     description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
//     category: "electronics",
//     image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
//     rating: { rate: 4.9, count: 559 }
// }
// books.push(newbook);
// fs.writeFileSync('books.txt',JSON.stringify(books))

app.listen(4500)