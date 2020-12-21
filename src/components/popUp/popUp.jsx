import React from 'react';
import './popUp.css';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Bubble} from '../userBubble/style';
import {UserModalBody, User, UserModal} from './style';

function PopUp(props) {
    return(
        <Modal {... props} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Create new </Modal.Title>
            </Modal.Header>
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

    console.log(`userList : ${userInfo}`)

    return(
        <UserModal {... props} animation={false} scrollable={true}>
            <Modal.Header closeButton>
                {/* <Modal.Title>Create new </Modal.Title> */}
            </Modal.Header>
            <UserModalBody>
                <ul>
                    {userList}
                </ul>
            </UserModalBody>
        </UserModal>
    );
}

export {PopUp, UserPopUp};