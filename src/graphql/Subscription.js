import gql from "graphql-tag";
import { DefaultSessionFields } from "./Member";

const SESSION_SUBSCRIPTION = gql`
  subscription SessionUpdate {
    sessionUpdate {
      action
      session {
        member {
          ...DefaultSessionFields
        }
        start
        end
        duration
        formatedDuration
      }
    }
  }
  ${DefaultSessionFields}
`;

export { SESSION_SUBSCRIPTION };
