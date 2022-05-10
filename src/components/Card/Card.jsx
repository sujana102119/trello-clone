import React from 'react';
import Task from '../Task';
import AddInput from '../AddInput';
import EditableTitle from '../EditableTitle';
import './Card.css';
import {useRef} from 'react';

function Card(props) {

    const {cardData, onDeleteCard, updateCard} = props;

    const {title, tasks} = cardData;

    const dragItem = useRef();
    const dragOverItem = useRef();


    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
      };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };

    const drop = (e) => {
        const copyListItems = [...tasks];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        updateCard({...cardData, tasks: [...copyListItems]});
    };

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
            {tasks.map((taskData, index) => 
               <div
               draggable
               onDragStart={(e) => dragStart(e, index)}
               onDragEnter={(e) => dragEnter(e, index)}
               onDragEnd={drop}
               onDragOver={(e) => e.preventDefault()}
           >
                <Task 
                    key={taskData.id} 
                    taskData={taskData}
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={() => onDeleteTask(taskData.id)}
                />
            </div>)}
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