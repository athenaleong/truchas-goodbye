import { useState, useEffect, useRef} from "react";
import axios from 'axios';
import { Emoji } from "emoji-mart";
import useSupercluster from "use-supercluster";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import {MapBox, ClusterMarker, SingleMarker} from './style';

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
        options: { radius: 75, maxZoom: 20 }
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
              speed: 2
            }),
            transitionDuration: "auto"
          });
    })

    return (
        <div>
        <MapBox onClick={(e) => {e.stopPropagation()}}>
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
                onClick={onClick}
                
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
                    <ClusterMarker
                        className="cluster-marker"
                        style={{
                        width: `${10 + (pointCount / geoJSON.length) * 20}px`,
                        height: `${10 + (pointCount / geoJSON.length) * 20}px`
                        }}
                        onClick={() => clusterOnClick(latitude, longitude, cluster)}
                    >
                        {pointCount}
                    </ClusterMarker>
                    </Marker>
                );
                }
                else {
                    // console.log(`${cluster.properties.emoji} ${selectedTagId == cluster.properties.id? "selected" : null}`)
                    return (
                    <Marker
                        key={`point-${cluster.properties.id}`}
                        latitude={latitude}
                        longitude={longitude}
                    >
                        <SingleMarker 
                            className={(selectedTagId == cluster.properties.id)? "selected" : null}
                            onClick={() => {
                                setDrawerShow(true);
                                setSelectedTagId(cluster.properties.id);
                            }}
                        >
                            <Emoji emoji={cluster.properties.emoji} size={18}></Emoji>
                            {/* <h3>{ (selectedTagId == cluster.properties.id) ? "selected" : null}</h3> */}
                        </SingleMarker>
                    </Marker>
                    );
                }
            })}
        
            </ReactMapGL>
        </MapBox>
        {/* <SingleMarker 
                            className={(selectedTagId == "5fdb1bab6cff65025719f097")? "selected" : null}
                            onClick={() => {
                            }}
                        >
                            hello
        </SingleMarker> */}
        </div>


    )
};


export default Map;