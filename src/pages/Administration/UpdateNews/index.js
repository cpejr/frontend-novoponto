import React, { useContext, useEffect, useState } from "react";
import { UpdatedNewsComponent, SingleNewsBox, NewsAdd } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import HtmlToDraft from "html-to-draftjs";
import parse from "html-react-parser";

import assignmentIcon from "../../../assets/assignmentIcon.svg";
import addCircleIcon from "../../../assets/addCircleIcon.svg";
import deleteIcon from "../../../assets/deleteIcon.svg";
import CommonButton from "../../../components/atoms/CommonButton";
import { Button } from "antd";
import { DefaultText, NewsItem } from "../../../components/atoms";
import Ratio from "react-ratio/lib/Ratio";
import NewsCarousel from "../../../components/molecules/NewsCarousel";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

const NewsBox = ({ index, allData, infoNews, handleDelete }) => {
  const [richTextContent, setRichTextContent] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(infoNews.htmlContent))
    )
  );

  // console.log("Texto RAW", convertToRaw(richTextContent.getCurrentContent()));
  // console.log(
  //   "Convertendo p/ HTML",
  //   draftToHtml(convertToRaw(richTextContent.getCurrentContent()))
  // );

  const { contentBlocks, entityMap } = HtmlToDraft(
    draftToHtml(convertToRaw(richTextContent.getCurrentContent()))
  );
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorState = EditorState.createWithContent(contentState);

  // console.log(
  //   "Desconvertendo HTML",
  //   convertToRaw(editorState.getCurrentContent())
  // );
  const handleEditorChange = (value) => {
    setRichTextContent(value);
    infoNews.htmlContent = draftToHtml(
      convertToRaw(richTextContent.getCurrentContent())
    );
  };

  const handleDefaultEditorState = (value) => {
    setRichTextContent(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(value))
      )
    );
  };

  useEffect(() => {
    handleDefaultEditorState(infoNews.htmlContent);
  }, [allData]);

  return (
    <SingleNewsBox>
      <div className="titleAreaSingleNewsBox">
        <span>{`Notícia ${index + 1}`}</span>
        <img
          src={deleteIcon}
          alt="Apagar notícia"
          onClick={() => handleDelete(infoNews.id)}
        />
      </div>
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleEditorChange}
        defaultEditorState={richTextContent}
        editorState={richTextContent}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "remove",
            "history",
          ],
        }}
      />

      <div className="previewContainer">
        <span>Preview</span>
        <Ratio ratio={16 / 9}>
          <NewsItem>
            {parse(
              draftToHtml(convertToRaw(richTextContent.getCurrentContent()))
            )}
          </NewsItem>
        </Ratio>
      </div>
      <div className="d-flex w-100">
        <Button block>
          <CaretLeftOutlined />
        </Button>
        <Button block>
          <CaretRightOutlined />
        </Button>
      </div>
    </SingleNewsBox>
  );
};

const UpdatedNews = () => {
  const { themeColors } = useContext(ThemeContext);

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [infoComponentArray, setInfoComponentArray] = useState([
    {
      id: 0,
      htmlContent: "<p>Pipoca</p>",
    },
  ]);
  const [indexComponent, setIndexComponent] = useState(0);

  const handleAddNewsBox = () => {
    setInfoComponentArray([
      ...infoComponentArray,
      {
        id: indexComponent + 1,
        htmlContent: "",
      },
    ]);
    setIndexComponent(indexComponent + 1);
  };

  const handleDeleteNewsBox = (whichNewsBoxIndex) => {
    const foundIndex = infoComponentArray.findIndex(
      (item) => item.id === whichNewsBoxIndex
    );
    infoComponentArray.splice(foundIndex, 1);
    setInfoComponentArray([...infoComponentArray]);
  };

  const handleSaveNews = () => {
    setIsButtonLoading(true);
    setTimeout(() => {
      setIsButtonLoading(false);
    }, 2000);
  };

  return (
    <UpdatedNewsComponent>
      <div className="titleArea">
        <img src={assignmentIcon} alt="Atualizar Notícias" />
        <h1>Atualizar notícias</h1>
      </div>
      <div className="d-flex justify-content-center align-center mt-3">
        <h4>Preview</h4>
      </div>
      <NewsCarousel />
      <div className="outerBoxNewsContainer">
        <span>Bloco de notícia</span>
        <div className="innerBoxNewsContainer">
          {infoComponentArray.map((item, index) => (
            <NewsBox
              index={index}
              allData={infoComponentArray}
              infoNews={item}
              handleDelete={handleDeleteNewsBox}
            />
          ))}
          <NewsAdd>
            <DefaultText>Adicionar nova notícia</DefaultText>
            <img
              src={addCircleIcon}
              alt="Adicionar notícia"
              onClick={() => handleAddNewsBox()}
            />
          </NewsAdd>
        </div>
      </div>

      <div className="buttonArea">
        <CommonButton
          buttonLabel="Salvar"
          loading={isButtonLoading}
          onClick={handleSaveNews}
        />
      </div>
    </UpdatedNewsComponent>
  );
};

export default UpdatedNews;
