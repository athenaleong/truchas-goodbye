
import styled from 'styled-components';
import {marginBottom} from '../form/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const DropContainer = styled.section`
    // background-color: rgba(148, 200, 194, 0.58);
    // border-radius: 12px;

`;

export const DropInner = styled.div`
    background-color: rgba(148, 200, 194, 0.58);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align:center;
    margin-bottom: ${marginBottom};
    height: max(3vw, 36px);

    
`;

export const UploadText = styled.p`
    display: table-cell;
    vertical-align: middle;
    font-size: 16px;
    color: #396A65; 
    font-family: Sarabun;
    text-align:center;
    width: 100%;
    height: 100%;
    margin-bottom: 0;
`;

export const UploadedMedia = styled.img`
    border-radius: 12px;
    height: 100%;
    width: 100%;
    object-fit:cover;

    &:hover{
        border: 3px solid #F2F2F2;
    }

`;

export const AlbumBox = styled.div`
    display: flex;
    flex-direction: column;
    

`;

export const MediaRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: ${marginBottom};
    height: calc(max(8vw,  96px));
`;

export const MediaBox = styled.div`
    width: 28%;
    height: 100%;
    position: relative;

`;

export const IconStyled = styled(FontAwesomeIcon)`
    z-index: 99;
    `;

export const IconBubble = styled.div`
    position: absolute;
    right: 3px;
    width: fit-content;
    height: fit-content;

    &:hover {
        color: #990000;
    }

`;