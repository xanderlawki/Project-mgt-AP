const Task = require("../models/Task");

const getAllTask = async (req, res) => {
  try {
    const { clientId } = req.params;
    if (!clientId)
      return res
        .status(400)
        .json({ status: "error", message: "task not found" });
    const task = await Task.find({ clientId })
      .populate({
        path: "projectId",
        select: "-__v ",
      })
      .populate({ path: "clientId", select: "-__v " });

    res.status(200).json({ status: "success", data: task });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = await Task.create({ ...req.body });
    return res.status(201).json({
      status: "success",
      data: newTask,
    });
  } catch (error) {
    console.log(error, "errors");
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask)
      return res.status(400).json({ status: "error", data: "no task found" });
    res.status(201).json({
      status: "success",
      data: updatedTask,
    });
  } catch (error) {
    console.log(error, "errors");
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};

exports.getAllTask = getAllTask;
exports.createTask = createTask;
exports.updateTask = updateTask;
