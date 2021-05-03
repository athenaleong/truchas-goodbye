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
    background-color: #f2f2f2;
    box-shadow: -2px 5px 30px #CECECE, -30px -2px 60px rgba(247, 247, 247, 0.6);
    border-radius: 32px;
    margin-left: 36px;
    margin-right: 72px;
    margin-top: 6vh;
    margin-bottom: 6vh;
    height: 88vh;
    justify-content: space-evenly;
    align-items: space-evenly;
    padding-top: 4vh;

    &.open {
        transform: translateX(0);
    }

    @media (max-width: 900px) {
        margin-left: 18px;
        margin-right: 36px;
        width: calc(50% - 54px);


    }
`;

export const Title = styled.p`
    font-family: 'Sarabun', sans-serif;
    font-size: 32px;
    line-height: 42px;
    letter-spacing: -0.01em;
    text-align: center;
    // margin-top: 5vh;
    width: 100%

    margin-bottom: 3vh;
    verticalalign: middle;

`;

export const Description = styled.div`
    padding-left: 12%;
    padding-right:12%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

export const DescriptionText = styled.p`
    font-family: Open Sans;
    font-size: 16px;
    line-height: 25px;
    width: 100%;
    align-text: start;
    padding-left: 8%;
    // /* Cool Grey 2 */
    color: #606F7B;
    // max-height: calc(70vh - min(4vw, 45px) - 80px - calc((50vw - 108px - 96px) / 4 * 3));
    overflow: scroll;
    text-align: left;
`;

export const Icon = styled.img`
    width: 24px;
    height: 24px;
    margin-top: 10px
`;


export const Image = styled.img`
    border-radius: 32px;
`;

export const EditBox = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 5%
    position: fixed;
    bottom: 0;
    padding-bottom: 4vh;
    padding-right: 4vh;
    cursor: pointer;
`;
export const EditIcon = styled(Icon)`
    background-color: white;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    padding: 6px;
    margin-top: auto;

    &:hover {
        transform: scale(0.9);
        transition: ease-out 0.15s;
    }
`;
