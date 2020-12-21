import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

export const UserModal = styled(Modal)`
    // width: 30vw;
`;

export const UserModalBody = styled(Modal.Body)`
`;

export const User = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 16px;
    height: fit-content;
    width: 100%;



    p {
        font-size: 18px;
        // font-family: 'Sarabun', sans-serif;
        font-family: Open Sans;
        padding-left: 16px;
        margin-bottom: 0;
    }    
    
    :last-child {
        padding-bottom: 0px;
    }

`;