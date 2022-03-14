const mangoose = require('mongoose');
const productSchema = mangoose.Schema({
    _id: mangoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage:{type:String,required:true}
});
module.exports = mangoose.model('Product', productSchema);