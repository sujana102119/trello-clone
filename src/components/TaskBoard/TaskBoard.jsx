import React from 'react';
import { useState, useRef } from 'react';

import Card from '../Card';
import Draggable from '../Draggable';
import './TaskBoard.css';

const mockList = [
    {
        id: 1,
        title: 'Grocery Store',
        tasks: [
            {
                id: 1, 
                title: 'Italian Bread',
            },
            {
                id: 2, 
                title: 'Spaghetti',
            },
            {
                id: 3, 
                title: 'Milk',
            },
            {
                id: 4, 
                title: 'Chicken Wings',
            }
        ]
    },
    {
        id: 2,
        title: 'Calc III',
        tasks: [
            {
                id: 1, 
                title: 'Cook',
            },
            {
                id: 2, 
                title: 'Clean',
            }
        ]
    }
    ];


function TaskBoard(props) {

    const [cards, setCards] = useState(mockList);
    const draggedItem = useRef();
    const draggedOverItem = useRef();


    const dragStart = (index) => {
        draggedItem.current = index;
      };

    const dragEnter = (index) => {
        draggedOverItem.current = index;
    };

    const drop = (e) => {
        const cardsCopy = [...cards];
        const draggedItemValue = cardsCopy[draggedItem.current];
        cardsCopy.splice(draggedItem.current, 1);
        cardsCopy.splice(draggedOverItem.current, 0, draggedItemValue);
        draggedItem.current = null;
        draggedOverItem.current = null;
        setCards(cardsCopy);
    };
     
    

    const onAddCard = () => {
        const cardsCopy = cards;
        cardsCopy.push({id: Date.now().toString(), title: '', tasks: []});
        setCards([...cardsCopy]);
    }

    const onUpdateCard = (cardData) => {
        const cardsCopy = cards;
        const indexOfUpdatedCard = cards.findIndex(item => item.id === cardData.id);

        cardsCopy[indexOfUpdatedCard] = cardData;
        setCards([...cardsCopy]);
    }

    const onDeleteCard = (id) => {
        const cardsCopy = cards;
        const indexOfDeletedCard = cards.findIndex(item => item.id === id);

        cardsCopy.splice(indexOfDeletedCard, 1);
        setCards([...cardsCopy]);
    }

    return (

        <div className="taskBoard">
            {
                cards.map((cardData, index) => 
                <Draggable
                    dragStart ={dragStart}
                    dragEnter={dragEnter}
                    drop={drop}
                    index={index}
                >
                    <Card 
                        key={cardData.id} 
                        cardData={cardData}
                        onDeleteCard={() => onDeleteCard(cardData.id)}
                        updateCard={onUpdateCard}                        
                    />
                </Draggable>)
            }
            <button className="addCard" onClick={onAddCard}>+</button>
        </div>
    )
}

export default TaskBoard;