import styled from "styled-components";

const FlexDiv = styled.div`
  display: flex;
`;

const HorizontalCard = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 10px;
  border-radius: 5px;
`;

const TitleCard = styled.div`
  display: flex;
  align-items: center;
  background: #1D1D1D;
  padding: 5px;
  border-radius: 5px 0px 0px 5px;
`;

const ContentCard = styled.div`
  display: flex;
  align-items: center;
  background: #313131;
  padding: 5px;
  padding-left: 7px;
  border-radius: 0px 5px 5px 0px;
`;

const ContainerCards = styled.div`
  display: flex;
  gap: 50px;
`;

const ContainerExpandable = styled.div`
  width: 100%;
  height: 100%;
  background-color: #111111;
  padding: 10px;
`

export { FlexDiv, HorizontalCard, ContentCard, TitleCard, ContainerCards, ContainerExpandable };