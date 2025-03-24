async function userLogout(req, res) {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    };
    res.clearCookie('token', tokenOption);
    res.json({
      message: 'Logged out successfully.',
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
      data: [],
    });
  }
}
module.exports = userLogout;
