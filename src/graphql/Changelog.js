import gql from "graphql-tag";

const LastChangeLog = gql`
  query lastChangeLog {
    lastChangeLog {
      _id
      version
      changeLogText
      date
    }
  }
`;

export {
  //Query
  LastChangeLog,
};
