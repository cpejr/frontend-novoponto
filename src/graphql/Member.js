import gql from "graphql-tag";

const DefaultSessionFields = gql`
  fragment DefaultSessionFields on Member {
    _id
    name
    status
    message {
      read
      text
    }
    imageLink
    responsible {
      _id
      name
    }
    role {
      name
      access
    }
    tribe {
      name
      color
      segment
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
    tribe {
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
      member {
        ...DefaultSessionFields
      }
      accessToken
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
  query Members($accessArray: [Int]) {
    members(accessArray: $accessArray) {
      _id
      name
      imageLink
      status
      role {
        _id
        name
        access
      }
      responsible {
        _id
        name
      }
      tribe {
        _id
        name
        color
        segment
      }
      message {
        text
        read
      }
    }
  }
`;

const UpdateMember = gql`
  mutation UpdateMember($memberId: ID!, $data: MemberUpdate!) {
    updateMember(memberId: $memberId, data: $data) {
      status
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
      tribe {
        _id
        name
        color
        segment
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
      tribe {
        name
        color
      }
    }
  }
`;

const FetchAllMembersSessions = gql`
  query AllMembersSessions(
    $startDate: DateScalar
    $endDate: DateScalar
    $compileGroup: Int
  ) {
    allMembersSessions(
      startDate: $startDate
      endDate: $endDate
      compileGroup: $compileGroup
    ) {
      total
      formatedTotal
      member {
        name
      }
    }
  }
`;

const FetchCompiledForHC = gql`
  query compiled($memberId: ID!, $startDate: DateScalar, $endDate: DateScalar) {
    compiled(memberId: $memberId, startDate: $startDate, endDate: $endDate) {
      sessions {
        _id
        start
        end
        formatedDuration
        isPresential
      }
      aditionalHours {
        _id
        date
        amount
        action
        formatedAmount
        description
        isPresential
      }
      total
      formatedTotal
      formatedPresentialTotal
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
  FetchAllMembersSessions,
};
