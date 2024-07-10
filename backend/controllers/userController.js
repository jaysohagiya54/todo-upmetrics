const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  try {
    await user.save();
    res.send({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).send({ error: 'Failed to create user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send({ error: 'Invalid email or password' });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).send({ error: 'Invalid email or password' });
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    res.status(400).send({ error: 'Failed to login' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: 'User not found' });
    // send password reset email
    res.send({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(400).send({ error: 'Failed to send password reset email' });
  }
};

const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) return res.status(400).send({ error: 'Passwords do not match' });
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send({ error: 'User not found' });
    user.password = password;
    await user.save();
    res.send({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(400).send({ error: 'Failed to reset password' });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send({ error: 'User not found' });
    user.profilePicture = req.file.path;
    await user.save();
    res.send({ message: 'Profile picture updated successfully' });
  } catch (err) {
    res.status(400).send({ error: 'Failed to update profile picture' });
  }
};

module.exports = { register, login, forgotPassword, resetPassword, updateProfilePicture };