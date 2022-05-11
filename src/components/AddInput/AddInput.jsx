import React, { useState } from 'react';
import './AddInput.css';
import PropTypes from 'prop-types';

function AddInput(props) {
  const { onAddInput } = props;

  const [newTask, setNewTask] = useState(null);

  const onInputChange = (event) => {
    const update = event.target.value;
    setNewTask(update);
  };

  const onKeyDown = (event) => {
    if(event.key === 'Enter') {
      onAddClick();
    }
  }

  const onAddClick = () => {
    onAddInput(newTask);
    setNewTask('');
  };

  return (
    <span className="addTask">
      <input
        className="newTaskTitle"
        type="text"
        placeholder="Add Task"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={newTask}
      />
      <button
        type="button"
        disabled={!newTask}
        className="addTaskButton"
        onClick={onAddClick}
      >
        +
      </button>
    </span>
  );
}

AddInput.propTypes = {
  onAddInput: PropTypes.func.isRequired,
};

export default AddInput;
