import gql from "graphql-tag";

const GET_BADGES = gql`
	query GetBadges {
		badges {
			name
			_id
			url
		}
	}
`;

const DELETE_BADGES = gql`
	mutation DeleteBadge($badgeId: ID!) {
		deleteBadge(badgeId: $badgeId) {
			_id
		}
	}
`;

const UPDATE_BADGES = gql`
	mutation UpdateBadge($badgeId: ID!, $data: BadgeUpdate) {
		updateBadge(badgeId: $badgeId, data: $data) {
			_id
			name
			url
		}
	}
`;

const CREATE_BADGES = gql`
	mutation CreateBadge($data: BadgeInput!) {
		createBadge(data: $data) {
			_id
			name
			url
		}
	}
`;

export { GET_BADGES, DELETE_BADGES, UPDATE_BADGES, CREATE_BADGES };