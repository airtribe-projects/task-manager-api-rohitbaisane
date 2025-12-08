const express = require("express");
const router = express.Router();

const validateTask = require("../middlewares/validateTask");

const tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
  },
];

router.get("/tasks", (req, res) => {
  return res.status(200).json(tasks);
});

router.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const task = tasks.find((t) => t.id == id);

  if (!task) return res.status(404).json({ message: "task not found" });
  return res.status(200).json(task);
});

router.post("/tasks", validateTask, (req, res) => {
  const taskInput = req.body;

  const task = {
    title: taskInput.title,
    description: taskInput.description,
    completed: taskInput.completed,
  };
  if (taskInput.id) task.id = taskInput.id;
  else task.id = Math.floor(Math.random() * 100000);
  tasks.push(task);

  return res.status(201).json(task);
});

router.put("/tasks/:id", validateTask, (req, res) => {
  const id = req.params.id;
  const taskInput = req.body;

  let task = tasks.find((t) => t.id == id);
  if (!task) return res.status(404).json({ message: "task not found" });

  task = { ...taskInput };

  return res.status(200).json(task);
});

router.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;

  const findIndex = tasks.findIndex((t) => t.id == id);
  if (findIndex == -1)
    return res.status(404).json({ message: "task not found" });
  tasks.splice(findIndex, 1);

  return res.status(200).json({ message: "task deleted succesffully" });
});

module.exports = router;
