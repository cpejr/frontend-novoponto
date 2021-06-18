import gql from "graphql-tag";

const News = gql`
  query News {
    news {
      _id
      html
      index
      newsId
    }
  }
`;

const DeleteNews = gql`
  mutation DeleteNews($newsId: ID!) {
    deleteNews(newsId: $newsId)
  }
`;

const CreateNews = gql`
  mutation CreateNews($data: NewsInput!) {
    createNews(data: $data) {
      _id
      html
      index
      newsId
    }
  }
`;

const ReplaceNews = gql`
  mutation ReplaceNews($data: [NewsInput]!) {
    replaceNews(data: $data) {
      _id
      html
      index
      newsId
    }
  }
`;

const UploadImage = gql`
  mutation UploadImage($file: Upload!, $newsId: ID!) {
    uploadImage(file: $file, newsId: $newsId)
  }
`;

export { News, ReplaceNews, DeleteNews, CreateNews, UploadImage };
