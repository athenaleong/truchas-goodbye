import { render } from '@testing-library/react';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Image } from 'react-bootstrap';
import './drawer.css';

function Drawer(props) {
    const {drawerShow, setDrawerShow, drawerJSON} = props
    const [imageJSON, setImageJSON] = useState("hi");
    let drawerClass = drawerShow ? 'side-drawer open': 'side-drawer';
    var drawerContent; 

    const renderImage = () => {
        // imageJSON = drawerJSON('imagId');
        console.log(imageJSON);
    }

    useEffect(async () => {
        if (drawerJSON.imgId != imageJSON) {
            await setImageJSON(drawerJSON.imgId);
            console.log(`updated JSOn ${imageJSON}`);
        }
    }, [drawerJSON])

    useEffect(() => {
        renderImage()
    }, [imageJSON])


    return (
        <div className={drawerClass} onClick={() => setDrawerShow(!drawerShow)}>
            {/* <button>Toggle</button>/ */}
            {/* <h1>Slidinggg</h1> */}
            
            <p>{JSON.stringify(drawerJSON)}</p>
            <h1>{imageJSON}</h1>

        </div>
        
    )
}

export default Drawer
