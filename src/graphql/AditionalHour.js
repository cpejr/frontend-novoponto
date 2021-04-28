import gql from "graphql-tag";

const DefaultHourFields = gql`
  fragment DefaultHourFields on AditionalHour {
    date
    amount
    formatedAmount
    description
    action
  }
`;

const SendAditionalHour = gql`
  mutation SendAditionalHour($data: AditionalHourCreateInput!) {
    sendAditionalHour(data: $data) {
      ...DefaultHourFields
    }
  }
  ${DefaultHourFields}
`;

const DeleteAditionalHour = gql`
  mutation DeleteAditionalHour($_id: ID!) {
    deleteAditionalHour(_id: $_id)
  }
`;

const AditionalHours = gql`
  query AditionalHours(
    $memberId: ID!
    $startDate: DateScalar
    $endDate: DateScalar
  ) {
    aditionalHours(
      memberId: $memberId
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      date
      amount
      action
      formatedAmount
      description
    }
  }
`;

export {
  //Fragments
  DefaultHourFields,
  //Mutations
  SendAditionalHour,
  DeleteAditionalHour,
  //Query
  AditionalHours,
};
