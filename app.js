//jshint esversion:6
var express = require("express");
var bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var app = express()

app.use(express.static("public"));


mongoose.connect('mongodb://localhost:27017/FriendsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


var friends = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});


const friendsSchema = new mongoose.Schema({
  friend: String,
})

const User = mongoose.model("User", userSchema);
const Friend = mongoose.model("Friend", friendsSchema);


app.get("/gogaga", function(req, res) {
  res.render("gogaga");
})

app.get("/gogaga/register.html", function(req, res) {
  res.render("register");
})

app.post("/gogaga/register.html", function(req, res) {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  })

  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.render("friends");
    }
  })
})


app.get("/gogaga/list.html", function(req, res) {
  res.render("list", {NewFriends: friends})
})

app.get("/gogaga/add.html", function(req, res) {
  res.render("add")
})

app.post("/gogaga/add.html", function(req, res) {
  var newfriend = req.body.friend;
  const newFriend = new Friend({
    friend: req.body.friend,
  })
  friends.push(newfriend);

  newFriend.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/gogaga/list.html");
    }
  })
})


app.listen(process.env.PORT || 3000, function() {
  console.log('server started at port 3000');
});
