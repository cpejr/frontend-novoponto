import React, { useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { ThemeContext } from "../../context/ThemeProvider";
import { SessionContext } from "../../context/SessionProvider";
import { OutlinedBox } from "../../components/atoms";
import MemberProfile from "../../components/organisms/MemberProfile";
import useGoogleAuth from "../../services/firebase";

import MembersSelectBox from "../../components/molecules/MembersSelectBox";
import LoggedMembers from "../../components/molecules/LoggedMembersSection";
import MemberHistory from "../../components/organisms/MemberHistory";

import { HoursConsultationComponent, ProfileComponent } from "./styles";
import { FetchMemberForHC } from "../../graphql/Member";

const CardView = () => {
  const { themeColors } = useContext(ThemeContext);
  const { data, updateSelf, getSessionData } = useContext(SessionContext);
  const [loadMember, { loading }] = useLazyQuery(FetchMemberForHC);
  const { googleLogout } = useGoogleAuth();

  useEffect(() => {
    if (!!data) getSessionData();
    if (data && !data?.member?.message?.read)
      updateSelf({
        message: { read: true, text: data?.member?.message?.text },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function handleSelectMember(value) {
  //   loadMember({
  //     variables: { _id: value },
  //   });
  // }

  const { member } = data || {};

  return (
    <div>
      <ProfileComponent theme={themeColors} className="">
        <OutlinedBox className="outlinedBox mx-auto mx-md-0" style={{marginLeft: "500%"}}>
          <MemberProfile
            onLogOut={googleLogout}
            onSave={updateSelf}
            member={data?.member}
          />
        </OutlinedBox>
      </ProfileComponent>

      <HoursConsultationComponent theme={themeColors}>
        {/* <div className="selectMemberArea">
          <MembersSelectBox onChange={handleSelectMember} />
          {loading && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              className="loadIcon"
            />
          )}
        </div> */}

        {/* <Mandatories mandatories={member?.mandatories} /> */}
        <MemberHistory memberId={member?._id} />
      </HoursConsultationComponent>
    </div>
  );
};

export default CardView;
