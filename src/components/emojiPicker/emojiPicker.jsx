import React, {useState, useEffect} from 'react';
import { Picker } from "emoji-mart";
import {EmojiButton} from './style';
import "emoji-mart/css/emoji-mart.css";

function EmojiPicker(props) {

    const [pickerShow, setPickerShow] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);


    const onSelect = ((emoji) => {
        console.log(emoji.unified);
        setSelectedEmoji(emoji.unified);
        setPickerShow(false);
        console.log(`pickerrr ${pickerShow}`)

    })

    const onClick = (() => {
        console.log('what');
        setPickerShow(true);
    })

    //to do pass most popular emoji as recent
    return (
        <div>
            <EmojiButton onClick={onClick}> 
                {selectedEmoji && String.fromCodePoint('0x' + selectedEmoji)}
            </EmojiButton>
            {pickerShow && <Picker set="apple" onSelect={onSelect} showPreview={false}/> }
        </div>


    )}

export default EmojiPicker;
