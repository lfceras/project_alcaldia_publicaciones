const User = require("../schemas/User.js");
const {Role} = require("../schemas/Role.js");
const { response } = require("../../utils");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  return response(res, 403, { message: "Require Moderator Role!" });
};
