import React from 'react';
import { useState, useRef } from 'react';

import Card from '../Card';
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
        const copyListItems = [...cards];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setCards(copyListItems);
    };
     
    

    const onAddCard = () => {
        const cardsCopy = cards;
        cardsCopy.push({id: cardsCopy.length + 1, title: '', tasks: []});
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
                <div
                    draggable
                    onDragStart={(e) => dragStart(e, index)}
                    onDragEnter={(e) => dragEnter(e, index)}
                    onDragEnd={drop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <Card 
                        key={cardData.id} 
                        cardData={cardData}
                        onDeleteCard={() => onDeleteCard(cardData.id)}
                        updateCard={onUpdateCard}                        
                    />
                </div>)
            }
            <button className="addCard" onClick={onAddCard}>+</button>
        </div>
    )
}

export default TaskBoard;