import express, {Router} from 'express'; 
import {mongoose} from 'mongoose'; 
import PurchaseItem from '../mongoose/purchases/schema.js';
const router = express.Router(); 

router.post('/addPurchase', (req, res) =>{ 
    console.log(typeof(req.body)); 
    PurchaseItem.create(JSON.parse(req.body)); 
    console.log(req.body); 
}); 
export default router; 