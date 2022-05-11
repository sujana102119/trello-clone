import React from 'react';
import Task from '../Task';
import AddInput from '../AddInput';
import EditableTitle from '../EditableTitle';
import Draggable from '../Draggable';
import './Card.css';
import {useRef} from 'react';

function Card(props) {

    const {cardData, onDeleteCard, updateCard} = props;

    const {title, tasks} = cardData;


    const draggedItem = useRef();
    const draggedOverItem = useRef();


    const dragStart = (index) => {
        draggedItem.current = index;
      };

    const dragEnter = (index) => {
        draggedOverItem.current = index;
    };

    const drop = (e) => {
        const tasksCopy = [...tasks];
        const draggedItemValue = tasksCopy[draggedItem.current];
        tasksCopy.splice(draggedItem.current, 1);
        tasksCopy.splice(draggedOverItem.current, 0, draggedItemValue);
        draggedItem.current = null;
        draggedOverItem.current = null;
        updateCard({...cardData, tasks: [...tasksCopy]});
    };

    const onAddTask = (taskTitle) => {
        const tasksCopy = tasks;
        tasksCopy.push({id: Date.now().toString(), title: taskTitle});
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
            {tasks.map((taskData, index) => 
                <Draggable
                    dragStart ={dragStart}
                    dragEnter={dragEnter}
                    drop={drop}
                    index={index}
                >
                    <Task 
                        key={taskData.id} 
                        taskData={taskData}
                        onUpdateTask={onUpdateTask}
                        onDeleteTask={() => onDeleteTask(taskData.id)}
                    />
                </Draggable>)
            }
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