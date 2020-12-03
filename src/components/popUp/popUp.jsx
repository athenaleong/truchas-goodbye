import React from 'react';
import './popUp.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'

function PopUp(props) {
    return(
        <Modal {... props} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new memory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}> Close </Button>
                <Button variant="primary" onClick={props.onHide}> Add New Marker </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopUp;