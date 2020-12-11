import logo from './logo.svg';
import './App.css';
import MapSection from './components/map/map';
import React, { useState } from 'react';
import PopUp from './components/popUp/popUp';
import Form from './components/form/form';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

const location = {
  lat: 36.048180,
  lng: -105.811290
}


function App() {
  
  const [modalShow, setModalShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  function onMapClick() {
    if (editMode) {
      setModalShow(true);
    }
  }

  return (
  <div className="App">
    <button onClick={() => setEditMode(!editMode)}> Toggle Edit Mode </button>
    <MapSection location={location} zoomLevel={16} onClick={onMapClick}/>
    <button onClick={()=> setModalShow(true)}>Pop Up</button>
    <ErrorBoundary>
    <PopUp onHide={() => setModalShow(false)} show={modalShow} body={<Form></Form>}> </PopUp>
    </ErrorBoundary>
  </div>
  )}

export default App;
