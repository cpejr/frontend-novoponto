import gql from "graphql-tag";

const GET_PROJECTS = gql`
	query GetProjects {
		projects {
			_id
			name
      description
			url
		}
	}
`;

const DELETE_PROJECTS = gql`
	mutation DeleteProjects($projectId: ID!) {
		deleteProjects(projectId: $projectId) {
			_id
		}
	}
`;

const UPDATE_PROJECTS = gql`
	mutation UpdateProjects($projectId: ID!, $data: ProjectsUpdate) {
		updateProjects(projectId: $projectId, data: $data) {
			_id
			name
      description
			url
		}
	}
`;

const CREATE_PROJECTS = gql`
	mutation CreateProjects($data: ProjectsInput!) {
		createProjects(data: $data) {
			_id
			name
      description
      url
		}
	}
`;

export { GET_PROJECTS, DELETE_PROJECTS, UPDATE_PROJECTS, CREATE_PROJECTS };