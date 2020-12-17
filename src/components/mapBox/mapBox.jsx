import { useState, useEffect, useRef} from "react";
import axios from 'axios';
import { Emoji } from "emoji-mart";
import useSupercluster from "use-supercluster";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import "./mapBox.css";
import {MapBox} from './style';

const Map = ({location, zoomLevel, onClick, geoJSON, setSelectedTagId, setDrawerShow, selectedTagId}) => {
    
    const accessToken = 'pk.eyJ1IjoiYXRoZW5hbHloIiwiYSI6ImNraXNqdnI5cjJoMXUydXFqZHd0Y2tqdzgifQ.6l_zFc3IP8b0HDoleZoT6g';
    const url = "mapbox://styles/athenalyh/ckiskrx0h11ii1al2rqcj6ads";

    const [viewport, setViewport] = useState({
        latitude: location.lat,
        longitude: location.lng,
        width: '100%',
        height: '100%',
        zoom: zoomLevel
    })


    const mapRef = useRef();

    const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

    const { clusters, supercluster} = useSupercluster({
        points : geoJSON,
        bounds : bounds,
        zoom: viewport.zoom,
        // options: { radius: 75, maxZoom: 20 }
      });


    const clusterOnClick = ((latitude, longitude, cluster) => {
        const expansionZoom = Math.min(
            supercluster.getClusterExpansionZoom(cluster.id),
            20
        );

        setViewport({
            ...viewport,
            latitude,
            longitude,
            zoom: expansionZoom,
            transitionInterpolator: new FlyToInterpolator({
              speed: 3
            }),
            transitionDuration: "auto"
          });
    })

    return (
        <MapBox>
            <ReactMapGL
                {...viewport}
                width="100%"
                height="100%"
                mapboxApiAccessToken={accessToken}
                onViewportChange={
                    viewport => {setViewport({ ...viewport});
                }}
                mapStyle={url}
                ref={mapRef}
            >
                {clusters.map(cluster => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const {cluster: isCluster, point_count: pointCount} = cluster.properties;

                if (isCluster) {
                return (
                    <Marker
                    key={`cluster-${cluster.id}`}
                    latitude={latitude}
                    longitude={longitude}
                    >
                    <div
                        className="cluster-marker"
                        style={{
                        width: `${10 + (pointCount / geoJSON.length) * 20}px`,
                        height: `${10 + (pointCount / geoJSON.length) * 20}px`
                        }}
                        onClick={() => clusterOnClick(latitude, longitude, cluster)}
                    >
                        {pointCount}
                    </div>
                    </Marker>
                );
                }

                return (
                <Marker
                    key={`crime-${cluster.properties.id}`}
                    latitude={latitude}
                    longitude={longitude}
                >
                    <h2>🎉</h2>
                </Marker>
                );
            })}
            </ReactMapGL>
        </MapBox>
    )
};


export default Map;