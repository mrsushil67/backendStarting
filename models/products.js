const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    price: {
        type: Number,
        required:true
    },
    stock:{
        type:Number,
        default:0,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    }
},{timestamps:true})

const productModel = mongoose.model('products',productSchema);

module.exports = productModel;