import React from 'react';
import './Draggable.css';
import PropTypes from 'prop-types';

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

Draggable.propTypes = {
    index: PropTypes.number, 
    dragStart: PropTypes.func, 
    dragEnter: PropTypes.func,
    drop: PropTypes.func
}

export default Draggable;