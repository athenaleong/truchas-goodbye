import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import './drawer.css';
import {SideDrawer, Title, Description,Image} from './style';
import UserBubble from '../userBubble/userBubble';
import ImgCarousel from '../imageCarousel/imageCarousel';

function Drawer(props) {
    const {drawerShow, setDrawerShow, drawerJSON} = props
    const [imageId, setImageId] = useState([]);
    const [imgURL, setImgURL] = useState([]);
    const [userURL, setUserURL] = useState([])
    let drawerClass = drawerShow ? 'open': null;

    useEffect(async () => {

        setImgURL([]);
        setUserURL([]);

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
                    setImgURL(res.data);
                })
            }
        } 
        if (drawerJSON.people) {
            Promise.all(drawerJSON.people.map((p) => getUser(p.value))).then((values) => {
                let people = values.map(v => v.data['imageUrl']);
                setUserURL(people);
            })
        } 
    }, [drawerJSON])

    const imgList = imgURL.map(m => (
        <Image src={m}/>
    ));
    
    const getUser = (id) => {
        return axios.get(`http://localhost:5555/getUser?id=${id}`)
        
    }

    return (
        <SideDrawer className={drawerClass} >
            {/* onClick={() => { setDrawerShow(!drawerShow);}} */}
            <div>
                <Title>{drawerJSON.title}</Title>
                {/* {imgList} */}
                <UserBubble userURL={userURL}></UserBubble>
                <ImgCarousel imgURL={imgURL}></ImgCarousel>
                <Description>{drawerJSON.description}</Description>
            </div>

        </SideDrawer>
        
    )
    // onClick={(e)=> e.stopPropagation()}
}

export default Drawer
