import styled from 'styled-components';
import { Emoji } from "emoji-mart";

export const GoogleMap = styled.div`
    width: 100%;
    height: 76vh;
    overflow: hidden;
    filter: drop-shadow(20px 20px 60px #CECECE), drop-shadow(-20px -20px 60px #FFFFFF);
    border-radius: 32px;
`;

export const ClusterMarker = styled.div `
    color: #fff;
    background-color: #1978c8;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SingleMarker = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    padding: 4px;
    border-radius: 50%;
    background-color: White;
    transition: ease 0.2s;


    &.selected {
        background-color: Tomato;
    }

    &:hover {
        // width: 40px;
        // height:40px
        transform: scale(1.3);
        transition: ease 0.1s;

    }
`;

// export const EmojiStyled = styled.Emoji.attrs(props => ({



// }))`



// `