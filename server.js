/*
Note -> all express routes are written in the routes directory. This file only serves the right route for the given HTTP request 
*/ 
//import routes
import PurchaseItem from "./mongoose/purchases/schema.js"; 
import exampleRoute from "./routes/exampleRoute.js"; 
import addPurchase from "./routes/addPurchase.js"; 
import deletePurchase from "./routes/deletePurchase.js"; 
import getResults from "./routes/getResults.js"; 
import updatePurchase from "./routes/updatePurchase.js"; 
import deleteAll from "./routes/deleteAll.js"; 
import session from "express-session"; 
import passport from "passport"; 
import   GitHubStrategy  from 'passport-github2';
import user from "./mongoose/user/schema.js";






//start dotenv
import dotenv from 'dotenv'; 
dotenv.config(); 
//start mongoose
import { mongoose } from 'mongoose';
mongoose.connect(process.env.ATLAS_URI); 
//start express
import express from 'express'; 
const app = express(); 
app.use(express.static('public')); 
app.use(express.json()); 

app.use(session({
    secret:process.env.PASSPORT_SECRET, 
    resave: false, 
    saveUninitialized: false
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 

//middleware for post requests so that requests have a body with the incoming data
const postMiddleware = (req, res, next) => { 
    const dataArr = []; 
    let dataString = ''; 
    req.on('data', (data) =>{ 
        dataString += data; 

    }); 
    req.on('end', () => { 
        
        const json = JSON.parse(dataString); 
        dataArr.push(json); 
        req.body = JSON.stringify(json); 
        next(); 
    })
}

//basic route used to test API and MongoDB atlas health
app.get('/', async (req, res) =>{
    res.send('Hello'); 
    const test = await PurchaseItem.countDocuments({}); 
}); 
//attach routes

//gets first
passport.use(new GitHubStrategy({
    clientID: "Ov23li327N2XvQ9nYVMU", 
    clientSecret:process.env.GIT_CLIENT_SECRET, 
    callbackURL: "http://localhost:3000/"
},
 async function(accessToken, refreshToken, profile, cb){
   const numUsers =  await user.findOne({gitID:profile.id}); 
   console.log(profile.id);
   if(!numUsers){
    const newUser = { 
        gitID:profile.id
    }; 
     await user.create(newUser);
     return (cb, newUser)
}
    
}
)); 


app.get('/auth/github',  passport.authenticate('github', {scope:['user:email']})); 
passport.serializeUser((user, done) => { 
    done(null, user.gitID); 
})

app.use(exampleRoute); 
app.use(getResults); 
app.use(deleteAll); 

app.use(postMiddleware); 

app.use(addPurchase); 
app.use(deletePurchase); 
app.use(updatePurchase); 
app.listen(process.env.PORT || 3000); 