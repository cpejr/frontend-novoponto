import gql from "graphql-tag"; 
 
const GET_COLORS = gql` 
	query GetColors { 
		colors { 
			_id 
			primaryColor 
            secundaryColor
		} 
	} 
`; 
 
const CREATE_COLORS = gql` 
	mutation CreateColors($data: ColorInput!) { 
		createColor(data: $data) { 
			_id 
			primaryColor 
			secundaryColor
		} 
	} 
`; 
 
export { GET_COLORS, CREATE_COLORS};