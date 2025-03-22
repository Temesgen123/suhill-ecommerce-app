//Product Cart Model

const mongoose = require('mongoose');

const productCartSchema = mongoose.Schema(
  {
    productId: {
      ref: 'product',
      type: String,
    },
    quantity: Number,
    userId: String,
  },
  { timestamps: true }
);

const productCartModel = mongoose.model('productCart', productCartSchema);
module.exports = productCartModel;
