import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import {SideDrawer, Title, Description, DescriptionText, Icon ,Image, EditIcon, EditBox, TestDiv} from './style';
import UserBubble from '../userBubble/userBubble';
import ImgCarousel from '../imageCarousel/imageCarousel';
import {UserPopUp} from '../popUp/popUp';

function Drawer(props) {
    const {drawerShow, setDrawerShow, drawerJSON, setEditPointerId, setModalShow} = props
    const [imageId, setImageId] = useState([]);
    const [imgURL, setImgURL] = useState([]);
    const [userInfo, setUserInfo] = useState([])
    const [showUserPopUp, setShowUserPopUp] = useState(false);
    let drawerClass = drawerShow ? 'open': null;

    const editOnClick = () => {
        // setDrawerShow(false);
        setModalShow(true);
        setEditPointerId({...drawerJSON, ...{'imgURL' : imgURL}});
    }

    useEffect(async () => {

        setImgURL([]);
        setUserInfo([]);

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
                let people = values.map(v => v.data);
                setUserInfo(people);
            })
        } 
    }, [drawerJSON])

    const imgList = imgURL.map(m => (
        <Image src={m}/>
    ));
    
    const getUser = (id) => {
        return axios.get(`http://localhost:5555/getUser?id=${id}`)
        
    }
    
    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    return (
        <div>
            <SideDrawer className={drawerClass}>
                <Title onClick={stopPropagation}>{drawerJSON.title}</Title>
                {/* {imgList} */}
                <UserBubble userInfo={userInfo} setShowUserPopUp={setShowUserPopUp}></UserBubble>
                <TestDiv onClick={stopPropagation}>
                    <ImgCarousel imgURL={imgURL}></ImgCarousel>

                    {drawerJSON.description &&
                        <Description>
                            <Icon key={'book'} src={'https://i.ibb.co/pQSbYpF/book.png'}/>
                            <DescriptionText>
                                {drawerJSON.description}
                            </DescriptionText>
                        </Description>
                    }
                </TestDiv>
                <EditBox>
                    <EditIcon key={'edit'} src={"https://i.ibb.co/BPmYSND/edit.png"} onClick={(e)=> {editOnClick(); e.stopPropagation();}}/> 
                </EditBox>

            </SideDrawer>
            <div onClick={(e) => e.stopPropagation()}> 
                <UserPopUp userInfo={userInfo} show={showUserPopUp} onHide={() => setShowUserPopUp(false)} onClick={(e) => e.stopPropagation()}></UserPopUp>
            </div>
        </div>
    )
    // 
}

export default Drawer
