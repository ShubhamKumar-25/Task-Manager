import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const [message, setMessage] = useState("");

  // =====================
  // FETCH TASKS
  // =====================

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");

      setTasks(response.data.tasks);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // =====================
  // CREATE / UPDATE
  // =====================

  const handleTaskSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, taskData);

        setMessage("Task updated successfully");

        setEditingTask(null);
      } else {
        await API.post("/tasks", taskData);

        setMessage("Task created successfully");
      }

      fetchTasks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  // =====================
  // DELETE
  // =====================

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${taskId}`);

      setMessage("Task deleted successfully");

      fetchTasks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error deleting task");
    }
  };

  // =====================
  // STATUS UPDATE
  // =====================

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await API.patch(`/tasks/${taskId}`, {
        status: newStatus,
      });

      setMessage("Status updated");

      fetchTasks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating status");
    }
  };

  // =====================
  // FILTER
  // =====================

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filterStatus === "All" || task.status === filterStatus;

    const priorityMatch =
      filterPriority === "All" || task.priority === filterPriority;

    return statusMatch && priorityMatch;
  });

  return (
    <div>
      <Navbar />

      <main className="dashboard">
        <h1>My Tasks</h1>

        {message && <p className="message">{message}</p>}

        <TaskForm
          onTaskCreated={handleTaskSubmit}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <div className="filters">
          <h2>Filter Tasks</h2>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>

            <option value="Pending">Pending</option>

            <option value="In Progress">In Progress</option>

            <option value="Completed">Completed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All Priority</option>

            <option value="Low">Low</option>

            <option value="Medium">Medium</option>

            <option value="High">High</option>
          </select>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={setEditingTask}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
