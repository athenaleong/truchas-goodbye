import styled from 'styled-components';

export const ToggleButton =styled.button`
    color: #F2F2F2;
    box-shadow: 10px 10px 60px #CECECE, -20px -20px 60px #FFFFFF;
    top: 3px;
    right: 3px;
    border-radius: 16px;
    height 100%;
    padding: 8px;
    width: 4vw;
    display: flex;
    justify-content: center;
    border-width: 0px;
    
    &:focus {
        outline: 0px;
    }

    &.edit {
        background-color: #396A65;
        border-width: 0px;

    }


`;

export const ButtonImg = styled.img`
    // width: 100%;
    height: 100%;


`