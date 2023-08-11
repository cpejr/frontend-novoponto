import gql from "graphql-tag";

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      _id
      name
      area
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($_id: ID!) {
    deleteProject(_id: $_id) {
      _id
      name
      area
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $data: ProjectUpdate!) {
    updateProject(_id: $id, data: $data) {
      _id
      name
      area
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation CreateProject($data: ProjectInput!) {
    createProject(data: $data) {
      _id
      name
      area
    }
  }
`;

export { GET_PROJECTS, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT };
