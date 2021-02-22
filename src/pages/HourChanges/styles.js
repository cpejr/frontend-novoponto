import styled from 'styled-components';

const HourChangesComponent = styled.div`
    width: 100%;
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${props => props.theme.appBackground};

    .hourChangesBox{
        width: 550px;
        max-width: 90%;
        border: 2px solid #454545;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: 20px 42px 25px 42px;

        h1{
            font-size: 20px;
            font-weight: 700;
            color: #FFF;
            margin-bottom: 20px;
            text-align: center;
        }

    }
`;

export  { HourChangesComponent };