import gql from "graphql-tag";

const DefaultSessionFields = gql`
  fragment DefaultSessionFields on Member {
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
        ...DefaultSessionFields
      }
    }
  }
  ${DefaultSessionFields}
`;

const GetSessionData = gql`
  mutation GetSessionData {
    getSessionData {
      ...DefaultSessionFields
    }
  }
  ${DefaultSessionFields}
`;

const UpdateSelf = gql`
  mutation UpdateSelf($data: MemberUpdate!) {
    updateSelf(data: $data) {
      member {
        ...DefaultSessionFields
      }
      accessToken
    }
  }
  ${DefaultSessionFields}
`;

const Members = gql`
  query members {
    members {
      _id
      name
      role {
        _id
        name
        access
      }
      responsible {
        _id
        name
      }
    }
  }
`;

const UpdateMember = gql`
  mutation UpdateMember($memberId: ID!, $data: MemberUpdate!) {
    updateMember(memberId: $memberId, data: $data) {
      _id
      name
      responsible {
        name
        _id
      }
      role {
        name
        _id
      }
    }
  }
`;

const DeleteMember = gql`
  mutation DeleteMember($memberId: ID!) {
    deleteMember(memberId: $memberId) {
      name
    }
  }
`;

const CreateMember = gql`
  mutation CreateMember($data: MemberInput!) {
    createMember(data: $data) {
      ...DefaultSessionFields
    }
  }
  ${DefaultSessionFields}
`;

const FetchMemberForHC = gql`
  query member($_id: ID!) {
    member(_id: $_id) {
      _id
      name
      status
      imageLink
      mandatories {
        startAt
        endAt
        weekDay
      }
      role {
        name
      }
    }
  }
`;

const FetchCompiledForHC = gql`
  query compiled($memberId: ID!, $startDate: DateScalar, $endDate: DateScalar) {
    compiled(memberId: $memberId, startDate: $startDate, endDate: $endDate) {
      sessions {
        start
        end
        formatedDuration
      }
      aditionalHours {
        date
        amount
        action
        formatedAmount
      }
      total
      formatedTotal
    }
  }
`;

export {
  //Fragments
  DefaultSessionFields,
  DefaultMemberFields,
  //Mutations
  Login,
  GetSessionData,
  UpdateSelf,
  UpdateMember,
  DeleteMember,
  CreateMember,
  //Query
  Members,
  FetchMemberForHC,
  FetchCompiledForHC,
};