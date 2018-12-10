const Menu = require('../model/menu')
const Order = require('../model/order')

const getAllOrder = async () => {
	return Order.find({status:"Not done"}).exec().then(data => {
		return data;
	}).catch(err => console.log(err));
}

const getAllMenu = async () => {
	return Menu.find().exec().then(data => {
		return data;
	}).catch(err => console.log(err));
}

const getLiveCount = async (x) => {
    return Order.find({$and:[{name:x.name},{status:"Done"}]}).exec().then(data=>{
		let count=0;
		for(let cnt of data){
			count=count+Number(cnt.quantity)
		}
		return count
    }).catch(err => console.log(err));
}

const update =async (id)=>{
	return Order.update({ _id : id }, { $set : { status : "Done"}}).exec().then(data=>{
		return data
	})
}

module.exports ={ getAllOrder,getAllMenu,getLiveCount,update};