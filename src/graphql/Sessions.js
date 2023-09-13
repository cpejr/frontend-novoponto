import gql from "graphql-tag";
import { DefaultSessionFields } from "./Member";

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
        _id
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
    $projectId: ID
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

const DELETE_SESSION = gql`
	mutation DeleteSession($sessionId: ID!) {
		deleteSession(sessionId: $sessionId) {
			_id
		}
	}
`;

export { LOGGED_MEMBERS, CREATE_SESSION, FINISH_SESSION, END_ALL_SESSIONS, DELETE_SESSION };

