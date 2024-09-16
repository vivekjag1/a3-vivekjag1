import express, {Router} from 'express'; 
import {mongoose} from 'mongoose'; 
import PurchaseItem from '../mongoose/purchases/schema.js';
const router = express.Router(); 

const isInBudget = (aPurchase) => { 
  //for the purposes of this assignment, a purchase is in budget if it is 15% or less of the cash on hand 
  const budget = aPurchase.cashOnHand * .15; 
  if(aPurchase.price > budget){
    return false; 
  }
  return true; 

}


router.post('/addPurchase', (req, res) =>{ 
    console.log(typeof(req.body)); 
    const body = JSON.parse(req.body); 
    const affordable = isInBudget(body); 
    console.log(affordable); 
    body.affordable = affordable; 


    PurchaseItem.create((body)); 
    console.log(req.body); 
}); 
export default router; 