import { use } from 'passport';
import React, {useEffect} from 'react';
import {UserBox, Bubble, MoreBubble, MoreBox} from './style';

function UserBubble(props) {

    const {userInfo, setShowUserPopUp} = props;
    const moreUserImg = "https://i.ibb.co/RbWysyt/more.png";
    const onClick = ()=> {
        setShowUserPopUp(true);
    }
    
    return (
        <UserBox>
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
            
            {/* {renderBubble(userURL)} */}
        </UserBox>
    )
}

export default UserBubble;
