import React from 'react';
import { useState } from 'react';

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
                cards.map((cardData) => 
                    <Card 
                        key={cardData.id} 
                        cardData={cardData}
                        onDeleteCard={() => onDeleteCard(cardData.id)}
                        updateCard={onUpdateCard}
                    />)
            }
            <button className="addCard" onClick={onAddCard}>+</button>
        </div>
    )
}

export default TaskBoard;