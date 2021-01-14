const router = require("express").Router();
const restrictedMiddleware = require("./middleware/restricted-middlware");
const { createUser, loginUser, getUsers } = require("./users.model");

router.post("/login", loginUser);
router.post("/", createUser);
router.get("/", restrictedMiddleware, getUsers);

module.exports = router;
