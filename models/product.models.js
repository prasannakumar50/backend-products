const mongoose = require("mongoose")


const productSchema =  new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    category: [{
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Kids', 'Others'], 
      }],
      subCategory: [{
        type: String,
        enum: ['Shirts', 'T-Shirts', 'Pants', 'Dresses',],
      }],
      price: {
        type: Number,
        required: true,
      },
      size: [{
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        default: ['M'],
      }],
      color: {
        type: [String],
        default: ['Black'],
      },
      quantity: {
        type: Number,
        required: true,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
      availability: [{
        type: String,
        enum: ['In Stock', 'Out of Stock'], 
        default: 'In Stock', 
      }],
      deliveryTime: [{
        type: String, 
      }],
      currency: {
        type: String, 
        default: 'Rs.',
      },
      tags: {
        type: [String],
        default: [], 
      },
      imageUrl: {
        type: String,
        required: true, 
      },
      
},{
  timestamps: true,
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;