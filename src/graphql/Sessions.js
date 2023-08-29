import gql from "graphql-tag";
import { DefaultSessionFields } from "./Member";
import { DefaultTaskFields } from "./Tasks";

const LOGGED_MEMBERS = gql`
  query LoggedMembers {
    loggedMembers {
      member {
        ...DefaultSessionFields
      }
      task {
        _id
        name
      }
      start
      end
      duration
      formatedDuration
      isPresential
      description
      project {
        name
      }
    }
  }
  ${DefaultSessionFields}
`;

const CREATE_SESSION = gql`
  mutation StartSession(
    $memberId: ID!
    $isPresential: Boolean!
    $taskId: ID!
    $description: String
    $projectId: ID!
  ) {
    startSession(
      memberId: $memberId
      isPresential: $isPresential
      taskId: $taskId
      description: $description
      projectId: $projectId
    ) {
      start
      isPresential
      member {
        name
      }
      task {
        name
      }
      description
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

const END_ALL_SESSIONS = gql`
  mutation EndALLSessions {
    endAllSessions
  }
`;

export { LOGGED_MEMBERS, CREATE_SESSION, FINISH_SESSION, END_ALL_SESSIONS };

