const db = require('./dbMethods')

const express = require('express')
const router = express.Router();

const Order = require('../model/order')

router.post('/setOrder', async (req, res) => {
    const { order } = req.body
    if (order) {
        order.forEach(element => {
            const order = new Order({ name: element.name,quantity:element.quantity,status:"Not done" })
            order.save(function (err) {
                if (err) {
                    return res.json({ success: false, message: err })
                } 
            })
            
        });
        return res.json({ success: true, message: 'Order successful' })
    }
    else return res.json({ success: false, message: 'No input' })
});

router.get('/getOrderStatus', async (req, res) => {
	
	let menu = await db.getAllOrder()
    let result=[]

    let predicted=20

    menu.forEach((x)=>{
		result.push({orderId:x._id,name:x.name,quantity:x.quantity,status:x.status,predicted:predicted})
    })
    
    return res.json({ success: true, result: result })
});

router.get('/getLiveCount', async (req, res) => {
    let menu = await db.getAllMenu()
    let count=[]

    for(m of menu){
        let cnt= await db.getLiveCount(m)
        count.push({name:m.name,count:cnt})
    }

    return res.json({ success: true, result: count })
});

router.put('/updateOrder', async (req, res) => {
    const{id} = req.body
    
    if(id){
        let update = await db.update(id)
        if(update.nModified>0){
            return res.json({success: true, result: update})
        }
        else return res.json({success: false, message: 'update failed'})
    }
    else return res.json({success: false, message: 'No input'})
});

module.exports = router;