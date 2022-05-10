import React from 'react';
import { useState } from 'react';
import './AddInput.css';

function AddInput(props) {

    const { onAddInput } = props;

    const [newTask, setNewTask] = useState(null);


    const onInputChange = (event) => {
        const update = event.target.value;
        setNewTask(update);
    }

    const onAddClick = () => {
        onAddInput(newTask);
        setNewTask('');
     }

    return (
        <span className="addTask">
                    <input 
                        className="newTaskTitle" 
                        type="text" 
                        placeholder="Add Task" 
                        onChange={onInputChange} 
                        value={newTask}>
                    </input>
                    <button 
                        disabled={!newTask} 
                        className="addTaskButton" 
                        onClick={onAddClick}>
                            +
                    </button>
                </span>
    );
}

export default AddInput;