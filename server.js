//require .env library and mongoose
/*
Note -> all express routes are written in the routes directory. This file only serves the right route for the given HTTP request 
*/ 

import PurchaseItem from "./mongoose/purchases/schema.js"; 
import exampleRoute from "./routes/exampleRoute.js"; 
import addPurchase from "./routes/addPurchase.js"; 
import deletePurchase from "./routes/deletePurchase.js"; 
import getResults from "./routes/getResults.js"; 
import updatePurchase from "./routes/updatePurchase.js"; 
import dotenv from 'dotenv'; 
dotenv.config(); 
import { mongoose } from 'mongoose';
mongoose.connect(process.env.ATLAS_URI); 
import express from 'express'; 
const app = express(); 
app.use(express.static('public')); 

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
app.use(postMiddleware); 



app.get('/', async (req, res) =>{
    res.send('Hello'); 
    
    const test = await PurchaseItem.countDocuments({}); 
    console.log('test is', test); 
    
}); 

app.use(exampleRoute); 
app.use(addPurchase); 
app.use(deletePurchase); 
app.use(getResults); 
app.use(updatePurchase); 



app.listen(process.env.PORT || 3000); 














// const updatePurchase = (aPurchase) => {

//   //first make sure that a purchase with that title does not exist already 
//   const findIndex = purchases.findIndex(purchase => {
//     purchase.title === aPurchase.title &&
//     purchase.category == aPurchase.category &&
//     purchase.store == aPurchase.store &&
//     purchase.price == aPurchase.price &&
//     purchase.cashOnHand == aPurchase.cashOnHand
  
  
  
//   }); 
  
//   if(findIndex != -1){
//     return; 
//   }

//   const purchaseLen = purchases.length; 
//   purchases =  purchases.filter((item) => item.title !== aPurchase.oldTitle);


//   const newPurchase = {
//     "title": aPurchase.title, 
//     "category": aPurchase.category, 
//     "store": aPurchase.store,  
//     "price": aPurchase.price, 
//     "cashOnHand": aPurchase.cashOnHand, 
//     "affoardable?": isInBudget(aPurchase), 
//   } 
//   purchases.push(newPurchase); 


// }




