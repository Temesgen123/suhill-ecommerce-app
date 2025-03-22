const productCartModel = require('../../models/productCartModel.js');

const countProductAddedToCart = async (req, res) => {
  try {
    const userId = req?.userId;
    const count = await productCartModel.countDocuments({ userId: userId });
    res.json({
      data: {
        count: count,
      },
      messsage: 'Ok',
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = countProductAddedToCart;
