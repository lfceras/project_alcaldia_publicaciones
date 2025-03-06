const { response } = require("../../utils");
const User = require("../schemas/User");

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({
    email,
  });
  if (userExist) {
    return response(res, 400, { message: "User already exists" });
  }
  next();
};
