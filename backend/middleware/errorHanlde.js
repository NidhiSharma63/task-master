const errorHandle = (error, req, res, next) => {
  console.log("Error handle");
  return res.status(400).send(error.message);
};

module.exports = errorHandle;
