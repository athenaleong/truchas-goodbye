import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Image } from 'react-bootstrap';
import './drawer.css';
import {SideDrawer} from './style'

function Drawer(props) {
    const {drawerShow, setDrawerShow, drawerJSON} = props
    const [imageId, setImageId] = useState([]);
    const [imgURL, setImageURL] = useState([]);
    let drawerClass = drawerShow ? 'open': null;

    useEffect(async () => {

        if (drawerJSON.imgId != imageId) {
            setImageId(drawerJSON.imgId);
            // let searchParam = new URLSearchParams({'id' : drawerJSON.imgId}).toString();
            if (drawerJSON.imgId != undefined && drawerJSON.imgId.length != 0) {
                // console.log(`AAAAA ${drawerJSON.imgId.length}`)
                let queryString = drawerJSON.imgId.map((id) => 
                    `id=${id}`).join("&");
                console.log(`query string : ${queryString}`)
                let getUrl = `http://localhost:5555/getImage?${queryString}`
                // console.log(`url : ${getUrl}`)
                axios.get(getUrl).then(res => {
                    setImageURL(res.data);
                })
            }
        }

    }, [drawerJSON])

    const imgList = imgURL.map(m => (
        <img src={m}/>
    ));


    return (
        <SideDrawer className={drawerClass} onClick={() => setDrawerShow(!drawerShow)}>
            {/* <button>Toggle</button>/ */}
            {/* <h1>Slidinggg</h1> */}
            {/* <p>{JSON.stringify(drawerJSON)}</p> */}
            {imgList}
            <h2>{drawerJSON.title}</h2>
            <p>{drawerJSON.description}</p>
            {drawerJSON.people && 
                <ul>
                    {drawerJSON.people.map(p => <li>{p.label}</li>)}
                </ul>
            }

        </SideDrawer>
        
    )
}

export default Drawer
