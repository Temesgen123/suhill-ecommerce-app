
//All Users Controller

const userModel = require('../../models/userModel');

async function allUsers(req, res) {
  try {
    console.log('USER ID : ', req.userId);
    const allUsers = await userModel.find();
    res.json({
      message: 'All users',
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
      data: [],
    });
  }
}

module.exports = allUsers;
