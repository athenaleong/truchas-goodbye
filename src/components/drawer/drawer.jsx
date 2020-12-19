import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import './drawer.css';
import {SideDrawer, Title, Description, PeopleBubble, Image, People} from './style'

function Drawer(props) {
    const {drawerShow, setDrawerShow, drawerJSON} = props
    const [imageId, setImageId] = useState([]);
    const [imgURL, setImageURL] = useState([]);
    const [peopleURL, setPeopleURL] = useState([])
    let drawerClass = drawerShow ? 'open': null;

    useEffect(async () => {

        setImageURL([]);
        setPeopleURL([]);

        //TODO: implement caching

        if (drawerJSON.imgId != imageId) {
            setImageId(drawerJSON.imgId);
            // let searchParam = new URLSearchParams({'id' : drawerJSON.imgId}).toString();
            if (drawerJSON.imgId != undefined && drawerJSON.imgId.length != 0) {
                // console.log(`AAAAA ${drawerJSON.imgId.length}`)
                let queryString = drawerJSON.imgId.map((id) => 
                    `id=${id}`).join("&");
                let getUrl = `http://localhost:5555/getImage?${queryString}`
                // console.log(`url : ${getUrl}`)
                axios.get(getUrl).then(res => {
                    setImageURL(res.data);
                })
            }
        } 
        if (drawerJSON.people) {
            Promise.all(drawerJSON.people.map((p) => getUser(p.value))).then((values) => {
                console.log( values.map(v => v.data['imageUrl']));
                let people = values.map(v => v.data['imageUrl']);
                setPeopleURL(people);
            })
        } 




    }, [drawerJSON])

    const imgList = imgURL.map(m => (
        <Image src={m}/>
    ));

    const peopleList = peopleURL.map(p => (
        <PeopleBubble src={p}/>
    ))
    
    const getUser = (id) => {
        return axios.get(`http://localhost:5555/getUser?id=${id}`)
        
    }

    return (
        <SideDrawer className={drawerClass} onClick={() => setDrawerShow(!drawerShow)}>
            {/* <button>Toggle</button>/ */}
            {/* <h1>Slidinggg</h1> */}
            {/* <p>{JSON.stringify(drawerJSON)}</p> */}
            <div>
                <Title>{drawerJSON.title}</Title>
            <People>
                {peopleList}
            </People>
                {imgList}
                <Description>{drawerJSON.description}</Description>
            </div>

        </SideDrawer>
        
    )
}

export default Drawer
