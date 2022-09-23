import gql from "graphql-tag";

const GET_TRIBES = gql`
	query GetTribes {
		tribes {
			_id
			name
			color
			segment
		}
	}
`;

const DELETE_TRIBE = gql`
	mutation DeleteTribe($tribeId: ID!) {
		deleteTribe(tribeId: $tribeId) {
			_id
		}
	}
`;

const UPDATE_TRIBE = gql`
	mutation UpdateTribe($tribeId: ID!, $data: TribeUpdate) {
		updateTribe(tribeId: $tribeId, data: $data) {
			_id
			name
			color
			segment
		}
	}
`;

const CREATE_TRIBE = gql`
	mutation CreateTribe($data: TribeInput!) {
		createTribe(data: $data) {
			_id
			name
			color
			segment
		}
	}
`;

export { GET_TRIBES, DELETE_TRIBE, UPDATE_TRIBE, CREATE_TRIBE };
