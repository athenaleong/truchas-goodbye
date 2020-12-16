import styled from 'styled-components';

export const AppStyled = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    background-color: #EEEEEE;
    min-height: 100vh;
`;

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    /* width: calc(100% - 40% x 0.10); */
    width: 96%;
    transition: width 0.4s ease-in-out; 
    /* coordinate with drawer.side-drawer */
    min-height: 100%;
    padding-left: 72px;
    padding-right: 72px;
    justify-content: space-evenly;

    &.compress {
        width: 60%;

    }
`;

export const TempSearchBar = styled.div`
    width: 75%;
    max-width: 50vw;
    min-height: 100%;
    background: #F2F2F2;
    box-shadow: 10px 10px 60px #CECECE, -20px -20px 60px #FFFFFF;
    border-radius: 16px;

`;

export const Tools = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;  
    height: 6vh;
    max-height: 64px;

`;
