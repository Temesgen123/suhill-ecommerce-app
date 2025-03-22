
//Update User

const userModel = require('../../models/userModel');

const updateUser = async (req, res) => {
  try {
    const { userId, email, username, role } = req.body;
    const sessionUser = req.userId;
    const payload = {
      ...(email && { email: email }),
      ...(username && { email: username }),
      ...(role && { role: role }),
    };
    const user = await userModel.findById(sessionUser);
    if (user?.role === 'ADMIN') {
      const updatedUser = await userModel.findByIdAndUpdate(userId, payload);
      res.json({
        data: updatedUser,
        message: 'User Updated Successfully.',
        success: true,
        error: false,
      });
    } else {
      res.json({
        data: null,
        message: 'You are not authorized to make the change.',
        success: false,
        error: true,
      });
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = updateUser;
