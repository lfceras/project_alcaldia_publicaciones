const bcrypt = require("bcryptjs")

const comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

module.exports = comparePassword