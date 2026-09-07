// const task = require("../models/TaskModel");

// // Fecteched All Data
// const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await task.find();
//         res.status(200).json({
//             success: true,
//             message: "Tasks fetched successfully",
//             tasks
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Error fetching tasks",
//             error: err.message
//         });
//     }
// };

// // Fecteched Data from User Id 
// const getTaskById = async (req, res) => {
//     try {
//         const taskId = req.params.id;
//         const taskData = await task.findById(taskId);
//         if (!taskData) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Task not found"
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: "Task fetched successfully",
//             task: taskData
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Error fetching task",
//             error: err.message
//         });
//     }
// };

// // Create a New task
// const createTask = async (req, res) => {
//     try {
//         const { title, description, priority, status, dueDate } = req.body;

//         const newTask = new task({
//             title,
//             description,
//             priority,
//             status,
//             dueDate
//         });

//         const saveTask = await newTask.save();

//         res.status(201).json({
//             success: true,
//             message: "Task created successfully",
//             task: saveTask
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error: err.message
//         });
//     }
// };

// // Update the task
// const updateTask = async (req, res) => {
//     try {
//         const taskId = req.params.id;
//         const { title, description, priority, status, dueDate } = req.body;

//         const updatedTask = await task.findByIdAndUpdate(
//             taskId,
//             { title, description, priority, status, dueDate },
//             { returnDocument: 'after', runValidators: true }
//         );

//         if (!updatedTask) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Task not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Task updated successfully",
//             task: updatedTask
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Error updating task",
//             error: err.message
//         });
//     }
// };

// // partially update task
// const patchTask = async (req, res) => {
//     try {
//         const taskId = req.params.id;
//         const updatedTask = await task.findByIdAndUpdate(
//             taskId,
//             req.body,
//             { returnDocument: 'after', runValidators: true }
//         );

//         if (!updatedTask) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Task not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Task updated successfully",
//             task: updatedTask
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: err.message
//         });
//     }
// };

// // delete the task
// const deleteTask = async (req, res) => {
//     try {
//         const taskId = req.params.id;
//         const deletedTask = await task.findByIdAndDelete(taskId);

//         if (!deletedTask) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Task not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Task deleted successfully",
//             task: deletedTask
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error: err.message
//         });
//     }
// };

// module.exports = {
//     getAllTasks,
//     getTaskById,
//     createTask,
//     updateTask,
//     patchTask,
//     deleteTask
// };










const Task = require("../models/TaskModel");


// GET ALL TASKS
const getAllTasks = async (req, res) => {
    try {

        const tasks = await Task.find({
            user: req.user.userId
        });

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

// GET TASK BY ID
const getTaskById = async (req, res) => {
    try {

        const taskId = req.params.id;

        const taskData = await Task.findOne({
            _id: taskId,
            user: req.user.userId
        });

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

// CREATE TASK
const createTask = async (req, res) => {
    try {

        const {
            title,
            description,
            priority,
            status,
            dueDate
        } = req.body;

        const newTask = new Task({
            title,
            description,
            priority,
            status,
            dueDate,

            // Logged-in user's ID
            user: req.user.userId
        });

        const savedTask = await newTask.save();

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: savedTask
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
};

// PUT
const updateTask = async (req, res) => {
    try {

        const taskId = req.params.id;

        const {
            title,
            description,
            priority,
            status,
            dueDate
        } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: taskId,
                user: req.user.userId
            },
            {
                title,
                description,
                priority,
                status,
                dueDate
            },
            {
                returnDocument: "after",
                runValidators: true
            }
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

// PATCH
const patchTask = async (req, res) => {
    try {

        const taskId = req.params.id;

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: taskId,
                user: req.user.userId
            },
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
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

// DELETE
const deleteTask = async (req, res) => {
    try {

        const taskId = req.params.id;

        const deletedTask = await Task.findOneAndDelete({
            _id: taskId,
            user: req.user.userId
        });

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