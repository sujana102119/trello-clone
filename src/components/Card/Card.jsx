import React from 'react';
import Task from '../Task';
import AddInput from '../AddInput';
import EditableTitle from '../EditableTitle';
import './Card.css';

function Card(props) {

    const {cardData, onDeleteCard, updateCard} = props;

    const {title, tasks} = cardData;

    const onAddTask = (taskTitle) => {
        const tasksCopy = tasks;
        tasksCopy.push({id: tasksCopy.length+1, title: taskTitle});
        updateCard({...cardData, tasks: [...tasksCopy]});
     }

    const onUpdateTask = (taskData) => {
        const tasksCopy = tasks;
        const indexOfUpdatedTask = tasks.findIndex(item => item.id === taskData.id);

        tasksCopy[indexOfUpdatedTask] = taskData;
        updateCard({...cardData, tasks: [...tasksCopy]});
    }

    const onDeleteTask = (id) => {
        const tasksCopy = tasks;
        const indexOfDeletedTask = tasks.findIndex(item => item.id === id);

        tasksCopy.splice(indexOfDeletedTask, 1);
        updateCard({...cardData, tasks: [...tasksCopy]});
    }

    const onUpdateCardTitle = (event) => {
        updateCard({...cardData, title: event.target.value});
    }

    return (
        <div className="card">
            <EditableTitle 
                title={title}
                onUpdate={onUpdateCardTitle}
            />
            {tasks.map((taskData) => 
                <Task 
                    key={taskData.id} 
                    taskData={taskData}
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={() => onDeleteTask(taskData.id)}
                />)}
            <AddInput
                onAddInput={onAddTask}
            />
            <button
                className="deleteCard"
                onClick={onDeleteCard}
            >
                    Delete
            </button>
        </div>

    );
}

export default Card;