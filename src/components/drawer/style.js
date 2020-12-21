import styled from 'styled-components';

export const SideDrawer = styled.div`
    position: fixed;
    width: calc(50% - 108px);
    transform: translateX(calc(100% + 72px));
    transition: transform 0.4s ease-in-out;
    top: 0;
    right: 0;
    display:flex;
    flex-direction: column;
    // padding-left: calc(40% * 0.10) ; 
    background-color: #f2f2f2;
    box-shadow: -2px 5px 30px #CECECE, -30px -2px 60px rgba(247, 247, 247, 0.6);
    border-radius: 32px;
    margin-left: 36px;
    margin-right: 72px;
    margin-top: 6vh;
    margin-bottom: 6vh;
    height: 88vh;
    // justify-content: space-evenly;
    // align-items: space-evenly;
    padding-top: 4vh;

    
    &.open {
        transform: translateX(0);
    }
`;

export const Title = styled.h1`
    font-family: 'Sarabun', sans-serif;
    font-size: 32px;
    line-height: 42px;
    letter-spacing: -0.01em;
    // margin-top: 5vh;
    margin-bottom: 3vh;
    vertical-align: middle;

`;

export const DescriptionText = styled.p`
    font-family: Open Sans;
    font-size: 18px;
    line-height: 25px;
`;

export const Description = styled.p`
    padding-left: 48px;
    padding-right:48px;
    display: flex;
    flex-direction: row;
    justify-content:center;
`;

export const Icon = styled.img`
    width: 24px;
    height: 24px;
`;


export const Image = styled.img`
    border-radius: 32px;
`