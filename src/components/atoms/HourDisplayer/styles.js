import styled from 'styled-components';

const HourDisplayerContainer = styled.div`
    width: 55px;
    height: 32px;
    background-color: ${props => props.color || 'red'};
    border-radius: 2px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    font-size: 16px;
    font-weight: 600;
`;

export default HourDisplayerContainer;