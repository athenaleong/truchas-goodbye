import styled from 'styled-components';

export const SideDrawer = styled.div`
    position: fixed;
    width: 40%;
    transform: translateX(90%);
    transition: transform 0.4s ease-in-out;
    top: 0;
    right: 0;
    height: 100%;
    display:flex;
    flex-direction: column;
    padding-left: calc(40% * 0.10) ;
    background-color: #f2f2f2;
    box-shadow: -2px 5px 30px #CECECE, -30px -2px 60px rgba(247, 247, 247, 0.6);
    border-radius: 32px;

    &.open {
        transform: translateX(0);
    }
`;