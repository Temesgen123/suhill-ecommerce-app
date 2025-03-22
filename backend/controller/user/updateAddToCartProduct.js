const productCartModel = require('../../models/productCartModel');

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToProductId = req.body._id;
    const qty = req.body.quantity;

    const updatedCartItem = await productCartModel.updateOne({_id : addToProductId}, {
      ...(qty && { quantity: qty })
    });
    res.json({
      message: 'Cart Product Updated.',
      data: updatedCartItem,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = updateAddToCartProduct;
