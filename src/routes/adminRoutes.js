const express = require("express");
const router = express.Router();

const { updateUserDetails, deleteUser } = require("../controllers/adminControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.put("/users/:id", authMiddleware, roleMiddleware("admin"), updateUserDetails);
router.delete("/users/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

module.exports = router;
