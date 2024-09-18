/*
Note -> all express routes are written in the routes directory. This file only serves the right route for the given HTTP request 
*/ 
//import routes
import PurchaseItem from "../mongoose/purchases/schema.js"; 
import exampleRoute from "../routes/exampleRoute.js"; 
import addPurchase from "../routes/addPurchase.js"; 
import deletePurchase from "../routes/deletePurchase.js"; 
import getResults from "../routes/getResults.js"; 
import updatePurchase from "../routes/updatePurchase.js"; 
import deleteAll from "../routes/deleteAll.js"; 
import cors from 'cors';
import auth from './auth.js'; 
import session from 'express-session';
import user from "../mongoose/user/schema.js"; 

console.log("here"); 



//start dotenv
import dotenv from 'dotenv'; 
dotenv.config(); 
//start mongoose
import { mongoose } from 'mongoose';
mongoose.connect(process.env.ATLAS_URI); 
//start express
import express from 'express'; 
import passport from "passport";
const app = express(); 

app.use(session({secret:'webware'})); 
app.use(passport.initialize()); 
app.use(passport.session()); 

app.get('/', (req, res) => { 
    res.redirect('/auth/github'); 
}); 
app.use(express.static('public')); 
app.use(express.json()); 
app.use(cors({origin:'https://a3-vivekjag1.vercel.app/'})); 

const isLoggedIn = (req, res, next) => { 
    console.log('user is', req.user); 
    req.user? next(): res.status(401).send(); 
    
}


//middleware for post requests so that requests have a body with the incoming data
const postMiddleware = (req, res, next) => { 
    const dataArr = []; 
    let dataString = ''; 
    req.on('data', (data) =>{ 
        dataString += data; 

    }); 
    req.on('end', () => { 
        if(dataString){
            const json = JSON.parse(dataString); 
            req.body = JSON.stringify(json); 
           
        }
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



app.get('/auth/github',passport.authenticate('github', {scope:['user:email']})); 
app.get('/git/callback', 
    passport.authenticate('github', {
        successRedirect:'/protected', 
        failureRedirect: '/failed'
    })
); 

app.get('/failed',(req, res) =>  res.send('something went wrong!')); 
app.get('/protected', isLoggedIn, (req, res) =>  res.redirect('/home.html')); 
// app.get('/home', (req, res) => { 
//     res.sendFile(__dirname + '/index.html'); 
// }); 


app.use(exampleRoute); 
app.use(getResults); 
app.use(deleteAll); 

app.use(postMiddleware); 

app.use(addPurchase); 
app.use(deletePurchase); 
app.use(updatePurchase); 
app.listen(process.env.PORT || 3000); 