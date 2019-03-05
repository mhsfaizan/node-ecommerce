const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require("cors");
const session = require('express-session');
const path = require('path');

const port = process.env.PORT||8080;

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    console.log('connected');
});

// require('./config');


const app = express();

//cors
app.use(cors({
    origin: ["http://localhost:4200"],
    credentials: true
}));


//app configuration
app.use(express.static(path.join(process.cwd(), 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




//passport configuration
app.use(session({
   name:'myecommerce.sid',
   resave:false,
   saveUninitialized:false,
   secret:'abcdef',
   cookie:{
       maxAge:36000000,
       httpOnly:false,
       secure:false
   }
}));

//passport config
require('./auth/authenticate');
app.use(passport.initialize());
app.use(passport.session());


//routs;
app.use('/auth', require("./route/login/auth"));
app.use("/product", require("./route/product/product"));

// app routes

app.use("/app",require("./app-route/product"))

app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/index.html'));
})
// app.get('/',(req,res)=>{
//     res.json({message:"suceesg"});
// })

app.listen(port, () => console.log("server listening at "+port));