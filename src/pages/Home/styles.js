import styled from 'styled-components';

const HomeComponent = styled.div`
    width: 100%;
    min-height: 100vh;

    background-color: ${props => props.theme.appBackground}
`;

export  { HomeComponent };