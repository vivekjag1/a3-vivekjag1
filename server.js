//require .env library and mongoose
/*
Note -> all express routes are written in the routes directory. This file only serves the right route for the given HTTP request 
*/ 

import PurchaseItem from "./mongoose/purchases/schema.js"; 
import exampleRoute from "./routes/exampleRoute.js"; 
import addPurchase from "./routes/addPurchase.js"; 
import deletePurchase from "./routes/deletePurchase.js"; 
import getResults from "./routes/getResults.js"; 
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



app.listen(process.env.PORT || 3000); 









// const server = http.createServer( function( request,response ) {
//   if( request.method === 'GET' ) {
//     handleGet( request, response )    
//   }else if( request.method === 'POST' ){
//     handlePost( request, response ) 
//   }
// })
// let purchases = []; //this will be the "database" of JSON objects 

// /* 
//   A purchase will have 
//   1. A title 
//   2. A category (one of utilities, groceries, and fun)
//   3. A store
//   4. A price 
//   5. The cash on hand when purchased
//   6. (derived) whether or not it  was within a budget (see isInBudget for budget details)
// */ 




// const handleGet = function( request, response ) {
//   const filename = dir + request.url.slice( 1 ) 

//   if( request.url === '/' ) {
//     sendFile( response, 'public/index.html' )
//   }
//   else if(request.url === "/api/getResults"){
//     response.writeHead(200, "OK", {"content-type": 'application/json'}); 
//     response.end(JSON.stringify(purchases)); 
//   }
  
 
  
  
//   else{
//     sendFile( response, filename )
//   }
// }
// const deletePurchase = (aPurchase) => {
//   purchases =  purchases.filter((item) => item.title != aPurchase.title); 
// }

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

// const handlePost = function( request, response ) {
//   let dataString = ''

//   request.on( 'data', function( data ) {
//       dataString += data 
//   })

//   request.on( 'end', function() {
//     const body = JSON.parse(dataString); 

//     if(request.url === "/api/createPurchase"){

//       addPurchase(body); 
      
//     }
//     else if (request.url === '/api/deletePurchase'){
//       deletePurchase(body); 
//     }
//     else if (request.url === '/api/updatePurchase'){
//       updatePurchase(body); 
//     }

//     // ... do something with the data here!!!

//     response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
//     response.end('test')
//   })
// }

// const sendFile = function( response, filename ) {
//    const type = mime.getType( filename ) 

//    fs.readFile( filename, function( err, content ) {

//      // if the error = null, then we've loaded the file successfully
//      if( err === null ) {

//        // status code: https://httpstatuses.com
//        response.writeHeader( 200, { 'Content-Type': type })
//        response.end( content )

//      }else{

//        // file not found, error code 404
//        response.writeHeader( 404 )
//        response.end( '404 Error: File Not Found' )

//      }
//    })
// }

// server.listen( process.env.PORT || port )