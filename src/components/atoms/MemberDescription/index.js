import React from "react";
import MemberDescriptionContainer from "./styles";

const MemberDescription = ({ description, responsive, ...props }) => {
	if (description) {
		const text = `"${description}"`;
		return (
			<MemberDescriptionContainer {...props} title={text}>
				{responsive && <span className="d-none d-lg-block">-&nbsp;</span>}
				<span>{text}</span>
			</MemberDescriptionContainer>
		);
	} else {
		return <MemberDescriptionContainer />;
	}
};

export default MemberDescription;
