import React from 'react';
import './popUp.css';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Bubble} from '../userBubble/style';
import {UserModalBody, User, UserModal, UserModalTitle, UserModalHeader} from './style';
import {BookLoader} from '../loading/loading';

function PopUp(props) {

    const {editPointerId, formState} = props;

    
    return(
        <Modal {... props} animation={false}>
            <UserModalHeader closeButton>
                <UserModalTitle> {editPointerId?  "Edit Marker" :"Add New Marker" } </UserModalTitle>
            </UserModalHeader>
            <Modal.Body>
                {props.body}
            </Modal.Body>
        </Modal>
    );
    

}   

function UserPopUp(props) {
    const {userInfo} = props;

    const userList = userInfo.map((user) => {
        return(
            <User>
                <Bubble key={user['_id']} src={user['imageUrl']}/>
                <p>{user['name']}</p>
            </User>
        )
    })

    return(
        <UserModal {... props} animation={false} scrollable={true} onClick={(e) => e.stopPropagation()}>
            <Modal.Header closeButton>
                {/* <Modal.Title>Create new </Modal.Title> */}
            </Modal.Header>
            <UserModalBody>
                <ul style={{paddingInlineStart : 12 + 'px'}}>
                    {userList}
                </ul>
            </UserModalBody>
        </UserModal>
    );
}

export {PopUp, UserPopUp};