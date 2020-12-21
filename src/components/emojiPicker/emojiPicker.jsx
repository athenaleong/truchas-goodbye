import React, {useState, useEffect} from 'react';
import { Emoji, Picker } from "emoji-mart";
import {EmojiButton} from './style';
import "emoji-mart/css/emoji-mart.css";

function EmojiPicker(props) {

    const {setValue, register} = props;

    const [pickerShow, setPickerShow] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('pushpin');

    const onSelect = ((emoji) => {
        try {
            setSelectedEmoji(emoji.id);
            setPickerShow(false);            
        }
        catch (error) {
            console.log(`error: ${error}`)
        }

    })

    const onClick = (() => {
        setPickerShow(true);
    })

    useEffect(() => {
        register({name: 'emoji'});
    }, [])

    useEffect(() => {
        setValue("emoji", selectedEmoji);
    }, [selectedEmoji])


    //to do pass most popular emoji as recent
    return (
        <div>
            <EmojiButton onClick={onClick}> 
                {selectedEmoji && <Emoji emoji={selectedEmoji}size={16}/>}
            </EmojiButton>
            {pickerShow && <Picker set="apple" onSelect={onSelect} showPreview={false} showSkinTones={false} emoji="" /> }
        </div>


    )}

export default EmojiPicker;
