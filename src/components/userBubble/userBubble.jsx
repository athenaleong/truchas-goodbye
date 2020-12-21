import React, {useEffect} from 'react';
import {UserBox, Bubble} from './style';

function UserBubble(props) {

    const {userURL} = props;

    const Bubbles = userURL.map(p => (
        <Bubble key={p} src={p}/>
    ))
    
    return (
        <UserBox>
            {Bubbles}
        </UserBox>
    )
}

export default UserBubble;
