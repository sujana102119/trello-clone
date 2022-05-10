import React from 'react';
import { useState } from 'react';
import './EditableTitle.css';

function EditableTitle(props) {

    const { title, onUpdate} = props;

    const [editing, setEditing] = useState(false);

    const onEditClick = (event) => {
        if (event.detail === 2) { // check for double-click
            setEditing(true);
        }
    }

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            setEditing(false);
        }
    }

    return (
        editing ? 
        <input 
            className="editableTitle" 
            autoFocus 
            onChange={onUpdate} 
            onBlur={() => setEditing(false)} 
            onKeyDown={onKeyDown}
            value={title}>
        </input> 
        : 
        <h1 
            className="editableTitle" 
            onClick={onEditClick}>
                {title|| 'Double-click to add title'}
        </h1>
    )
}

export default EditableTitle;