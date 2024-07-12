const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const register = async (req, res) => {
  const {name, email, password } = req.body;

  try {
    const existUser = await User.findOne({email});
    if(existUser){
      throw new Error("User already created.")
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({name, email, password: hashedPassword });
    await user.save();
    res.json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err); // Log the actual error for debugging
    res.status(400).send({ error: 'Failed to create user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user === null) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.send({ token });
  } catch (err) {
    res.status(400).send({ error: 'Failed to login' });
  }
};

const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedPassword;
    await user.save();

    res.send({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err); // Log the actual error for debugging
    res.status(400).send({ error: 'Failed to update password' });
  }
};




const updateProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).send({ error: 'User not found' });

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.file) {
      user.profilePicture = req.file.path;
    }

    await user.save();
    res.send({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(400).send({ error: 'Failed to update profile' });
  }
};


module.exports = { register, login, forgotPassword, updateProfilePicture };