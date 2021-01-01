import logo from './logo.svg';
// import './App.css';
import MapSection from './components/map/map';
import React, { useEffect, useRef, useState } from 'react';
import {PopUp} from './components/popUp/popUp';
import Form from './components/form/form';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import Drawer from './components/drawer/drawer';
import axios from 'axios';
import qs from 'qs';
import { Button } from 'react-bootstrap';
import {AppStyled, LeftBox, RightBox, TempSearchBar, Tools, } from './style';
import MapBox from './components/mapBox/mapBox';
import SignInButton from './components/googleAuth/googleAuth';
import {ToggleEditButton} from './components/button/button'
import EmojiPicker from './components/emojiPicker/emojiPicker';


const location = {
  lat: 36.04818,
  lng: -105.81129,
};

const mapBoxLocation = [36.04818, -105.81129];

function App() {
  //Map
  const [modalShow, setModalShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [editPointerId, setEditPointerId] = useState(null);

  //Side Bar
  const [sideBarShow, setSideBarShow] = useState(true);
  const [sideBarContent, setSideBarContent] = useState("some text");

  //Display Feature
  const [feature, setFeature] = useState([]); //TODO: Expand to walks/path tracing
  const [pointQuery, setPointQuery] = useState({});
  const [geoJSON, setGeoJSON] = useState([]); //GEOJSONJson Display

  const mapRef = useRef();

  const [allUser, setAllUser] = useState([]); //TODO: move this to form.jsx. state hook wasn't working. not sure why

  //Drawer 
  const [drawerShow, setDrawerShow] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [drawerJSON, setDrawerJSON] = useState('');

  function onMapClick(obj) {
    console.log(`obj ${obj} `)

    if (editMode) {
      setModalShow(true);
    }
    setLat(obj.lngLat[1]);
    setLng(obj.lngLat[0]);
  }

  useEffect(() => {
    let data = qs.stringify({
      query: pointQuery,
    });
    let config = {
      method: "post",
      url: "/getGeoJSON", //TOEDIT
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config).then(function (response) {
      let geoJSON = response.data;
      setGeoJSON(geoJSON);
      // console.log(`data display: ${geoJSON}`);
    });
  }, [pointQuery, modalShow]);

  useEffect(() => {
    axios.get("/getAllUser").then((res) => {
      setAllUser(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedTagId) {
      axios.get(`/getTag?id=${selectedTagId}`).then(res => {
        setDrawerJSON(res.data);
      })
    }
  }, [selectedTagId])

  return (
    // onClick={(e) => e.stopPropagation()}
    <AppStyled onClick={() => setDrawerShow(!drawerShow)}>
          <LeftBox className={drawerShow? 'compress' : null}>
            {/* <Tools> */}
              {/* <TempSearchBar onClick={(e) => e.stopPropagation()}></TempSearchBar> */}
              {/* <SignInButton></SignInButton> */}
              {/* <ToggleEditButton onClick={(e) => {setEditMode(!editMode); e.stopPropagation();}} editMode={editMode}></ToggleEditButton> */}
            {/* </Tools> */}
              {/* <MapSection location={location} zoomLevel={16} onClick={onMapClick} mapRef={mapRef} geoJSON={geoJSON} setSelectedTagId={setSelectedTagId} setDrawerShow={setDrawerShow} selectedTagId={selectedTagId}/>  */}
              {/* <ToggleEditButton onClick={(e) => {setEditMode(!editMode); e.stopPropagation();}} editMode={editMode}></ToggleEditButton> */}
              <MapBox location={location} zoomLevel={16} onClick={onMapClick} geoJSON={geoJSON} setSelectedTagId={setSelectedTagId} setDrawerShow={setDrawerShow} selectedTagId={selectedTagId} onButtonClick={(e) => {setEditMode(!editMode); e.stopPropagation();}} editMode={editMode}/>
          </LeftBox>
          <Drawer setDrawerShow={setDrawerShow} drawerShow={drawerShow} drawerJSON={drawerJSON} setModalShow={setModalShow} setEditPointerId={setEditPointerId}></Drawer>
      <div onClick={(e) => e.stopPropagation()}> 
        <PopUp onHide={() => {setModalShow(false); setEditPointerId(null);}} show={modalShow} body={<Form lat={lat} lng={lng} setModalShow={setModalShow} allUser={allUser} setDrawerShow={setDrawerShow} editPointerId={editPointerId} setEditPointerId={setEditPointerId} setSelectedTagId={setSelectedTagId}></Form>} editPointerId={editPointerId}></PopUp>
      </div>
    </AppStyled>
  )}

export default App;
