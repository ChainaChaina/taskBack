module.exports = app => {
  const task = require("../controllers/task.controller.js");

  var router = require("express").Router();

  // Create a new task
  router.post("/", task.create);

  // Retrieve all tasks
  router.get("/", task.findAll);

  // Retrieve a single task with id
  router.get("/:id", task.findOne);

  // Update a task with id
  router.put("/:id", task.update);

  // Delete a task with id
  router.delete("/:id", task.delete);

  // Delete all tasks
  router.delete("/", task.deleteAll);

  app.use("/api/tasks", router);
};
