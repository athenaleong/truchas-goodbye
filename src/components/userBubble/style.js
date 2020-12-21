import styled from 'styled-components';

export const UserBox = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 3vh;
`;

export const Bubble = styled.img`
    max-width:45px;
    max-height:45px;
    width: 4vw;
    height: 4vw;
    border-radius:50%;
    margin-left: 0.833vw;
    overflow: hidden;
`;

export const MoreBubble = styled(Bubble)`

    &:hover {
        transform: scale(0.9);
        transition: ease-out 0.15s;
    }

`;