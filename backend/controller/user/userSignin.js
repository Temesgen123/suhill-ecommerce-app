const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error('Please enter your email.');
    }
    if (!password) {
      throw new Error('Please enter your password.');
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found.');
    }
    const checkedPassword = await bcrypt.compare(password, user.password);
    if (checkedPassword) {
      const tokenData = { _id: user._id, email: user.email };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      };
      res.cookie('token', token, tokenOption).json({
        message: 'Logged in successfully.',
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error('Wrong password. Try again.');
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = userSignInController;
