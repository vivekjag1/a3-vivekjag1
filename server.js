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
//middleware for post requests so that requests have a body with the incoming data
const postMiddleware = (req, res, next) => { 
    const dataArr = []; 
    let dataString = ''; 
    req.on('data', (data) =>{ 
        dataString += data; 

    }); 
    req.on('end', () => { 
        console.log("d", dataString); 
        const json = JSON.parse(dataString); 
        dataArr.push(json); 
        req.body = JSON.stringify(json); 
        next(); 
    })
}
app.use(postMiddleware); 
//basic route used to test API and MongoDB atlas health
app.get('/', async (req, res) =>{
    res.send('Hello'); 
    const test = await PurchaseItem.countDocuments({}); 
    console.log('test is', test); 
}); 
//attach routes
app.use(exampleRoute); 
app.use(addPurchase); 
app.use(deletePurchase); 
app.use(getResults); 
app.use(updatePurchase); 
app.listen(process.env.PORT || 3000); 