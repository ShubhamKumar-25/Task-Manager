
const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending"
        },

        dueDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;