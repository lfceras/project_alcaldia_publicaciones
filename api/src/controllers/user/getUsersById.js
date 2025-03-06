const { default: mongoose } = require("mongoose");
const User = require("../../schemas/User");

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }
  let userId = await User.findById(id);
  userId
    ? res.json(userId)
    : res.status(404).json({ message: "User not found" });
};
