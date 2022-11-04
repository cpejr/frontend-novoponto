import gql from "graphql-tag";
import { DefaultSessionFields } from "./Member";

const LOGGED_MEMBERS = gql`
	query LoggedMembers {
		loggedMembers {
			member {
				...DefaultSessionFields
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
	mutation StartSession($memberId: ID!, $isPresential: Boolean!) {
		startSession(memberId: $memberId, isPresential: $isPresential) {
			start
			isPresential
			member {
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

export { LOGGED_MEMBERS, CREATE_SESSION, FINISH_SESSION, END_ALL_SESSIONS };
