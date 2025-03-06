const {Role} = require("../../schemas/Role.js");
const User = require("../../schemas/User.js");
const encryptPassword = require("../../helpers/encryptPassword.js");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Te falta llenar algunos campos" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    let assignedRoles = [];
    if (roles && roles.length > 0) {
      assignedRoles = await Role.find({ name: { $in: roles } }).select("_id");

      if (assignedRoles.length === 0) {
        return res.status(400).json({ msg: "Algunos roles no existen" });
      }
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      assignedRoles = [defaultRole._id];
    }

    const encryptedPassword = await encryptPassword(password);

    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
      roles: assignedRoles.map((role) => role._id),
    });

    await newUser.save();
    const populatedUser = await User.findById(newUser._id).populate(
      "roles",
      "name"
    );
    const token = jwt.sign(
      {
        id: newUser._id,
        roles: populatedUser?.roles.map((role) => role.name),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      }
    );
    res.status(201).json({
      msg: "Usuario creado exitosamente",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
