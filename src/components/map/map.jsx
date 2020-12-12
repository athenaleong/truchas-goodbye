import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import './map.css';

const createMapOptions = function (map) {
    return {
        mapTypeId: map.MapTypeId.HYBRID,
        styles: stylesArray
    }
}
// green : 5B8E7D

const stylesArray =  [
                    {featureType: "all", elementType: "labels.text.stroke", stylers:[{color: "#5B8E7D"}]},
                    {featureType: "all", elementType: "labels.text.fill", stylers:[{color: "#f5f1e6"}]},
                    {featureType: "water", elementType: "geometry.fill", stylers:[{color: "#01295f", "weight": 8}]},
                    {featureType: "road.highway", elementType: "geometry.fill", stylers : [{ color : "#e9bc62"}]},
                    {featureType: "road.highway", elementType: "labels.text.stroke", stylers : [{ color : "#00000"}]},
                    {featureType:"road.local", elementType: "geometry", stylers: [{color: "#f5f1e6"}]}]


const Map = ({location, zoomLevel, onClick, mapRef}) => {

    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(zoomLevel);

    return (
    <div className="map">
        <h2>Truchas Peaks</h2>
        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys = {{'key': 'AIzaSyB3QgxQzYNKaDkSDBTEl3-wCYUFnQ9ilKs'}}
                defaultCenter={location}
                defaultZoom={zoomLevel}
                options={(map) => createMapOptions(map)} 
                onClick={onClick}
                onChange={({zoom, bounds}) => {
                    setZoom(zoom);
                    setBounds([
                        bounds.nw.lng,  
                        bounds.se.lat,
                        bounds.se.lng,
                        bounds.nw.lat,
                    ])
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => {
                    mapRef.current = map;
                }}
            >
            {/* Markers Here  */}

            </GoogleMapReact>
        </div>
    </div> 
    )};



// const styleDict = {
//     apTypeId: maps.mapTypeId.SATELLITE,
// }
// options = {map => ({ mapTypeId: map.MapTypeId.SATELLITE, styles: [{"featureType": "road.highway", "elementType": "geometry", "stylers" : [{ "color" : "#e9bc62"}]}]})}

export default Map;