import styled from "styled-components";

export const FooterContainer = styled.div`
  background-color: #000;
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

  @media (max-width: 500px) {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  @media (max-width: 280px) {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
`;

export const FooterElements = styled.div`
  color: yellow;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Separator = styled.div`
  width: 3px;
  height: 75px;
  margin: 0 40px 0 20px;
  background-color: yellow;
  border-radius: 10px;
  align-items: center;

  @media (max-width: 330px) {
    width: 3px;
    margin: 0 30px 0 20px;
  }

  @media (max-width: 280px) {
    margin: 0 30px 0 20px;
  }
`;

export const LogoDoti = styled.div`
  width: 150px;
  height: 60px;
  margin-right: 0px;
  margin-top: 5px;

  img {
    margin-top: -10px;
    max-width: 100%;
  }

  @media (max-width: 330px) {
    margin-left: -5px;
    width: 120px;
  }

  @media (max-width: 280px) {
    margin-right: 0px;
    margin-top: 10px;
    width: 120px;
  }
`;

export const LogoCPE = styled.div`
  width: 100px;
  margin-left: 10px;

  img {
    margin-top: -10px;
    max-width: 100%;
  }

  @media (max-width: 330px) {
    margin-right: 20px;
    width: 80px;
  }

  @media (max-width: 280px) {
    margin-left: 10px;
    margin-right: 15px;
    margin-top: 0px;
    width: 90px;
  }
`;
