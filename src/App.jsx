import logo from './logo.svg';
import './App.css';
import MapSection from './components/map/map';
import React, { useEffect, useRef, useState } from 'react';
import PopUp from './components/popUp/popUp';
import Form from './components/form/form';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

const location = {
  lat: 36.048180,
  lng: -105.811290
}


function App() {
  //Map
  const [modalShow, setModalShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  //Display Feature
  const [feature, setFeature] = useState([]); //TODO: Expand to walks/path tracing
  const [pointQuery, setPointQuery] = useState([]);
  const [dataDisplay, setDataDisplay] = useState([]); //GEOJson Display 

  const mapRef = useRef();

  function onMapClick(obj) {
    if (editMode) {
      setModalShow(true);
    }
    setLat(obj.lat);
    setLng(obj.lng);
  }

  useEffect(() => {
    

  }, [pointQuery])



  return (
  <div className="App">
    <button onClick={() => setEditMode(!editMode)}> Toggle Edit Mode </button>
    <MapSection location={location} zoomLevel={16} onClick={onMapClick} mapRef={mapRef}/>
    <button onClick={()=> setModalShow(true)}>Pop Up</button>
    <ErrorBoundary>
    <PopUp onHide={() => setModalShow(false)} show={modalShow} body={<Form lat={lat} lng={lng}></Form>}> </PopUp>
    </ErrorBoundary>
  </div>
  )}

export default App;
