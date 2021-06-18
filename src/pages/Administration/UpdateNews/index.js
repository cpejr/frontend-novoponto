import React, { useContext, useState } from "react";

import { UpdatedNewsComponent, NewsAdd } from "./styles";
import assignmentIcon from "../../../assets/assignmentIcon.svg";
import addCircleIcon from "../../../assets/addCircleIcon.svg";
import { DefaultText } from "../../../components/atoms";
import NewsCarousel from "../../../components/molecules/NewsCarousel";
import NewsEdit from "../../../components/organisms/NewsEdit";
import { Button, message } from "antd";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import { useMutation } from "@apollo/client";
import { ReplaceNews } from "../../../graphql/News";

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

const UpdateNews = () => {
  const { newsData, refetchNews } = useContext(GlobalsContext);

  const [newsList, setNewsList] = useState(newsData?.news || []);

  const [replaceNews, { loading }] = useMutation(ReplaceNews);

  function handleAddNews() {
    setNewsList([
      ...newsList,
      {
        newsId: new Date().getTime(),
        html: "",
        index: newsList.length,
      },
    ]);
  }

  async function handleSaveNews() {
    if (!loading) {
      let hide = message.loading("Salvando...");
      try {
        await replaceNews({
          variables: {
            data: newsList.map(({ html, index, newsId }) => ({
              html,
              index,
              newsId,
            })),
          },
        });
        hide();
        message.success("Atualizado com sucesso", 2.5);
        refetchNews();
      } catch (err) {
        console.error(err);
        hide();
        message.error("Houve um problema, tente novamente", 2.5);
      }
    }
  }

  function updateNews(newNews) {
    const newNewslist = [...newsList];
    const index = newNewslist.findIndex(
      (value) => value.newsId === newNews.newsId
    );

    newNewslist[index] = newNews;

    setNewsList(newNewslist);
  }

  function handleChangeIndex(newsId, deltaPosition) {
    let newNewslist = [...newsList];

    const index = newNewslist.findIndex((value) => value.newsId === newsId);

    const a = newNewslist[index];
    const b = newNewslist[index + deltaPosition];

    newNewslist[index] = { ...a, index: a.index + deltaPosition };
    newNewslist[index + deltaPosition] = {
      ...b,
      index: b.index - deltaPosition,
    };

    newNewslist.sort(dynamicSort("index"));

    setNewsList(newNewslist);
  }

  function handleOnDelete(newsId) {
    let newNewslist = [...newsList];

    const index = newNewslist.findIndex((value) => value.newsId === newsId);

    newNewslist.splice(index, 1);
    setNewsList(newNewslist);
  }

  return (
    <UpdatedNewsComponent>
      <div className="titleArea">
        <img src={assignmentIcon} alt="Atualizar Notícias" />
        <h1>Atualizar notícias</h1>
      </div>
      <div className="d-flex justify-content-center align-center mt-3">
        <h4>Preview</h4>
      </div>
      <NewsCarousel news={newsList} />
      <div className="outerBoxNewsContainer">
        <div className="d-flex w-100 justify-content-between py-2">
          <span>Editor de noticias:</span>
          <Button type="primary" loading={loading} onClick={handleSaveNews}>
            Salvar
          </Button>
        </div>
        <div className="innerBoxNewsContainer">
          {newsList.map((news) => (
            <NewsEdit
              key={news.newsId}
              news={news}
              numberOfNews={newsList.length}
              onDelete={handleOnDelete}
              onChange={updateNews}
              onChangeIndex={handleChangeIndex}
            />
          ))}
          <NewsAdd>
            <DefaultText>Adicionar nova notícia</DefaultText>
            <img
              src={addCircleIcon}
              alt="Adicionar notícia"
              onClick={() => handleAddNews()}
            />
          </NewsAdd>
        </div>
        <div className="ms-auto py-2">
          <Button type="primary" loading={loading} onClick={handleSaveNews}>
            Salvar
          </Button>
        </div>
      </div>
    </UpdatedNewsComponent>
  );
};

export default UpdateNews;
