import logo from './logo.svg';
import './App.css';
import MapSection from './components/map/map'
import React from 'react';

const location = {
  lat: 36.048180,
  lng: -105.811290
}

function App() {
  return (
  <div className="App">
    <MapSection location={location} zoomLevel={16} />
     
  </div>
  )}

export default App;
