const { model, Schema } = require("mongoose");
const { taskSchema } = require('./task');

const phaseSchema = new Schema({
    id: Number,
    name: String,
    completed: Boolean,
    created_at: Date,
    tasks: [taskSchema]
});

module.exports = model("Phase", phaseSchema);
