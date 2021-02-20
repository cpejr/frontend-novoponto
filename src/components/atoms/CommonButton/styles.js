import styled from 'styled-components';

const CommonButtonContainer = styled.div`
    width: ${props => props.width || '50px'};;
    height: 25px;
    background-color: ${props => props.color || 'red'};
    border-radius: 0px 4px 4px 0px;
    
    display: flex;
    text-align: center;
    align-items: center;
    color: #FFF;
    font-size: 14px;
    font-weight: 400;

    &:hover{
        background-color: ${props => props.color || 'red'};
    }
`;

export default CommonButtonContainer;