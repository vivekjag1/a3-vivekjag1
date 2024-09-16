import express, {Router} from 'express'; 
const router = express.Router(); 

router.post('/addPurchase', (req, res) =>{ 
    console.log(req.body); 
}); 
export default router; 