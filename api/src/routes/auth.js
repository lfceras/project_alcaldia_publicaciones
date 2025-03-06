const { Router } = require("express");
const router = Router();
const { login, newUser } = require("../controllers/auth");
const {
  isAdmin,
  isAuthenticated,
  verifySignup,
  checkUserExist,
} = require("../middlewares");

router.post(
  "/newuser",
  [isAuthenticated, isAdmin, verifySignup, checkUserExist],
  newUser
);
router.post("/login", login);

module.exports = router;
