const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cn = mongoose.connection;
const Schema = mongoose.Schema;

const port = process.env.PORT || 3000;
const app = express();

// MONGO connection

mongoose.Promise = Promise;
const cnstr = "mongodb://localhost/angulardb";
mongoose.connect(cnstr, {useMongoClient:true});
cn.on('error', ()=> {
  console.log(error);
});
cn.once('open', ()=> {
  console.log('db open');
});

// END Mongo connection

const authorSchema = new Schema({
  lastname   : {type: String, required: true},
  firstname  : {type: String, required: true},
  books : [String]
});

let Author = mongoose.model('Author', authorSchema);

app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));
app.use('/scripts', express.static('scripts'));

app.use(bodyParser.json());

// LIST ALL AUTHORS
app.get('/author', (req, res) => {
  Author.find().lean().exec(function(error, data){
    if(!error){
      // console.log(data);
      res.send(data);
    }
    else {
      res.send(error);
    }
  }); 
});

// FIND ONE AUTHOR
// how to perform case insensitive search on mongoose
app.get('/author/:lastname', (req,res) => {
  let name = req.params.lastname;
  Author.findOne({'lastname': {'$regex': name,$options: 'i' }}).lean().exec((err,data)=> {
    if(err) {
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
})

// EDIT AN AUTHOR
app.put('/author', (req, res) => {
  
  var condition = {_id: req.body._id};
  var updateData = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    books : req.body.books
  };
  
  Author.findOneAndUpdate(condition, updateData, function(err){
    if(!err){
      //res.send("Updated " + req.body.lname);
      res.send({
        data: `Updated ${updateData.lastname} , ${updateData.firstname}`
      });
    }
    else {
      console.log("Error " + err);
      res.send("Error " + err);
    }
  });
});

// ADD AN AUTHOR
app.post('/author', (req, res) => {
  var lname = req.body.lastname;
  var fname = req.body.firstname;

  new Author({
    lastname : req.body.lastname,
    firstname :req.body.firstname,
    books: req.body.books
  }).save(function(err){
    if(!err){
      console.log("Saved ");
      res.send({msg: `Saved ${fname} ${lname}`});
    }
    else {
      console.log("Error: " + err);
      res.send(err);
    }
  });

/*
  Author.find().lean().exec(function(error, data){
    if(!error){
      // console.log(data);
      res.send(data);
    }
    else {
      res.send(error);
    }
  });
  
  */

});

app.post('/addtest', (req, res) => {
  let ret = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    books: req.body.books 
  }
  res.send(ret);
});

app.listen(port, ()=> {
  console.log("Listening on port %d", port);
});