import gql from "graphql-tag";

const CREATE_SESSION = gql`
  mutation StartSession($data: MemberId!) {
    startSession(data: $data) {
      memberId
      name
    }
  }
`;

const FINISH_SESSION = gql`
  mutation EndSession($data: MemberId!) {
    endSession(data: $data) {
      memberId
      name
    }
  }
`;

export { CREATE_SESSION, FINISH_SESSION };