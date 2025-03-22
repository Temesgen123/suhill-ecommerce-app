
//Product Cart Controller
const productCartModel = require('../../models/productCartModel');

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;
    const isProductAvailable = await productCartModel?.findOne({ productId });
    if (isProductAvailable) {
      return res.json({
        message: 'Product already exists in cart.',
        success: false,
        error: true,
      });
    }
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };
    const newAddToCart = new productCartModel(payload);
    const savedProduct = await newAddToCart.save();
    return res.json({
      data: savedProduct,
      success: true,
      error: false,
      message: 'Product Added To Cart.',
    });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
      data: [],
    });
  }
};

module.exports = addToCartController;
