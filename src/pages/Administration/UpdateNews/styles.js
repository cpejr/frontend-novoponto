import styled from "styled-components";

const UpdatedNewsComponent = styled.div`
  width: 100%;
  min-height: 100vh;

  padding: 30px 20px;

  background-color: ${(props) => props.theme.appBackground};

  display: flex;
  flex-direction: column;

  @media (max-width: 720px) {
      padding: 30px 16px;
  }

  .titleArea {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .titleArea img {
    margin-right: 16px;
  }

  .titleArea h1 {
    font-size: 24px;
    font-weight: 400;
  }

  .outerBoxNewsContainer {
    width: 100%;
    margin: 0 auto;
    margin-top: 40px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .outerBoxNewsContainer > span {
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 700;
  }

  .innerBoxNewsContainer {
    width: 100%;
    position: relative;

    display: grid;
    grid-template-columns: repeat(2, minmax(250px, 1fr));
    justify-items: center;
    row-gap: 60px;
    column-gap: 80px;
    padding: 32px;
    
    border: 2px solid #454545;
    border-radius: 5px;
  }

  .innerBoxNewsContainer > img {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  @media (max-width: 720px) {
    .innerBoxNewsContainer {
      width: 100%;
      grid-template-columns: 1fr;
      row-gap: 30px;
      padding: 16px;
    }
  }
`;

const SingleNewsBox = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .titleAreaSingleNewsBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 8px;
  }

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
    border: 1px solid #f4f4f4;
    border-radius: 5px;
    padding: 8px;
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

export { UpdatedNewsComponent, SingleNewsBox, NewsAdd };
