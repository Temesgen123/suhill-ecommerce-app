const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error('User already exists in the database.');
    }
    if (!email) {
      throw new Error('Please enter your email');
    }
    if (!username) {
      throw new Error('Please Enter your user name.');
    }
    if (!password) {
      throw new Error('Please enter your password');
    }
    const salt =  bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    if (!hashPassword) {
      throw new Error('Something went wrong while trying to encrypt password.');
    }
    const payload = {
      ...req.body,
      role: 'GENERAL',
      password: hashPassword,
    };
    const userData = new userModel(payload);
    const savedUser = await userData.save();
    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: 'User created successfully.',
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = userSignUpController;
