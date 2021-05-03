import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

export const ImageBox = styled.div`
    border-radius:32px;
    height: calc((50vw - 108px - 96px) / 4 * 3);
    display: flex;
    justify-content: center;
`;

export const CarouselBox = styled.div`
    background: none;
    margin-bottom: 4vh;


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

export const CarouselSkeleton = styled(Skeleton)`
    height : calc((50vw - 108px - 96px) / 4 * 3);
    border-radius: 32px !important;

    @media (max-width: 900px) {
        height : calc((50vw - 54px - 48px) / 4 * 3);
    }
`;