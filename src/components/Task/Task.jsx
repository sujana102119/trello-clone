import React from 'react';
import { useState } from 'react';
import './Task.css';

function Task(props) {
    const { taskData, onUpdateTask, onDeleteTask } = props;
    const {title} = taskData;
    const [editing, setEditing] = useState(false);

    const onEditing = () => {
        setEditing(true);
    }

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            setEditing(false);
        }
    }

    const onUpdateTaskTitle = (event) => {
        onUpdateTask({...taskData, title: event.target.value})
    }

    return (
        <div className="task">
            { editing ? 
                <input 
                    className="taskTitle" 
                    autoFocus 
                    onChange={onUpdateTaskTitle} 
                    onBlur={() => setEditing(false)} 
                    onKeyDown={onKeyDown}
                    value={title}>
                </input> 
              :  <h1 className="taskTitle">{title}</h1>
            }
            <span>
                <button 
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
    )
}

export default Task;