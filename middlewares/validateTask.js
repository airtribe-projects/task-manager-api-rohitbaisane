const validateTask = (req, res, next) => {
  const task = req.body;
  if (
    !(
      task &&
      task.title &&
      task.description &&
      typeof task.completed == "boolean"
    )
  ) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }
  next();
};

module.exports = validateTask;
