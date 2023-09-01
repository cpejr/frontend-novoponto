import gql from "graphql-tag";

const GET_DEPARTAMENTS = gql`
    query GetDepartament {
        departament {
            _id
            name
            color
            segment
        }
    }
`;

const DELETE_DEPARTAMENT = gql`
    mutation DeleteDepartament($departament_id: ID!) {
        deleteDepartament(departament_id: $departament_id) {
            _id
        }
    }
`;

const UPDATE_DEPARTAMENT = gql`
    mutation UpdateDeparatament($departament_id: ID!, $data: DepartamentUpdate) {
        updateDepartament(departament_id: $departament_id, data: $data) {
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

export { GET_DEPARTAMENTS, DELETE_DEPARTAMENT, UPDATE_DEPARTAMENT, CREATE_DEPARTAMENT };