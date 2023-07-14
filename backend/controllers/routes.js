const getAllUserTodo = (req, res) => {
  res.send("Your All Todo Is Here");
};

const registerUser = (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // check if any field is missing or not
  if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
    res.status(401).json({ error: "Missing email or password" });
  }

  // check if user have enterd the correct password or not
  if (password !== confirmPassword) {
    res
      .status(401)
      .json({ error: "Password and confirm password does not match" });
  }
  res.send("User created");
};

module.exports = {
  getAllUserTodo,
  registerUser,
};
