// Ye decide karta hai request ko kahan bhejna hai.

const express = require("express");
const router = express.Router();

const { registerValidation } = require("../middleware/validation");
const { auth } = require("../middleware/auth");

const {
    register,
    getUsers,
    updateUser,
    deleteUser,
    login
} = require("../controller/authController");

router.post("/register",registerValidation,register);

router.put("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

router.post("/login", login);

router.get("/users", auth, getUsers);


module.exports = router;