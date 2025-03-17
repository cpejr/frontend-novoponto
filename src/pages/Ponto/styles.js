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
height: 300px;
border: 2px solid #FFD100; 
border-radius: 8px;     
box-sizing: border-box;
`
const RulesTitle = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #FFD100;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid #FFD100;
`;
const RulesFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
  width: 100%;
`;

const RuleItem = styled.div`
  flex: 1 1 calc(14.28% - 16px); /* Aproximadamente 7 colunas */
  max-width: calc(14.28% - 16px);
  border: 2px solid yellow;
  border-radius: 8px;
  padding: 12px;
  background-color: #fff;
  color: #000;
  font-size: 16px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  word-break: break-word;
`;
export { PontoComponent, newsComponent, TooltipTitle, RulesBox, RulesTitle, RulesFlex,RuleItem };
