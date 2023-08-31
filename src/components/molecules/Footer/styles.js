import styled from "styled-components";

export const FooterContainer = styled.div`
    background-color: #000;
    color: white;
    padding: 20px;
    text-align: center;
    position: absolute;
    margin-top: 100px;
    width: 100%;
    left: 0;
    height: 110px;
    display: flex;
    justify-content: center;
    flex-direction: row;
`;

export const FooterElements = styled.div`
    color: yellow;
`;

export const Separator = styled.div`
    width: 3px;
    height: 75px;
    margin: 0 40px;
    background-color: yellow;
    border-radius: 10px;
    align-items: center;
`;

export const LogoDoti = styled.div`
    width: 10px;
    height: 10px;
    margin-right: 100px;
    fill: white;
`;

export const LogoCPE = styled.div`
    width: 100px;
    margin-left: 10px;
    fill: white;
    
    img{
        margin-top: -10px;
        max-width: 100%;
    }
`;