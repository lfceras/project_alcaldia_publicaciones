const mongoose = require("mongoose")
const roles = ["user", "admin", "moderator"]
const roleSchema = mongoose.Schema({
  name : {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = {
  Role: mongoose.model("Role", roleSchema),
  Roles: roles
}