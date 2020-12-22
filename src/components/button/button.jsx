import React from 'react';

function ToggleEditButton(props) {
    const {onClick} = props.onClick;
    return (
        <button onClick={onClick}> 
            Edit
        </button>
    )
}

export {ToggleEditButton};