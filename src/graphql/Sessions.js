import gql from "graphql-tag";

const LOGGED_MEMBERS = gql`
  query LoggedMembers {
    loggedMembers {
      member{
        _id
        name
        status
        role {
          name
        }
      }
      start
      end
      duration
      formatedDuration
    }
  }
`;

const CREATE_SESSION = gql`
  mutation StartSession($memberId: ID!) {
    startSession(memberId: $memberId) {
      start
      member{
        name
      }
    }
  }
`;

const FINISH_SESSION = gql`
  mutation EndSession($memberId: ID!) {
    endSession(memberId: $memberId) {
      end
      member {
        name
      }
    }
  }
`;

export { LOGGED_MEMBERS, CREATE_SESSION, FINISH_SESSION };