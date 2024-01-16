import gql from "graphql-tag";

const GET_AVERAGEHOURS = gql`
  query average($start: DateScalar!, $end: DateScalar!) {
    averageHours(start: $start, end: $end) {
      duration
      name
      type
    }
  }
`;

export { GET_AVERAGEHOURS };

