import styled from 'styled-components';

export const StandByComponent = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #141414;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img{
        margin-top: -100px;
        max-width: 90%;
    }

    h1{
        font-size: 48px;
        font-weight: 700;
        margin-top: -100px;
        max-width: 90%;
        text-align: center;
    }

    .linkGoBack{
        color: #fff;
        cursor: pointer;

        transition: color 0.2s;
        margin-top: 100px;


        display: flex;
        align-items: center;

        span > svg {
            font-size: 14px;
            margin-right: 5px;
        }
    }
    .linkGoBack:hover{
        color: #ccc;
    }

    @media(max-width: 720px){
        h1{
            margin-top: -60px;
        }
    }

`;
