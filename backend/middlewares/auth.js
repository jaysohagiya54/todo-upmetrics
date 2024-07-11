const jwt = require('jsonwebtoken');
const User = require('../model/User');

const authenticate = async (req, res, next) => {
  const bearerToken = req.header('authorization');
  const token = bearerToken.split(" ")[1];

  if (!token) return res.status(401).send({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded._id;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Invalid token' });
  }
};


module.exports = { authenticate };