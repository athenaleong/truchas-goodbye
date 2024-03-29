import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import {SideDrawer, Title, Description, DescriptionText, Icon ,Image, EditIcon, EditBox, TestDiv} from './style';
import UserBubble from '../userBubble/userBubble';
import ImgCarousel from '../imageCarousel/imageCarousel';
import {UserPopUp} from '../popUp/popUp';
import Skeleton from 'react-loading-skeleton'
import {CarouselSkeleton} from '../imageCarousel/style';
import {BookLoader} from '../loading/loading';


function Drawer(props) {
    const {drawerShow, setDrawerShow, drawerJSON, setEditPointerId, setModalShow} = props
    const [imageId, setImageId] = useState([]);
    const [imgURL, setImgURL] = useState(undefined);
    const [userInfo, setUserInfo] = useState([])
    const [showUserPopUp, setShowUserPopUp] = useState(false);
    let drawerClass = drawerShow ? 'open': null;

    const editOnClick = () => {
        setModalShow(true);
        setEditPointerId({...drawerJSON, ...{'imgURL' : imgURL || []}});
    }

    useEffect(async () => {
        
        setImgURL(undefined);
        setUserInfo([]);

        if (drawerJSON.imgId != imageId) {
            setImageId(drawerJSON.imgId);
            if (drawerJSON.imgId != undefined && drawerJSON.imgId.length != 0) {
                let PromiseArray = drawerJSON.imgId.map((id) => 
                    {
                    let getUrl = `/getImage?id=${id}`
                    return axios.get(getUrl)
                })
                Promise.all(PromiseArray).then(result => {
                    let url = result.map(r => r.data);
                    setImgURL(url);
                })
            } else {
                setImgURL([]);
            } 
        } 
        if (drawerJSON.people) {
            Promise.all(drawerJSON.people.map((p) => getUser(p.value))).then((values) => {
                let people = values.map(v => v.data);
                setUserInfo(people);
            })
        } 
    }, [drawerJSON])

    
    const getUser = (id) => {
        return axios.get(`/getUser?id=${id}`)
        
    }
    
    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    return (
        <div>
            <SideDrawer className={drawerClass}>
                <Title onClick={stopPropagation}>{drawerJSON.title} </Title>
                <UserBubble userInfo={userInfo} setShowUserPopUp={setShowUserPopUp}></UserBubble>
                <TestDiv onClick={stopPropagation}>
                    {<ImgCarousel imgURL={imgURL}></ImgCarousel>}

                    {drawerJSON.description &&
                        <Description>
                            <Icon key={'book'} src={'https://i.ibb.co/pQSbYpF/book.png'}/>
                            <DescriptionText>
                                {drawerJSON.description}
                            </DescriptionText>
                        </Description>
                    }
                </TestDiv>
                {drawerJSON != "" &&
                <EditBox>
                    <EditIcon key={'edit'} src={"https://i.ibb.co/BPmYSND/edit.png"} onClick={(e)=> {editOnClick(); e.stopPropagation();}}/> 
                </EditBox>
                }
            </SideDrawer>
            <div onClick={(e) => e.stopPropagation()}> 
                <UserPopUp userInfo={userInfo} show={showUserPopUp} onHide={() => setShowUserPopUp(false)} onClick={(e) => e.stopPropagation()}></UserPopUp>
            </div>
        </div>
    )
}

export default Drawer
