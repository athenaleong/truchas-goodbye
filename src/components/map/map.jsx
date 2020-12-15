import GoogleMapReact from "google-map-react";
import { useState, useEffect } from "react";
import "./map.css";
import useSupercluster from "use-supercluster";
import axios from 'axios'

const createMapOptions = function (map) {
  return {
    mapTypeId: map.MapTypeId.HYBRID,
    styles: stylesArray,
  };
};
// green : 5B8E7D
const Marker = ({ children }) => children;

const stylesArray = [
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#5B8E7D" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f5f1e6" }],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#01295f", weight: 8 }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#e9bc62" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#00000" }],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#f5f1e6" }],
  },
];

const Map = ({ location, zoomLevel, onClick, mapRef, geoJSON }) => {
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(zoomLevel);

  console.log(`geoJSON: ${geoJSON.length}`);

  const { clusters, supercluster } = useSupercluster({
    points: geoJSON,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <div className="map">
      <h2>Truchas Peaks</h2>
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB3QgxQzYNKaDkSDBTEl3-wCYUFnQ9ilKs" }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
          options={(map) => createMapOptions(map)}
          onClick={onClick}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
        >
          {/* Markers Here  */}
          {clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const {
              cluster: isCluster,
              point_count: pointCount,
            } = cluster.properties;

            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <div
                    className="cluster-marker"
                    style={{
                      width: `${10 + (pointCount / geoJSON.length) * 20}px`,
                      height: `${10 + (pointCount / geoJSON.length) * 20}px`,
                    }}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.setZoom(expansionZoom);
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    }}
                  >
                    {pointCount}
                  </div>
                </Marker>
              );
            } else {
              return (
                <Marker
                  key={`point-${cluster.properties.id}`}
                  lat={latitude}
                  lng={longitude}
                >
                  Hello
                  {/* <button className="crime-marker">
                                <img src="/custody.svg" alt="crime doesn't pay" />
                            </button> */}
                </Marker>
              );
            }
          })}
        </GoogleMapReact>
      </div>
    </div>
  );
};

// const styleDict = {
//     apTypeId: maps.mapTypeId.SATELLITE,
// }
// options = {map => ({ mapTypeId: map.MapTypeId.SATELLITE, styles: [{"featureType": "road.highway", "elementType": "geometry", "stylers" : [{ "color" : "#e9bc62"}]}]})}

export default Map;
