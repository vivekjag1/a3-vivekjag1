import express, {Router} from 'express'; 
import PurchaseItem from '../mongoose/purchases/schema.js';
const router = express.Router(); 
router.post('/deletePurchase', async (req, res) =>{ 
    console.log('called!'); 
    const body = JSON.parse(req.body); 
    await PurchaseItem.deleteMany({title: (body.title)}); 
    const data = await PurchaseItem.find({}); 
    res.json({"data":data}); 
}); 
export default router; 