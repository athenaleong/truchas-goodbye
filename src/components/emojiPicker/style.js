import styled from 'styled-components';
import { Emoji, Picker } from "emoji-mart";


export const EmojiButton = styled.div`
    width: max(4vw, 48px);
    height: max(4vw, 48px);
    background-color: #F2F2F2;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items:center;
`

export const PickerStyled = styled(Picker)`
    
`;

export const TestDiv = styled.div`
    position: fixed;
    z-index: 10000000;
`;

export const EmojiStyled = styled(Emoji)`

`;