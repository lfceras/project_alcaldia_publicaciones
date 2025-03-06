const {Role} = require("../../schemas/Role.js");
const User = require("../../schemas/User.js");
const comparePassword = require("../../helpers/comparePassword.js");
const jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    let finded = await User.findOne({
      email,
    }).populate("roles");

    if (!finded) {
      return res.status(400).json({
        msg: "Usuario no encontrado",
      });
    }

    const match = await comparePassword(password, finded.password);

    if (!match) {
      return res.status(400).json({
        msg: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      {
        id: finded._id,
        roles: finded.roles.map((role) => role._id),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      }
    );
    res.status(200).json({
      msg: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
  