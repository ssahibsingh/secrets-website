const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin-exnone:nNone2019@ay-secrets-website.dxwvh.mongodb.net/userDB");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const userSchema = mongoose.Schema({
    email: String,
    password: String,
})

const User = mongoose.model('User', userSchema);




app.get('/', (req, res) => {
    res.render('home');
})
app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/submit', (req, res) => {
    res.render('submit');
})


app.post("/register", (req,res)=>{
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    })

    newUser.save((err)=>{
        if(err){
            console.log(err);
        }else{
            res.render("secrets")
        }
    })
    
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Successfully Listening');
})