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

export {
  GET_DEPARTMENTS,
};