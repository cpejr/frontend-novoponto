import styled from 'styled-components';

const CommonSelectBoxContainer = styled.div`
    width: 100%;
    height: 35px;
    background-color: #1D1D1D;
    border-radius: 0px 4px 4px 0px;

    color: #FFF;
    font-size: 14px;

    &:hover{
        background-color: #1D1DAA;
    }

    & + &{
        margin-top: 20px;
    }
`;
export default CommonSelectBoxContainer;