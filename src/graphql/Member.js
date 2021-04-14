import gql from "graphql-tag";

const DefaultSesionFields = gql`
  fragment DefaultSesionFields on Member {
    _id
    name
    status
    message
    imageLink
    responsible {
      _id
      name
    }
    role {
      name
      access
    }
  }
`;

const DefaultMemberFields = gql`
  fragment DefaultMemberFields on Member {
    _id
    name
    status
    imageLink
    role {
      name
    }
  }
`;

const Login = gql`
  mutation Login($tokenId: ID!) {
    login(tokenId: $tokenId) {
      accessToken
      member {
        ...DefaultSesionFields
      }
    }
  }
  ${DefaultSesionFields}
`;

const GetSessionData = gql`
  mutation GetSessionData {
    getSessionData {
      ...DefaultSesionFields
    }
  }
  ${DefaultSesionFields}
`;

const UpdateSelf = gql`
  mutation UpdateSelf($data: MemberUpdate!) {
    updateSelf(data: $data) {
      member {
        ...DefaultSesionFields
      }
      accessToken
    }
  }
  ${DefaultSesionFields}
`;

const Members = gql`
  query members {
    members {
      _id
      name
    }
  }
`;

export {
  //Fragments
  DefaultSesionFields,
  DefaultMemberFields,
  //Mutations
  Login,
  GetSessionData,
  UpdateSelf,
  //Query
  Members,
};
