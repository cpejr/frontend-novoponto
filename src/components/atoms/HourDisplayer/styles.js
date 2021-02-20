import styled from 'styled-components';

const HourDisplayerContainer = styled.div`
    width: 55px;
    height: 25px;
    background-color: ${props => props.color || 'red'};
    border-radius: 2px;
    
    display: flex;
    text-align: center;
    align-items: center;
    color: #FFF;
    font-size: 14px;
`;

export default HourDisplayerContainer;