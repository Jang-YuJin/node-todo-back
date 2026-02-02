const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
    task: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true
    },
    completeDt: {
        type: Date
    }
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;