const { model, Schema } = require("mongoose");

const taskSchema = new Schema({
    id: Number,
    body: String,
    completed: Boolean,
    created_at: Date,
    upated_at: Date,
});


module.exports.taskSchema = taskSchema;
module.exports.Task = model("Task", taskSchema);
