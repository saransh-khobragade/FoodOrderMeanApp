const db = require('./dbMethods')
const Menu = require('../model/menu')

const express = require('express')
const router = express.Router();

router.get('/getMenu', async (req, res) => {
	
	let menu = await db.getAllMenu()
    let result=[]

    menu.forEach((x)=>{
		result.push(x.name)
    })
    
    return res.json({ success: true, result: result })
});

router.post('/setMenu',async (req, res) =>{		
    
    const{name} = req.query
    if(name){
        
        const menu = new Menu({name:name})
        menu.save(function (err) {  
            if (err) {  
                return res.json({success: false, message:err})  
            }  
            return res.json({success: true, message:'Registration successful'})  
        })
    }
    else return res.json({success: false, message: 'No input'})
    
	
});


module.exports = router;