const mongoose = require("mongoose");
const { response } = require("../../../utils");
const User = require("../../schemas/User");

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    const isValidID = mongoose.Types.ObjectId.isValid(id); 
    if (!isValidID) {
      return res.status(400).json({ msg: "Invalid ID" });
    }
    const existUser = await User.findById (id);

    if (!existUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    response(res, 200, {
      msg: "User deleted",
      deletedUser,
    });
  } catch (error) {
    console.error(error);
    response(res, 500, { msg: "Internal server error" });
  }
};
