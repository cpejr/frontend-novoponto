import styled from "styled-components";

const PontoComponent = styled.div`
  min-height: 100vh;

  td.logoutButton button {
    width: 100%;
    background-color: #1d1d1d;
  }

  tr.customHeader {
    background-color: #1d1d1d;
    color: #ffffff;
    position: sticky;

    th {
      padding: 20px 0 20px 0;
    }
  }
  .usersSession {
    max-height: 576px;
    overflow: auto;
  }
`;

const newsComponent = styled.div`
  width: 100%;
  min-height: 100vh;

  background-color: ${(props) => props.theme.appBackground};
`;

const TooltipTitle = styled.div`
  text-align: center;
`;

const RulesBox = styled.div`
  width: 100%;
  max-height: 350px;
  overflow-y: auto;
  box-sizing: border-box;
  margin-top:40px;
  padding-bottom:30px;
  @media (max-width: 1024px) {
    max-height: 350px;
  }

  @media (max-width: 768px) {
    max-height: 300px;
  }

`;
const RulesTitle = styled.div`
  width: 100%;
  height: 70px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  font-family: inter;
  justify-content: center;
  border-bottom: 2px solid #FFD100;
  padding-bottom:px;
    @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;
const RulesFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 010px;
  margin-top: 20px;
  width: 100%;
  align-itens:center;
  justify-content: space-evenly;
`;

const RuleItem = styled.div`
  flex: 1 1 calc(14.28% - 16px);
  max-width: calc(14.28% - 16px);
  
  border-radius: 8px;
  color: #000;
  font-size: 16px;
  text-align: center;
  align-itens:center;
  word-break: break-word;
  padding:10px;
  background-color:#FFD100;
  @media (max-width: 1024px) {
    flex: 1 1 calc(25% - 16px);
    max-width: calc(25% - 16px);
    font-size: 15px;
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(33.33% - 16px);
    max-width: calc(33.33% - 16px);
    font-size: 14px;
  }

  @media (max-width: 600px) {
    flex: 1 1 calc(50% - 16px);
    max-width: calc(50% - 16px);
    font-size: 13px;
  }

  @media (max-width: 400px) {
    flex: 1 1 100%;
    max-width: 100%;
    font-size: 12px;
  }
`;
export { PontoComponent, newsComponent, TooltipTitle, RulesBox, RulesTitle, RulesFlex,RuleItem };
