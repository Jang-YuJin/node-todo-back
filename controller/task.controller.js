const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const {task, isComplete} = req.body;
        const newTask = new Task({task, isComplete});
        await newTask.save();
    
        res.status(200).json({status: 'ok', data: newTask});
    } catch (error) {
        res.status(400).json({status: 'fail', error: error});        
    }
};

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select('-__v');
        res.status(200).json({status: 'ok', data: taskList});
    } catch (error) {
        res.status(400).json({status: 'fail', error: error});
    }
};

taskController.updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const {isComplete} = req.body;
        const task = await Task.findById(id);
        task.isComplete = isComplete;
        const updateTask = await task.save();

        if(!updateTask){
            res.status(400).json({status: 'fail', message: 'Task not Found'});
        }

        res.status(200).json({status: 'ok', data: updateTask});
    } catch (error) {
        res.status(400).json({status: 'fail', error: error});
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        await Task.findByIdAndDelete(id);
        res.status(200).json({status: 'ok', data: {_id: id}});
    } catch (error) {
        res.status(400).json({status: 'fail', error: error});
    }
};

module.exports = taskController;