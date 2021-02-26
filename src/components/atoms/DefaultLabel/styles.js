import styled from 'styled-components';

const DefaultLabelContainer = styled.div`
    width: ${props => props.width };;
    height: 17px;
    border: 1px solid ${props => props.color || 'red'};
    border-radius: 2px;
    padding: 8px 12px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.color || 'red'};;
    font-size: 12px;
    font-weight: normal;
`;

export default DefaultLabelContainer;