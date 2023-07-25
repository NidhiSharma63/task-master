const User = require("../models/userSchema");

const checkAuthorization = async (req, res, next) => {
  const token = req.headers.authorization;
  // const userId = req.body.userId;
  let userId = req.body.userId;
  if (req.query.userId) {
    userId = req.query.userId;
  }

  // console.log(userId, ":::user id:::", req.query);

  if (!token) {
    return res.status(400).json({ error: "Authorization token is missing." });
  }

  if (!userId.trim() || !userId) {
    return res.status(400).json({ error: "Id is missing." });
  }
  const getUserFromDB = await User.findOne({ _id: userId });

  if (getUserFromDB?.token !== token) {
    return res.status(401).json({ error: "Authorization token is invalid." });
  }

  next();
};

module.exports = checkAuthorization;
