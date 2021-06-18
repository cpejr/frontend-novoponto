import gql from "graphql-tag";

const News = gql`
  query News {
    news {
      _id
      html
      index
      numberId
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
      numberId
    }
  }
`;

const ReplaceNews = gql`
  mutation ReplaceNews($data: [NewsInput]!) {
    replaceNews(data: $data) {
      _id
      html
      index
      numberId
    }
  }
`;

const UploadImage = gql`
  mutation UploadImage($file: Upload!, $numberId: Int!) {
    uploadImage(file: $file, numberId: $numberId)
  }
`;

export { News, ReplaceNews, DeleteNews, CreateNews, UploadImage };
