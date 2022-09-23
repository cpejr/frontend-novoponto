import React, { useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { HoursConsultationComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { FetchMemberForHC } from "../../graphql/Member";

import MembersSelectBox from "../../components/molecules/MembersSelectBox";
import LoggedMembers from "../../components/molecules/LoggedMembersSection";
import MemberHistory from "../../components/organisms/MemberHistory";
import Mandatories from "./Mandatories";

const HoursConsultation = () => {
	const { themeColors } = useContext(ThemeContext);

	const [loadMember, { loading, data }] = useLazyQuery(FetchMemberForHC);

	function handleSelectMember(value) {
		loadMember({
			variables: { _id: value },
		});
	}

	const { member } = data || {};

	return (
		<HoursConsultationComponent theme={themeColors}>
			<div className="selectMemberArea">
				<MembersSelectBox onChange={handleSelectMember} />
				{loading && (
					<Spin
						indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
						className="loadIcon"
					/>
				)}
			</div>

			{member && (
				<div className="memberArea">
					<LoggedMembers
						name={member.name}
						role={member.role?.name}
						tribe={member.tribe}
						description={member.status}
						imageLink={member.imageLink}
					/>
				</div>
			)}
			<Mandatories mandatories={member?.mandatories} />
			<MemberHistory memberId={member?._id} />
		</HoursConsultationComponent>
	);
};

export default HoursConsultation;
