import gql from "graphql-tag";

const GET_DEPARTMENTS = gql`
query Departaments {
  departament {
		_id
    color
    name
    segment
	}
}
`;

const GET_DEPARTAMENT_BY_ID = gql`
query Departaments($departamentId: ID!) {
  departamentById(departamentId: $departamentId) {
    name
    color
    segment
  }
}
`

export {
  GET_DEPARTMENTS,
  GET_DEPARTAMENT_BY_ID,
};