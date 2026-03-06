const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {

try {

const { message } = req.body;

const comment = await Comment.create({
task: req.params.taskId,
user: req.user.id,
message
});

res.status(201).json(comment);

} catch (error) {

res.status(500).json({ error: error.message });

}

};

exports.getComments = async (req, res) => {

try {

const comments = await Comment.find({
task: req.params.taskId
}).populate("user", "name email");

res.json(comments);

} catch (error) {

res.status(500).json({ error: error.message });

}

};