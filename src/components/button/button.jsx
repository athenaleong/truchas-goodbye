import React from 'react';
import {ToggleButton} from './style'

function ToggleEditButton(props) {
    const {onClick, editMode} = props;
    return (
        <ToggleButton onClick={onClick} className={editMode? 'edit' : null}> 
            Edit
        </ToggleButton>
    )
}

export {ToggleEditButton};