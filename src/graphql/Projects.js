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

const CREATE_PROJECT = gql`
  mutation CreateProject($data: ProjectInput!) {
    createProject(data: $data) {
      _id
      name
      area
    }
  }
`;

const EDIT_PROJECT = gql`
  mutation EditProject($id: ID!, $data: ProjectUpdate!) {
    updateProject(_id: $id, data: $data){
      name
      area
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!){
    deleteProject(_id: $id){
      _id
    }
  }
`;

export { GET_PROJECTS, CREATE_PROJECT, EDIT_PROJECT, DELETE_PROJECT };

