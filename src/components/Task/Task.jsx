import React, { useState } from 'react';
import './Task.css';
import PropTypes from 'prop-types';

function Task(props) {
  const { taskData, onUpdateTask, onDeleteTask } = props;
  const { title } = taskData;
  const [editing, setEditing] = useState(false);

  const onEditing = () => {
    setEditing(true);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
    }
  };

  const onUpdateTaskTitle = (event) => {
    onUpdateTask({ ...taskData, title: event.target.value });
  };

  return (
    <div className="task">
      { editing
        ? (
          <input
            className="taskTitle"
            autoFocus
            onChange={onUpdateTaskTitle}
            onBlur={() => setEditing(false)}
            onKeyDown={onKeyDown}
            value={title}
          />
        )
        : <h1 className="taskTitle">{title}</h1>}
      <span>
        <button
          type="button"
          className="buttons"
          disabled={editing}
          onClick={onEditing}
        >
          <span
            className="material-icons smallIcon"
          >
            edit
          </span>
        </button>
        <button
          type="button"
          className="buttons"
          onClick={onDeleteTask}
        >
          <span
            className="material-icons red smallIcon"
          >
            clear
          </span>
        </button>
      </span>
    </div>
  );
}

Task.defaultProps = {
  taskData: {},
};

Task.propTypes = {
  taskData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
