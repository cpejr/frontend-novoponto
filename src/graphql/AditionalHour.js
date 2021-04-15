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

export {
  //Fragments
  DefaultHourFields,
  //Mutations
  SendAditionalHour,
  //Query
};
