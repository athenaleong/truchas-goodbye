import styled from 'styled-components';

export const ImageBox = styled.div`
    border-radius:32px;
    // margin-left: 48px;
    // margin-right:48px;
    height: calc((50vw - 108px - 96px) / 4 * 3);
    display: flex;
    justify-content: center;

`;

export const Image = styled.img`
    // border-radius:32px;
    // width: 50%;
    // height: 100%;
`;

export const CarouselBox = styled.div`
    background: none;
    padding-left: 48px;
    padding-right:48px;

    .carousel .slide {
        background:none;
    }

    .carousel .slide img {
        height: 100%;
        width: auto;
        border-radius:32px;
        object-fit:cover;

    }
`;