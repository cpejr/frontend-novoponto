import styled from 'styled-components';

const InputTextContainer = styled.div`

    background-color: #1D1D1D;
    width: 230px;
    height: 32px;
    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-radius: 2px;

    border: ${props => props.error ? "0.7px solid red": "none"};
    
    img{
        width: 14px;
        height: 15px;
        margin: 0px 5px;
    }
    
    input{
        width: 100%;
        background-color: #1D1D1D;
        border: none;
        outline: none;
        padding: 3px 8px;
        font-size: 14px;
        line-height: 17px;
        color: #FFF;
    }
`;

export default InputTextContainer;