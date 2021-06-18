import React from "react";
import { Button } from "antd";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import parse from "html-react-parser";
import Ratio from "react-ratio/lib/Ratio";
import draftToHtml from "draftjs-to-html";

import { CommonButton, DefaultText, NewsItem } from "../../../components/atoms";
import { EditNewsContainer } from "./styles";

const NewsEdit = ({
  news,
  numberOfNews,
  onChange,
  onChangeIndex,
  onDelete,
}) => {
  const contentState = convertToRaw(
    ContentState.createFromBlockArray(convertFromHTML(news.html))
  );

  return (
    <EditNewsContainer>
      <div className="d-flex w-100 justify-content-between mb-1">
        <DefaultText className="m-0">{`Notícia #${news.numberId}`}</DefaultText>
        <CommonButton
          icon={<DeleteFilled />}
          onClick={() => onDelete(news.numberId)}
        />
      </div>
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        initialContentState={contentState}
        onContentStateChange={(e) => {
          onChange({
            ...news,
            html: draftToHtml(e),
          });
        }}
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
            "image",
          ],
          image: {
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: () => {},
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            alt: { present: false, mandatory: false },
            previewImage: true,
            defaultSize: {
              height: "100%",
              width: "100%",
            },
          },
        }}
      />

      <div className="previewContainer">
        <span>Preview</span>
        <Ratio ratio={16 / 9}>
          <NewsItem>{parse(news.html)}</NewsItem>
        </Ratio>
      </div>
      <div className="d-flex w-100">
        {news.index > 0 && numberOfNews > 1 && (
          <Button block onClick={() => onChangeIndex(news.numberId, -1)}>
            <CaretLeftOutlined />
          </Button>
        )}

        {news.index !== numberOfNews - 1 && (
          <Button block onClick={() => onChangeIndex(news.numberId, +1)}>
            <CaretRightOutlined />
          </Button>
        )}
      </div>
    </EditNewsContainer>
  );
};

export default NewsEdit;
