import styled from 'styled-components';

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

    &:hover {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: Tomato;
    }
`;
