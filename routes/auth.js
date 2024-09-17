import express, {Router} from 'express'; 
import axios from 'axios'
import PurchaseItem from '../mongoose/purchases/schema.js';
const router = express.Router(); 
router.get('/auth', async ({query:{code}}, res) =>{ 
    const body = { 
        client_id: process.env.GIT_CLIENT_ID, 
        client_secret: process.env.GIT_CLIENT_SECRET, 
        code
    }; 
    const options = {headers:{accept:'application/json'}}
    console.log('here outside'); 
    const token =  axios.post('https://github.com/login/oauth/access_token', body, options)
    .then((res) => res.data.access_token).then((token) =>{ 
        res.redirect(`/?token=${token}`)
    }); 
      
    
}); 


export default router; 