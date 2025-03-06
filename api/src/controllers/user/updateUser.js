const mongoose = require("mongoose");
const User = require("../../schemas/User");
const { response } = require("../../../utils");
const { Role } = require("../../schemas/Role");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { name, email, roles } = req.body;

  try {
    const isValidID = mongoose.Types.ObjectId.isValid(id);
    if (!isValidID) {
      return res.status(400).json({ msg: "Invalid ID" });
    }
    const existUser = await User.findById(id);

    if (!existUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const rolesFound = await Role.find({ name: { $in: roles } }).select("_id");

    if (rolesFound.length === 0) {
      response(res, 400, { msg: "Some roles do not exist" });
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { name, email, roles: rolesFound.map((role) => role._id) },
      { new: true }
    );
    response(res, 200, {
      msg: "User updated",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    response(res, 500, { msg: "Internal server error" });
  }
};
