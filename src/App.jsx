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
  //Map
  const [modalShow, setModalShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  //Side Bar
  const [sideBarShow, setSideBarShow] = useState(true);
  const [sideBarContent, setSideBarContent] = useState("some text");

  //Display Feature
  const [feature, setFeature] = useState([]); //TODO: Expand to walks/path tracing
  const [pointQuery, setPointQuery] = useState({});
  const [geoJSON, setGeoJSON] = useState([]); //GEOJSONJson Display 

  const mapRef = useRef();

  const [allUser, setAllUser] = useState([]); //TODO: move this to form.jsx. state hook wasn't working. not sure why

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
  }, [pointQuery, modalShow])


  useEffect(() => {
    axios.get('http://localhost:5555/getUser').then(res => {
      console.log(`res: ${JSON.stringify(res.data)}`);
      setAllUser(res.data);})
  }, [])

  return (
  <div className="App">
    <div className="Main">
      <button onClick={() => setEditMode(!editMode)}> Toggle Edit Mode </button>
      <MapSection location={location} zoomLevel={16} onClick={onMapClick} mapRef={mapRef} geoJSON={geoJSON}/> 
      <ErrorBoundary>
      <PopUp onHide={() => setModalShow(false)} show={modalShow} body={<Form lat={lat} lng={lng} setModalShow={setModalShow} allUser={allUser}></Form>}> </PopUp>
      </ErrorBoundary>
    </div>

    {sideBarShow && 
      <div className="SideBar"> 
        {sideBarContent}
      </div>
    }
  </div>
  )}

export default App;
