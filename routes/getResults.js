import express, {Router} from 'express'; 
import PurchaseItem from '../mongoose/purchases/schema.js';
const router = express.Router(); 

router.get('/getResults', async (req, res) =>{ 
    const data = await PurchaseItem.find({userName: req.user['username']}); 
    res.json({"data": data}); 
}); 
export default router; 