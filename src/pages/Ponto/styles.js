import styled from 'styled-components';

const PontoComponent = styled.div`
    width: 100%;
    min-height: 100vh;

    margin: 0 auto;
    padding: 30px 0px;

    background-color: ${props => props.theme.appBackground};

    .fullContentPagePoint{
        width: 90%;
        margin: 0 auto;
    }

    .newsSection{
        width: 100%;
        height: 350px;

        display: flex;
        justify-content: space-evenly;
        align-items: center;

        padding: 30px 20px;

        .news{
            width: 500px;
            height: 250px;
            background-color: #000000;

            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;

            img{
                max-height: 90%;
            }

        }
        .news + .news{
            margin-left: 30px;
        }
    }

    .pointSection{
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;

        .searchesSubsection{
            width: 100%;
            height: 60px;
            padding: 0px 20px;

            display: flex;
            justify-content: space-between;
        }

        .subSectionLoggedMembers{
            width: 100%;
            height: auto;

            table, th, tr, td{
                margin: 0;
                padding: 0;
            }

            .HeaderTablePointMembers{
                width: 100%;
            }

            .HeaderTablePointMembers tr{
                height: 72px;
                background-color: #141414;
                padding: 0px 20px;
                
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border-bottom: 2px solid #1C1C1D;
            }

            .HeaderTablePointMembers tr:first-child{
                height: 65px;
                background-color: #1D1D1D;
                
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border-radius: 5px;
            }

            .memberColumn{
                width: 60%;
                max-width: 50vw;
                display: flex;
                justify-content: flex-start;
                color: #FFFFFF;
            }
            .startTime, .finishTime{
                width: 15%;
                min-width: 100px;
                display: flex;
                justify-content: flex-start;
                color: #FFFFFF;
            }

            .logoutButton{
                width: 10%;
                min-width: 100px;
            }
        }

        .buttonLogouAllMembers{
            width: 100%;
            display: flex;
            justify-content: flex-end;

            margin-top: 30px;
        }
    }
`;

const newsComponent = styled.div`
    width: 100%;
    min-height: 100vh;

    background-color: ${props => props.theme.appBackground};
`;

export  { PontoComponent, newsComponent };