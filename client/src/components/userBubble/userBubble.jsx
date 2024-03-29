import { use } from 'passport';
import React, {useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import {UserBox, Bubble, MoreBubble, MoreBox} from './style';

function UserBubble(props) {

    const {userInfo, setShowUserPopUp} = props;
    const moreUserImg = "https://i.ibb.co/RbWysyt/more.png";
    const onClick = ()=> {
        setShowUserPopUp(true);
    }
    
    return (
        <UserBox onClick={e => e.stopPropagation()}>
            {userInfo.slice(0, 7).map(p => 
            <Bubble key={p['_id']} src={p['imageUrl']} onClick={onClick}/>
            )}
            {userInfo.length > 7 &&
            <div>
                <MoreBubble 
                    key={moreUserImg}
                    src={moreUserImg}
                    onClick={onClick}
                />   
            </div>     
            } 
            
        </UserBox>
    )
}

export default UserBubble;
