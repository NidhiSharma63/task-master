const User = require("../models/userSchema");

const checkAuthorization = async (req, res, next) => {
  const token = req.headers.authorization;
  // const userId = req.body.userId;
  const userId = req.query.userId;

  if (!token) {
    return res.status(400).json({ error: "Authorization token is missing." });
  }

  if (!userId.trim()) {
    return res.status(400).json({ error: "Id is missing." });
  }
  const getUserFromDB = await User.findOne({ _id: userId });

  if (getUserFromDB?.token !== token) {
    return res.status(401).json({ error: "Authorization token is invalid." });
  }

  // Check if the token is present and valid (you can implement your own validation logic here)

  // If the token is valid, you can continue to the next middleware or the main handler
  next();
};

module.exports = checkAuthorization;
