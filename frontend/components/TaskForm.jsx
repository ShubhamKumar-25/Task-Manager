import { useEffect, useState } from "react";

function TaskForm({ onTaskCreated, editingTask, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        priority: editingTask.priority || "Medium",
        status: editingTask.status || "Pending",
        dueDate: editingTask.dueDate ? editingTask.dueDate.split("T")[0] : "",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onTaskCreated(formData);

    if (!editingTask) {
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
      });
    }
  };

  return (
    <div className="task-form">
      <h2>{editingTask ? "Update Task" : "Create New Task"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingTask ? "Update Task" : "Create Task"}
        </button>

        {editingTask && (
          <button type="button" onClick={onCancelEdit} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskForm;
