import React, { useState, useRef } from 'react';

import Card from '../Card';
import Draggable from '../Draggable';
import './TaskBoard.css';
import { mockCards } from '../../lib/mockData';

function TaskBoard() {
  const [cards, setCards] = useState(mockCards);
  const draggedItem = useRef();
  const draggedOverItem = useRef();

  const dragStart = (index) => {
    draggedItem.current = index;
  };

  const dragEnter = (index) => {
    draggedOverItem.current = index;
  };

  const drop = () => {
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
    cardsCopy.push({ id: Date.now().toString(), title: '', tasks: [] });
    setCards([...cardsCopy]);
  };

  const onUpdateCard = (cardData) => {
    const cardsCopy = cards;
    const indexOfUpdatedCard = cards.findIndex((item) => item.id === cardData.id);

    cardsCopy[indexOfUpdatedCard] = cardData;
    setCards([...cardsCopy]);
  };

  const onDeleteCard = (id) => {
    const cardsCopy = cards;
    const indexOfDeletedCard = cards.findIndex((item) => item.id === id);

    cardsCopy.splice(indexOfDeletedCard, 1);
    setCards([...cardsCopy]);
  };

  return (

    <div className="taskBoard">
      {
                cards.map((cardData, index) => (
                  <Draggable
                    dragEnter={dragEnter}
                    dragStart={dragStart}
                    drop={drop}
                    index={index}
                  >
                    <Card
                      key={cardData.id}
                      cardData={cardData}
                      onDeleteCard={() => onDeleteCard(cardData.id)}
                      updateCard={onUpdateCard}
                    />
                  </Draggable>
                ))
            }
      <button className="addCard" onClick={onAddCard} type="button">+</button>
    </div>
  );
}

export default TaskBoard;
