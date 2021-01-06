import styled from 'styled-components';
import Geocoder from 'react-map-gl-geocoder';
import ReactMapGL from "react-map-gl";

export const MapBox = styled.div`
    width: 100%;
    height: 88vh;
    overflow: hidden;
    filter: drop-shadow(20px 20px 60px #CECECE), drop-shadow(-20px -20px 60px #FFFFFF);
    overflow:visible;

    .mapboxgl-map {
        border-radius: 32px;
    }
`;

export const SearchMarker = styled.img `
    height: 5vh;

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
    cursor: pointer;


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
    width: 75%;
    max-width: 50vw;

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
        background-color: #F2F2F2;
        border-radius: 16px;
        box-shadow : 10px 10px 60px #CECECE, -20px -20px 60px #FFFFFF;
        width: 75%;
        max-width: 50vw;
    }

    .suggestions-wrapper {
        z-index: 999;
        position: fixed;
        background-color: white;
        margin-top: 7vh;
        border-radius: 16px;
        max-width: 50%;
        width: 50%;
        display: none;
    }

    .mapboxgl-ctrl-geocoder--input {
        width: 100%;
        background-color: #F2F2F2;
        padding-left: 8px;
        font-family: Sarabun;
        font-weight: 400;
        color: #3D4852;
        border-width: 0px;


        :focus{
            outline: none !important; 
        } 
    }

    .suggestions {
        list-style-type: none;
        padding-inline-start: 4px;
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
        width: 4vw;
    }

    .mapboxgl-ctrl-geocoder--icon-loading {
        display: none;
        position: absolute;
    }

    .mapboxgl-ctrl-geocoder--button {
        position: absolute;
        border-width: 0px;
        background-color:transparent;

    }

`;

// mapboxgl-ctrl-geocoder--button

// mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-loading

export const Tools = styled.div`
    width: 100%;
    display: flex; 
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 4vh;
    height: 6vh;

`;

export const HelperMessage = styled.p `


    &.edit {
        color: white;
        font-family: Open Sans;
        background-color: rgba(57, 106, 101, 0.8);
        display: block;
        border-radius: 16px;
        padding: 8px;
        margin: auto;
        width: fit-content;
        margin-top: 12px;
    }
`;

export const ReactMapGLStyled = styled(ReactMapGL)`

    .mapboxgl-ctrl-attrib-button {
        display:none;
    }

`;