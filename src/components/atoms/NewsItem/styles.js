import styled from "styled-components";

const NewsItemContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  max-height: 342px;
  max-width: 608px;

  background-color: #000000;

  border-radius: 10px;

  & + & {
    margin-left: 16px;
  }
`;

export default NewsItemContainer;
