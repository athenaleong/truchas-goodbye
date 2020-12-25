import styled from 'styled-components';
import Select from "react-select";
const marginBottom = 24 + 'px';

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