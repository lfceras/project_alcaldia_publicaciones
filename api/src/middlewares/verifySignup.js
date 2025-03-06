const { response } = require("../../utils/index.js");
const { Roles } = require("../schemas/Role.js");
module.exports = async (req, res, next) => {
  const { roles } = req.body;
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!Roles.includes(roles[i])) {
        return response(res, 400, {
          message: `Role ${roles[i]} does not exist`,
        });
      }
    }
  }
  next();
};
