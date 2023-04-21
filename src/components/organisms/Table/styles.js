import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: max-content;
  height: 62px;
  gap: 20px;
  padding: 20px 24px;
  background-color: #1d1d1d;

  p {
    text-align: center;
  }

  p:first-child {
    text-align: start;
  }
`;

export const Title = styled.p`
  color: #ffffff;
  width: ${({ width }) => width ?? "auto"};
  min-width: ${({ minWidth }) => minWidth ?? "unset"};
  font-size: 14px;
  line-height: 25px;
  font-weight: bold;
  margin: 0;
`;
