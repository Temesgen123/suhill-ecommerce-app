const productCartModel = require('../../models/productCartModel');

const productAddedToCartView = async (req, res) => {
  try {
    const currentUser = req.userId;
    const allUserProductInCart = await productCartModel.find({
      userId: currentUser,
    }).populate('productId');
    res.json({
      data: allUserProductInCart,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = productAddedToCartView;
