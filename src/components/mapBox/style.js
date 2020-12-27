import styled from 'styled-components';
import Geocoder from 'react-map-gl-geocoder';


export const MapBox = styled.div`
    width: 100%;
    height: 76vh;
    overflow: hidden;
    filter: drop-shadow(20px 20px 60px #CECECE), drop-shadow(-20px -20px 60px #FFFFFF);
    border-radius: 32px;
`;

export const ClusterMarker = styled.div `
    color: #fff;
    background-color: #3D664B;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SingleMarker = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    padding: 5px;
    border-radius: 50%;
    background-color: White;
    transition: ease-in 0.15s;

    &:hover {
        transform: scale(1.4);
        transition: ease-out 0.15s;
    }

    &.selected {
        background-color: Tomato;
    }
`;

export const GeocoderStyled = styled(Geocoder)`

    &:hover {
        background-color: tomato;
    }
    > * > .mapboxgl-ctrl-top- {
        background-color: tomato;
    }
`;