import logo from './logo.svg';
import './App.css';
import MapSection from './components/map/map';
import React, { useEffect, useRef, useState } from 'react';
import PopUp from './components/popUp/popUp';
import Form from './components/form/form';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import axios from 'axios';
import qs from 'qs';

const location = {
  lat: 36.048180,
  lng: -105.811290
}


function App() {
  // componentDidMount() {
  //   let data = qs.stringify({
  //     'query': pointQuery
  //    });
  //   let config = {
  //      method: 'post',
  //      url: 'http://localhost:5555/getGeoJSON', //TOEDIT
  //      headers: { 
  //        'Content-Type': 'application/x-www-form-urlencoded'
  //      },
  //      data : data
  //    };
     
  //    axios(config)
  //    .then(function (response) {
  //      let geoJSON= response.data;
  //      setGeoJSON(geoJSON); console.log(`data display: ${geoJSON}`); 
  //    })
  // };


  //Map
  const [modalShow, setModalShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  //Display Feature
  const [feature, setFeature] = useState([]); //TODO: Expand to walks/path tracing
  const [pointQuery, setPointQuery] = useState({});
  const [geoJSON, setGeoJSON] = useState([]); //GEOJSONJson Display 

  const mapRef = useRef();

  

  function onMapClick(obj) {
    if (editMode) {
      setModalShow(true);
    }
    setLat(obj.lat);
    setLng(obj.lng);
  }


  useEffect(() => {
    let data = qs.stringify({
      'query': pointQuery
     });
    let config = {
       method: 'post',
       url: 'http://localhost:5555/getGeoJSON', //TOEDIT
       headers: { 
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       data : data
     };
     
     axios(config)
     .then(function (response) {
       let geoJSON= response.data;
       setGeoJSON(geoJSON); console.log(`data display: ${geoJSON}`); 
     })
  }, [pointQuery])



  return (
  <div className="App">
    <button onClick={() => setEditMode(!editMode)}> Toggle Edit Mode </button>
    <MapSection location={location} zoomLevel={16} onClick={onMapClick} mapRef={mapRef} geoJSON={geoJSON}/> <button onClick={()=> setModalShow(true)}>Pop Up</button>
    <ErrorBoundary>
    <PopUp onHide={() => setModalShow(false)} show={modalShow} body={<Form lat={lat} lng={lng}></Form>}> </PopUp>
    </ErrorBoundary>
  </div>
  )}

export default App;
