//Delete item from user cart

const productCartModel = require('../../models/productCartModel');

const deleteProductInCart = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const userCartProductId = req.body._id;
    const deleteProduct = await productCartModel.deleteOne({
      _id: userCartProductId,
    });
    res.json({
        message : 'Product deleted from cart.',
        data : deleteProduct,
        success : true,
        error : false
    })
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteProductInCart;
