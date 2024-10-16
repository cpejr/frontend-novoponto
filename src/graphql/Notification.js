import gql from "graphql-tag";

const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications {
      _id
      text
      link
      linkValidation
    }
  }
`;

const CREATE_NOTIFICATION = gql`
  mutation CreateNotification(
    $text: String!
    $link: String!
    $linkValidation: String!
  ) {
    createNotification(
      text: $text
      link: $link
      linkValidation: $linkValidation
    ) {
      _id
      text
      link
      linkValidation
    }
  }
`;

const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($_id: ID!) {
    deleteNotification(_id: $_id) {
      _id
    }
  }
`;

const GET_USERS_LIST = gql`
  mutation GetUserList($sheetID: String!, $userName: String!) {
    getUserList(sheetID: $sheetID, userName: $userName) {
      sheetID
      userName
    }
  }
`;

export {
  GET_NOTIFICATIONS,
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_USERS_LIST,
};
