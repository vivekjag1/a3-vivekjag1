import express, {Router} from 'express'; 
import {mongoose} from 'mongoose'; 
import PurchaseItem from '../mongoose/purchases/schema.js';
const router = express.Router(); 
import { isInBudget } from '../utils/isInBudget.js';


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