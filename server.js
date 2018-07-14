var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = require('q').Promise;
var port= 3000;
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/productApp', function (err) {
    if (err) {
        console.log("Not connected to db" + err);
    }
    else {
        console.log("Successfully connected");
        app.listen(port, function () {
            console.log("Running on port" + port);
        });
    }
});

var productSchema = new Schema({
           productId: Number,
          productName:String,
          productCode : String,
          releaseDate : String,
          description : String,
          price : String ,
          starRating : Number ,
          imageUrl : String

})
var product = mongoose.model("product", productSchema);

app.post('/authenticate' , function(req,res){
  console.log('req.body data' , req.body);

  var token = jwt.sign({"uname" : req.body.username} , 'marlabs-secret-key' , {
    expiresIn: '1h'
  });

  if(req.body.username && req.body.password){
    res.send({
      isLoggedIn : true,
      token : token
    })
  }
  else{
    res.send({
      isLoggedIn:false
    })
  }
})

app.use(function(req,res,next){
  var token = req.body.authToken || req.query.authToken || req.headers['authtoken'];
  jwt.verify(token, 'marlabs-secret-key', function(err, decoded){
      if(err){
        res.send({
          err: true,
          msg : "Invalid request"
        })
      }
      else{
        // console.log("token val" , token)
          req.decoded = decoded ;
          // console.log("decoded data" , req.decoded);
          next();
      }
  });
});

app.post('/addProducts' , function(req,res){
  console.log("req.body sent to server" , req.body);

  var product1 = new product({
    productId: req.body.id,
    productName : req.body.name,
    productCode : req.body.code,
    releaseDate: req.body.releaseDate,
    description: req.body.description,
    price : req.body.price ,
    starRating : req.body.rating,
    imageUrl : req.body.image

  })

  product1.save((err,result)=>{
    console.log(result);
    res.send(result);
  })

})


app.get('/getProducts' , function(req,res){

 product.find({},(err,result)=>{
  res.send(result);
})


});
