import React, {useState, useEffect} from 'react';
import { Emoji, Picker } from "emoji-mart";
import {EmojiButton, PickerStyled, TestDiv, EmojiStyled} from './style';
import "emoji-mart/css/emoji-mart.css";
// import { TestDiv } from '../drawer/style';


function EmojiPicker(props) {

    const {setValue, register, defaultValue} = props;

    const [pickerShow, setPickerShow] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(defaultValue || 'pushpin');

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
        setPickerShow(!pickerShow);
    })

    useEffect(() => {
        register({name: 'emoji', required: true});
    }, [])

    useEffect(() => {
        setValue("emoji", selectedEmoji);
    }, [selectedEmoji])


    //to do pass most popular emoji as recent
    return (
        <div>
            <EmojiButton onClick={onClick}> 
                {selectedEmoji && <EmojiStyled emoji={selectedEmoji}size={28}/>}
            </EmojiButton>
            <TestDiv>
            {pickerShow && 
                <PickerStyled set="apple" onSelect={onSelect} showPreview={false} showSkinTones={false} emoji="" /> }
            </TestDiv>
        </div>


    )}

export default EmojiPicker;
