const mongoose = require('../connection/mongoConnection')

const MenuSchema = new mongoose.Schema({
    name:{type: String, required: true }
}, function(err){
	if (err) { 
       console.log(err); 
     }
})

const Menu = mongoose.model('Menu', MenuSchema)
module.exports =  Menu