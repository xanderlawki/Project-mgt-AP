const router = require("express").Router();

const { handleUserLogin } = require("../controller/auth");

router.post("/login", handleUserLogin);

module.exports = router;
