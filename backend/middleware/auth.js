const User = require("../models/userSchema");

const checkAuthorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // const userId = req.body.userId;
    let userId = req.body.userId;
    if (req.query.userId) {
      userId = req.query.userId;
    }

    // console.log(userId, ":::user id:::", req.query);

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    if (!userId?.trim() || !userId) {
      throw new Error("user id is missing");
    }
    const getUserFromDB = await User.findOne({ _id: userId });

    if (getUserFromDB?.token !== token) {
      return res.status(401).json({ error: "Authorization token is invalid." });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkAuthorization;
