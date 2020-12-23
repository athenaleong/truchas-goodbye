import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import Select from "react-select";

export const marginBottom = 24 + 'px';


export const MarkerForm = styled.form`
    display: flex;
    flex-direction: column;
    overflow: scroll;
    padding: ${marginBottom};
    font-family: Open Sans;
    font-size: 16px;
`;

export const FirstDiv = styled.div`
    display: flex;
    flexDirection: row;
    width: 100%;
    justify-content: space-between;
    margin-bottom: ${marginBottom};
    height: max(4vw, 48px);
`;

export const TitleInput = styled.input`
    background-color: #F2F2F2;
    border-radius: 12px;
    margin-left: 3vw;
    width: 100%;
    height: 100%;
    outline:none;
    padding: 12px;

    &:focus {
        background-color: white;
        border: 1.5px solid #F2F2F2;

    }
`;

export const DescriptionInput = styled(TextareaAutosize)`
    background-color: #F2F2F2;
    border-radius: 12px;
    margin-bottom: ${marginBottom};
    outline:none;
    padding: 12px;

    &:focus {
        background-color: white;
        border: 1.5px solid #F2F2F2;
    }
`;

// .css-yk16xz-control

export const SelectStyled = styled(Select)`
    margin-bottom: ${marginBottom};
    outline:none;
    

    & > .Select__control {
        border: 1.5px solid #F2F2F2;
        border-radius: 12px;
    }

    & .Select__control--is-focused {
        outline: none;
        border: 1.5px solid #F2F2F2;
        box-shadow: 0 0 0 2px #57b3a9;

        svg {
            fill: #57b3a9;
        }
        span {
            background-color: #57b3a9;
        }

    }

    & .Select__option--is-focused {
        background-color:rgba(148, 200, 194, 0.58);
    }
    
`;

export const Input = styled.input`
    border-radius: 12px;
    font-size: 16px;
    font-family: Sarabun;
    text-align:center;
    width: 30%;
    height: max(3vw, 36px);
    align-self: flex-end;

    &.submit {
        background-color: #396A65;
        color: white;
    }
`;

export const FormText = styled.h1`
    font-family: Sarabun;
    font-size: 24px;
    margin-bottom: ${marginBottom};
`;

