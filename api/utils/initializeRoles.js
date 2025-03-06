const { Roles, Role } = require("../src/schemas/Role.js");

module.exports = async () => {
  try {
    for (let roleName of Roles) {
      const roleExist = await Role.findOne({ name: roleName });
      if (!roleExist) {
        await new Role({ name: roleName }).save();
      }
    }
  } catch (error) {
    console.error(error);
  }
};
