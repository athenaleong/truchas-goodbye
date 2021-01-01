import styled from 'styled-components';
import Geocoder from 'react-map-gl-geocoder';


export const MapBox = styled.div`
    width: 100%;
    height: 88vh;
    overflow: hidden;
    filter: drop-shadow(20px 20px 60px #CECECE), drop-shadow(-20px -20px 60px #FFFFFF);
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

    display: flex;
    flex-direction: column;
    background-color: tomato;

    &:hover {
        background-color: tomato;
    }

`;

export const SearchBar = styled.div`
    height: fit-content ;
    display: flex;
    justify-content: center;
    padding-left: 4px;
    flex-direction: column;

    &:focus-within{
        .suggestions-wrapper {
            display: block;
        }
    }

    &:hover{
        .suggestions-wrapper {
            display: block;
        }
    }

    .mapboxgl-ctrl {
        display:flex;
        flex-direction: row;
        height: 6vh;
        width: 75%;
        max-width: 50vw;
        background-color: #F2F2F2;
        border-radius: 16px;
        box-shadow : 10px 10px 60px #CECECE, -20px -20px 60px #FFFFFF;
        // align-items: center;
    }

    .suggestions-wrapper {
        z-index: 999;
        position: fixed;
        background-color: white;
        margin-top: 7vh;
        border-radius: 16px;
        width: 50vw;
        display: none;

    }

    .mapboxgl-ctrl-geocoder--input {
        width: 100%;
        background-color: #F2F2F2;
        padding-left: 8px;
        font-family: Sarabun;
        font-weight: 400;
        color: #3D4852;

        :focus{
            outline: none !important; 
        } 
    }


    .suggestions > li  {

        font-family: Sarabun;
        & :hover {
            background-color: #F2F2F2;
        }

    }

    .mapboxgl-ctrl-geocoder--suggestion {
        color: #3D4852;
        text-align: left;
        padding-top: 8px;
        padding-bottom: 8px;
        padding-left: 20px;
        
       
    }
    .mapboxgl-ctrl-geocoder--suggestion-title {
        font-weight: 500;
        font-size: 16px;

    }

    .mapboxgl-ctrl-geocoder--suggestion-address {
        font-weight: 400;
        font-size: 12px;

    }

    .mapboxgl-ctrl-geocoder--icon-search {
        margin-left: 16px;
        fill: #396A65;
        width: 8%;
        height: 48%;
        display: block; 
        margin: auto;
        margin-left: 16px;
    }

    .mapboxgl-ctrl-geocoder--pin-right {
        fill: #396A65;
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: column; 
        width: 8%;
    }

    .mapboxgl-ctrl-geocoder--icon-loading {
        display: none;
        position: absolute;
    }

    .mapboxgl-ctrl-geocoder--button {
        position: absolute;
    }


`;

// mapboxgl-ctrl-geocoder--button

// mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-loading
