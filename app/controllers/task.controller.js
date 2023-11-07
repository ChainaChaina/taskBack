const db = require("../models");
const task = db.task;

// Create and Save a new task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a task
  const task = new db.task({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save task in the database
  task
    .save(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the task."
      });
    });
};

// Retrieve all tasks from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  task.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};

// Find a single task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  task.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found task with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving task with id=" + id });
    });
};

// Update a task by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update task with id=${id}. Maybe task was not found!`
        });
      } else res.send({ message: "task was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating task with id=" + id
      });
    });
};

// Delete a task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  task.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete task with id=${id}. Maybe task was not found!`
        });
      } else {
        res.send({
          message: "task was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete task with id=" + id
      });
    });
};

// Delete all tasks from the database.
exports.deleteAll = (req, res) => {
  task.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} tasks were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tasks."
      });
    });
};

