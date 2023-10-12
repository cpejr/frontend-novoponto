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

const ALL_SESSIONS = gql`
  query AllSessions($startDate: DateScalar, $endDate: DateScalar) {
    allSessions(startDate: $startDate, endDate: $endDate) {
      sessions {
        _id
        start
        end
        formatedDuration
        duration
        isPresential
        description
        task {
          _id
          name
          active
        }
        project {
          _id
          name
        }
        member {
          name
          tribe {
            name
          }
        }
      }
      aditionalHours {
        amount
        member {
          tribe {
            name
          }
        }
      }
      formatedTotal
    }
  }
`;

export { LOGGED_MEMBERS, CREATE_SESSION, FINISH_SESSION, END_ALL_SESSIONS, DELETE_SESSION, UPDATE_SESSION, ALL_SESSIONS };

