import React, { useContext } from "react";
import { UpdatedNewsComponent, SingleNewsBox } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";

import assignmentIcon from "../../../assets/assignmentIcon.svg";
import addCircleIcon from "../../../assets/addCircleIcon.svg";
import deleteIcon from "../../../assets/deleteIcon.svg";
import { useState } from "react";

const NewsBox = ({ howManyNews, handleDelete }) => {
  return (
    <SingleNewsBox>
      <div className="titleAreaSingleNewsBox">
        <span>{`Notícia ${howManyNews}`}</span>
        <img
          src={deleteIcon}
          alt="Apagar notícia"
          onClick={() => handleDelete(howManyNews)}
        />
      </div>

      <div>Summernote</div>
    </SingleNewsBox>
  );
};

const UpdatedNews = () => {
  const { themeColors } = useContext(ThemeContext);

  const [numberOfNewsBox, setNumberOfNewsBox] = useState([1]);

  const handleAddNewsBox = () => {
    setNumberOfNewsBox([...numberOfNewsBox, 1]);
  };

  const handleDeleteNewsBox = (whichNewsBoxIndex) => {
    numberOfNewsBox.splice(whichNewsBoxIndex - 1, 1);
    setNumberOfNewsBox([...numberOfNewsBox]);
  };

  return (
    <UpdatedNewsComponent>
      <div className="titleArea">
        <img src={assignmentIcon} alt="Atualizar Notícias" />
        <h1>Atualizar notícias</h1>
      </div>

      <div className="outerBoxNewsContainer">
        <span>Bloco de notícia</span>
        <div className="innerBoxNewsContainer">
          <img
            src={addCircleIcon}
            alt="Adicionar notícia"
            onClick={() => handleAddNewsBox()}
          />
          {numberOfNewsBox.map((_, index) => (
            <NewsBox
              howManyNews={index + 1}
              handleDelete={handleDeleteNewsBox}
            />
          ))}
        </div>
      </div>
    </UpdatedNewsComponent>
  );
};

export default UpdatedNews;
