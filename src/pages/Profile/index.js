import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { SessionContext } from "../../context/SessionProvider";
import { OutlinedBox } from "../../components/atoms";
import MemberProfile from "../../components/organisms/MemberProfile";
import useGoogleAuth from "../../services/firebase";

import MemberHistory from "../../components/organisms/MemberHistory";

import { HoursConsultationComponent, ProfileComponent } from "./styles";

const CardView = () => {
  const { themeColors } = useContext(ThemeContext);
  const { data, updateSelf, getSessionData } = useContext(SessionContext);
  const { googleLogout } = useGoogleAuth();

  useEffect(() => {
    if (!!data) getSessionData();
    if (data && !data?.member?.message?.read)
      updateSelf({
        message: { read: true, text: data?.member?.message?.text },
      });
  }, []);

  const { member } = data || {};

  return (
    <div>
      <ProfileComponent theme={themeColors} className="">
        <OutlinedBox className="outlinedBox mx-auto mx-md-0 m-lg-5">
          <MemberProfile
            onLogOut={googleLogout}
            onSave={updateSelf}
            member={data?.member}
          />
        </OutlinedBox>
        
      </ProfileComponent>

      <div className="mt-4 d-flex flex-column m-lg-5">
        <MemberHistory memberId={member?._id} />
      </div>
    </div>
  );
};

export default CardView;
