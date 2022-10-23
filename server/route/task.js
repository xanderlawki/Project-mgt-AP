const router = require("express").Router();

const { getAllTask, createTask, updateTask } = require("../controller/task");

router.get("/:clientId", getAllTask);
router.post("/", createTask);
router.patch("/", updateTask);

module.exports = router;
