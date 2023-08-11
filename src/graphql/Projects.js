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

export { GET_PROJECTS, CREATE_PROJECT };

