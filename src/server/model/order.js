const mongoose = require('../connection/mongoConnection')

const OrderSchema = new mongoose.Schema({
    name:{type: String, required: true },
    quantity:{type: String, required: true },
    status:{type: String, required: true }
}, function(err){
	if (err) { 
       console.log(err); 
     }
})

const Order = mongoose.model('Order', OrderSchema)
module.exports =  Order