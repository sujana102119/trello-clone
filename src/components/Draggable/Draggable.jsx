import React from 'react';
import {useRef} from 'react';
import './Draggable.css';

function Draggable(props) {
    const {index, dragStart, dragEnter, drop} = props;

    return (
        <div
            draggable
            onDragStart={() => dragStart(index)}
            onDragEnter={() => dragEnter(index)}
            onDragEnd={drop}
            onDragOver={(e) => e.preventDefault()}
        >
            {props.children} 
        </div>
    );
}

export default Draggable;