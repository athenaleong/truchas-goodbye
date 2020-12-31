import styled from 'styled-components';

export const ToggleButton =styled.button`
    background-color: #F2F2F2;
    box-shadow: 10px 10px 60px #CECECE, -20px -20px 60px #FFFFFF;
    height: 5vw;
    width: 5vw;
    position: absolute;
    top: 3px;
    right: 3px;
    border-radius: 16px;

    &.edit {
        background-color: tomato;
    }
`;