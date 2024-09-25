import gql from "graphql-tag";

const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications {
      _id
      text
      link
    }
  }
`;

const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($text: String!, $link: String!) {
    createNotification(text: $text, link: $link) {
      _id
      text
      link
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

export { GET_NOTIFICATIONS, CREATE_NOTIFICATION, DELETE_NOTIFICATION };
