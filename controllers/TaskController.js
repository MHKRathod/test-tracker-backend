const Task = require("../models/Task");

exports.createTask = async (req, res) => {

try {

const { title, description } = req.body;

const task = await Task.create({
title,
description,
createdBy: req.user.id
});

res.status(201).json(task);

} catch (error) {

res.status(500).json({ error: error.message });

}

};

exports.getTasks = async (req, res) => {

try {

const { status, search } = req.query;

let query = { createdBy: req.user.id };

if (status) {
query.status = status;
}

if (search) {
query.title = { $regex: search, $options: "i" };
}

const tasks = await Task.find(query);

res.json(tasks);

} catch (error) {

res.status(500).json({ error: error.message });

}

};


exports.updateTask = async (req, res) => {

try {

const task = await Task.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);

res.json(task);

} catch (error) {

res.status(500).json({ error: error.message });

}

};


exports.deleteTask = async (req, res) => {

try {

await Task.findByIdAndDelete(req.params.id);

res.json({ message: "Task deleted successfully" });

} catch (error) {

res.status(500).json({ error: error.message });

}

};