const nodemailer = require("nodemailer");
const User = require("../models/userSchema");

const sendEmailToVerify = async (email) => {
  console.log("i was running");
  try {
    // find user with email
    const currentUser = await User.findOne({ email });
    console.log(currentUser, "current user");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: "verification email", // Subject line
      html: `Press <a href=${process.env.PORT ?? 3000}/verify/${
        currentUser.token
      }`, // html body
    });
  } catch (error) {
    console.log(error, "::this error occured while sending gamil");
  }
};

module.exports = { sendEmailToVerify };
