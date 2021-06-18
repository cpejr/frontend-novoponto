import styled from "styled-components";

const EditNewsContainer = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .titleAreaSingleNewsBox img {
    cursor: pointer;
  }

  .wrapperClassName {
    min-height: 100px;
    width: 100%;
    color: #000;
  }

  .toolbarClassName a {
    color: #000;
  }
  .editorClassName {
    height: 250px;
    overflow: auto;
    width: 100%;
    background: #fff;
    color: #000;

    padding: 0px 8px;
  }

  .editorClassName h1 {
    color: #000;
  }

  .previewContainer {
    width: 100%;
    border: 1.2px solid #222;
    border-radius: 5px;
    padding: 16px;
    margin-top: 8px;
  }

  .previewContainer > span {
    font-size: 18px;
    font-weight: 600;
  }

  @media (max-width: 720px) {
    & + & {
      margin-top: 16px;
    }
  }
`;

const NewsAdd = styled.div`
  max-width: 500px;
  min-height: 670px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #454545;
  border-radius: 5px;
`;

export { EditNewsContainer, NewsAdd };
