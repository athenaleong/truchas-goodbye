import { useState, useEffect, useRef, useCallback} from "react";
import axios from 'axios';
import { Emoji } from "emoji-mart";
import useSupercluster from "use-supercluster";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import {MapBox, ClusterMarker, SingleMarker, GeocoderStyled, SearchBar, Tools, HelperMessage, SearchMarker} from './style';
import {ToggleEditButton} from '../button/button'
import Geocoder from 'react-map-gl-geocoder';
import DeckGL, { GeoJsonLayer } from "deck.gl";
import { ErrorEvent } from "mapbox-gl";


const Map = (props) => {
    const {location, zoomLevel, onClick, geoJSON, setSelectedTagId, setDrawerShow, selectedTagId} = props;
    const {onButtonClick, editMode} = props;

    const accessToken = 'pk.eyJ1IjoiYXRoZW5hbHloIiwiYSI6ImNraXNqdnI5cjJoMXUydXFqZHd0Y2tqdzgifQ.6l_zFc3IP8b0HDoleZoT6g';
    const url = "mapbox://styles/athenalyh/ckiskrx0h11ii1al2rqcj6ads";

    const [viewport, setViewport] = useState({
        latitude: location.lat,
        longitude: location.lng,
        width: '100%',
        height: '100%',
        zoom: zoomLevel
    })

    const [searchResultLayer, setSearchResultLayer] = useState(null);

    const mapRef = useRef();
    const geocoderContainerRef = useRef();

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

    const onSelected = (viewport, item) => {
        setViewport(viewport)
    }

    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
      );

    const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };

        return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
        });
    },
    [handleViewportChange]
    );

    // const handleOnResult = event => {
    //     console.log(event.result)
    //     setSearchResultLayer(new GeoJsonLayer({
    //         id: "search-result",
    //         data: event.result.geometry,
    //         getFillColor: [255, 0, 0, 128],
    //         getRadius: 1000,
    //         pointRadiusMinPixels: 10,
    //         pointRadiusMaxPixels: 10
    //       })
    //     );
    //   };

    const handleOnResult = event => {
        console.log(event.result)
        setSearchResultLayer({latitude: event.result.geometry.coordinates[1], longitude: event.result.geometry.coordinates[0]})
    };

    return (
        <div>

        
        <MapBox>
            <Tools>
                <SearchBar ref={geocoderContainerRef} onClick={(e) => {e.stopPropagation()}}/>
                <ToggleEditButton onClick={onButtonClick}  editMode={editMode}/>
            </Tools>
            <div style= {{borderRadius: 32 + 'px', height:78 + 'vh', width: 100 + '%'}} onClick={(e) => {e.stopPropagation()}}>
            <ReactMapGL
                {...viewport}
                width="100%"
                height="100%"
                mapboxApiAccessToken={accessToken}
                onViewportChange={handleViewportChange}
                mapStyle={url}
                ref={mapRef}
                onClick={onClick}    
            >
            <GeocoderStyled
                mapRef={mapRef}
                containerRef={geocoderContainerRef}
                onResult={handleOnResult}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={accessToken}
            />
            {/* <DeckGL {...viewport} layers={[searchResultLayer]} /> */}
            {searchResultLayer && <Marker
                key="result"
                latitude={searchResultLayer.latitude}
                longitude={searchResultLayer.longitude}
            >
                <SearchMarker src="https://i.ibb.co/FbdVV6z/marker.png"/>

                
            </Marker>}


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
            <HelperMessage className={editMode? "edit" : null}>{editMode? "click on map to add new marker" : null} </HelperMessage>

            </ReactMapGL>
            </div>


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