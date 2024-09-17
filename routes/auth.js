import express, {Router} from 'express'; 
import PurchaseItem from '../mongoose/purchases/schema.js';
const router = express.Router(); 


// router.get('/auth', async (req, res) =>{ 
//     res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GIT_CLIENT_ID}`)
   
// }); 

router.get('/auth', async ({query:{code}}, res) =>{ 
    const body = { 
        client_id: process.env.GIT_CLIENT_ID, 
        client_secret: process.env.GIT_CLIENT_SECRET, 
        code
    }; 
    const options = {headers:{accept:'application/json'}}
    const token =  fetch('https://github.com/login/oauth/access_token', 
        {
            method:'POST', 
            body, 
            options
        }
     ).then((res) => res.data.access_token).then((token) => {
        res.redirect(`/?token=${token}`)
     })
     
     ; 

})

export default router; 