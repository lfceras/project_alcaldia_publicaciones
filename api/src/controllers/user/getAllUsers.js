const { response } = require("../../../utils");
const User = require("../../schemas/User");
module.exports = async (req, res) => {
  const { name } = req.query;

  if (name) {
    const users = await User.find({ name: { $regex: name, $options:"i" } })
      .sort({ name: 1 })
      .lean();

    return users.length
      ? response(res, 200, users)
      : response(res, 404, { message: "No users found" });
  }

  const users = await User.find({}).sort({ name: 1 }).lean();
  return users.length
    ? response(res, 200, users)
    : response(res, 404, { msg: "No users found" });
};
