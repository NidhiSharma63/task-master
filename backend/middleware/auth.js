const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.Todo;

    // first verfiy user
    const verifyUser = jwt.verify(token, process.env.SECREAT_KEY);

    // get the user from collection
    const user = await User.findOne({ _id: verifyUser.id });

    next();
  } catch (error) {
    res.status(401).json({ error: "User must be authorized" });
  }
};

module.exports = auth;
