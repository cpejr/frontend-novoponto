import gql from "graphql-tag";

const GET_DEPARTAMENTS = gql`
  query departament {
    departament {
      _id
      name
      color
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
`;
const DELETE_DEPARTAMENT = gql`
  mutation DeleteDepartament($departamentId: ID!) {
    deleteDepartament(departamentId: $departamentId) {
      _id
    }
  }
`;

const UPDATE_DEPARTAMENT = gql`
  mutation UpdateDeparatament($departamentId: ID!, $data: DepartamentUpdate) {
    updateDepartament(departamentId: $departamentId, data: $data) {
      _id
      name
      color
      segment
    }
  }
`;

const CREATE_DEPARTAMENT = gql`
  mutation CreateDepartament($data: DepartamentInput!) {
    createDepartament(data: $data) {
      _id
      name
      color
      segment
    }
  }
`;
export {
  GET_DEPARTAMENTS,
  GET_DEPARTAMENT_BY_ID,
  DELETE_DEPARTAMENT,
  UPDATE_DEPARTAMENT,
  CREATE_DEPARTAMENT,
};
