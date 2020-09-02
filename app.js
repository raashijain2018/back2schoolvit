//jshint esconversion:6
// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const mongoose = require("mongoose");
// const session= require("express-session");
// const passport=require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const flash =require("connect-flash")
// const path = require('path');

// const app = express();

// // app.set('view engine', 'ejs');

// // app.use(bodyParser.urlencoded({extended: true}));
// // app.use(express.static("public"));


// app.use(express.static("public"));
//   app.set("view engine","ejs");
//   app.use(bodyParser.urlencoded({extended :true}));


//   app.use(session({
//   secret:"Our little secret",
//   resave:false,
//   saveUninitialized:false
// }));

// app.use(passport.initialize());
// app.use(passport.session());


// mongoose.set('useUnifiedTopology', true);
// mongoose.set("useCreateIndex",true);
// mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});


// const userSchema = new mongoose.Schema({
//   email :String,
//   password :String
// });

// userSchema.plugin(passportLocalMongoose);
// const User = new mongoose.model("User",userSchema);


// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
 const express = require("express");
  const bodyParser = require("body-parser");
  const ejs=require("ejs");
  const mongoose = require("mongoose");
 // const md5 = require("md5");
  const session= require("express-session");
  const passport=require("passport");
  const passportLocalMongoose = require("passport-local-mongoose");

  const app=express();


  app.use(express.static("public"));
  app.set("view engine","ejs");
  app.use(bodyParser.urlencoded({extended :true}));


  app.use(session({
  secret:"Our little secret",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

  //mongoose.set("useUnifiedTopology",true);
 mongoose.set('useUnifiedTopology', true);
 mongoose.set("useCreateIndex",true);
  mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});




  const userSchema = new mongoose.Schema({
    email :String,
    password :String
  });

userSchema.plugin(passportLocalMongoose);




  const User = new mongoose.model("User",userSchema);
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
// //landing Page
app.get("/",function(req,res)
{
  res.render("index");
});
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
//routes
// app.render("index",function(req,res){
  // console.log("html");
// });
// app.post("/index",function(req,res){
//   res.render("home")
// });
app.get("/index",function(req,res){
  res.render("home");
});
app.post("/index",function(req,res){
  res.render("home")
});
app.get("/mathbee_des",function(req,res){
  res.render("mathbee_des");
});
app.post("/mathbee_des",function(req,res){
  res.render("mathbee_des")
});
app.get("/error",function(req,res){
  res.render("error")
});
app.post("/login",function(req,res){
  var subject=req.body.test;
  const user =new User({
    username:req.body.username,
    password:req.body.password
   });
  // console.log(username);
  // console.log(password);
  console.log(subject);
  console.log(typeof subject);
 console.log(req.body.username);
   req.login(user,function(err){
    if (err) {
      console.log(err);
    }else if(subject==="null")
    {
       res.redirect("/login")
    }
    else{
      passport.authenticate("local",{failureRedirect: '/error' })(req,res,function(){
        if(subject ==="mathbee"){
          res.render("mathbee")
        }else if(subject ==="spellbee"){
          res.render("spellbee")
        }else{
          console.log(err)
        }
 
      })
    }
   })
 
 });
app.get("/mathbee",function(req,res){
  res.render("home");
});
app.get("/spell_des",function(req,res){
  res.render("spell_van");
});
app.post("/spell_des",function(req,res){
  res.render("spell_van");
});
app.get("/about",function(req,res){
  res.render("about");
});
app.post("/about",function(req,res){
  res.render("about");
});
app.get("/gravitas",function(req,res){
  res.redirect("https://gravitas.vit.ac.in/index.html");
})
app.post("/quiz",function(req,res){
  res.render("instruction");
});

app.post("/start",function(req,res){
  var check =req.body
  console.log(check);
  res.render("quiz");
});
app.get("/questions",function(req,res){
  res.render("question");
})
app.post("/questions",function(req,res){

  res.render("question");
});
app.listen(process.env.PORT || 5500, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
