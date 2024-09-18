import express, {Router} from 'express'; 
import {mongoose} from 'mongoose'; 
import PurchaseItem from '../mongoose/purchases/schema.js';
const router = express.Router(); 
import { isInBudget } from '../utils/isInBudget.js';


router.post('/addPurchase', async (req, res) =>{ 
    const body = JSON.parse(req.body); 
    const affordable = isInBudget(body); 
    body.affordable = affordable; 
    body.userEmail = req.user['username']; 


    await PurchaseItem.create((body)); 
    const toSend = await PurchaseItem.find({}); 
    res.json({"data": toSend}); 
  
}); 
export default router; 