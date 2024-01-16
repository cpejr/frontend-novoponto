import gql from "graphql-tag";

const GET_ROLES = gql`
  query GetRoles {
    roles {
      name
      _id
      access
      departamentId
      level
    }
  }
`;

const DELETE_ROLE = gql`
  mutation DeleteRole($roleId: ID!) {
    deleteRole(roleId: $roleId) {
      _id
    }
  }
`;

const UPDATE_ROLE = gql`
  mutation UpdateRole($roleId: ID!, $data: RoleUpdate) {
    updateRole(roleId: $roleId, data: $data) {
      _id
      name
      access
      level
    }
  }
`;

const CREATE_ROLE = gql`
  mutation CreateRole($data: RoleInput!) {
    createRole(data: $data) {
      _id
      name
      access
    }
  }
`;

export { GET_ROLES, DELETE_ROLE, UPDATE_ROLE, CREATE_ROLE };

