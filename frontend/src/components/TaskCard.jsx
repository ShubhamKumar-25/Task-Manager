function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>

        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <p>{task.description}</p>

      <div className="task-info">
        <span>
          Status: <strong>{task.status}</strong>
        </span>

        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>

        <button onClick={() => onDelete(task._id)} className="delete-btn">
          Delete
        </button>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="Pending">Pending</option>

          <option value="In Progress">In Progress</option>

          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}

export default TaskCard;
