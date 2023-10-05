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
    }
  }
  ${DefaultSessionFields}
`;

const CREATE_SESSION = gql`
  mutation StartSession($memberId: ID!, $isPresential: Boolean!, $taskId: ID!) {
    startSession(
      memberId: $memberId
      isPresential: $isPresential
      taskId: $taskId
    ) {
      start
      isPresential
      member {
        name
      }
      task {
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

const END_ALL_SESSIONS = gql`
  mutation EndALLSessions {
    endAllSessions
  }
`;
  const END_SESSIONS_AFTER_20HOURS = gql`
  mutation EndSessionAfter20Hours {
    endSessionAfter20Hours
  }
`;
const DELETE_SESSION = gql`
	mutation DeleteSession($sessionId: ID!) {
		deleteSession(sessionId: $sessionId) {
			_id
		}
	}
`;
const UPDATE_SESSION = gql`
	mutation UpdateSession($sessionId: ID!, $data: SessionUpdateInput!) {
		updateSession(sessionId: $sessionId, data: $data) {
			_id
		}
  }
`;
	
export { LOGGED_MEMBERS, CREATE_SESSION, FINISH_SESSION, END_ALL_SESSIONS,END_SESSIONS_AFTER_20HOURS, DELETE_SESSION, UPDATE_SESSION };
