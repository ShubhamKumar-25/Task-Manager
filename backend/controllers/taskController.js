const task = require("../models/TaskModel");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await task.find();
        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching tasks",
            error: err.message
        });
    }
};

const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = await task.findById(taskId);
        if (!taskData) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Task fetched successfully",
            task: taskData
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching task",
            error: err.message
        });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, priority, status, dueDate } = req.body;

        const newTask = new task({
            title,
            description,
            priority,
            status,
            dueDate
        });

        const saveTask = await newTask.save();

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: saveTask
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, priority, status, dueDate } = req.body;

        const updatedTask = await task.findByIdAndUpdate(
            taskId,
            { title, description, priority, status, dueDate },
            { returnDocument: 'after', runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error updating task",
            error: err.message
        });
    }
};

const patchTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = await task.findByIdAndUpdate(
            taskId,
            req.body,
            { returnDocument: 'after', runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            task: deletedTask
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    patchTask,
    deleteTask
};