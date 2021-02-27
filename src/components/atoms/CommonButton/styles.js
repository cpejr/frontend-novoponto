import styled from 'styled-components';

const CommonButtonContainer = styled.button`
    width: ${props => props.width || '50px'};;
    height: 32px;
    background-color: ${props => props.color || 'red'};
    border-radius: 0px 4px 4px 0px;
    outline: none;
    border: none;
    
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    font-size: 14px;
    font-weight: 400;

    cursor: pointer;
    transition: background-color 0.35s;

    &:hover{
        background-color: ${props => props.colorHover};
    }
`;

export default CommonButtonContainer;