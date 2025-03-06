const jwt = require("jsonwebtoken");
const User = require("../schemas/User");
const { response } = require("../../utils");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return response(res, 403, { message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return response(res, 401, { message: "No user found" });
    next();
  } catch (error) {
    console.error(error);
    return response(res, 401, { msg: error.message });
  }
};
