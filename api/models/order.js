const mangoose = require('mongoose');
const orderSchema = mangoose.Schema({
    _id: mangoose.Schema.Types.ObjectId,
    product: { type: mangoose.Schema.Types.ObjectId, ref: 'Product' ,required:true},
    quantity: { type: Number, default:1 }
});
module.exports = mangoose.model('Order', orderSchema);