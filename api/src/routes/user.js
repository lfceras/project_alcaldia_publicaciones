const {Router} = require("express")
const {getAllUsers, getUsersById,updateUser, deleteUser} = require("../controllers/user")
const router = Router()

router.get("/getusers", getAllUsers)
router.get("/getusers/:id", getUsersById)
router.patch("/getusers/:id", updateUser)
router.delete("/getusers/:id", deleteUser)


module.exports = router