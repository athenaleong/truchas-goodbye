import React from 'react';
import {ToggleButton, ButtonImg} from './style'

function ToggleEditButton(props) {
    const {onClick, editMode} = props;
    return (
        <ToggleButton onClick={onClick} className={editMode? 'edit' : null} position='top-right'> 
            <ButtonImg src={editMode? "https://i.ibb.co/SNLYVL7/edit-add-white.png" : "https://i.ibb.co/8Kw40tv/edit-add-green.png" } />
        </ToggleButton>
    )
}

export {ToggleEditButton};
