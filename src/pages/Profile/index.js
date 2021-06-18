import React, { useContext, useEffect } from "react";

import { ProfileComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { SessionContext } from "../../context/SessionProvider";
import { OutlinedBox } from "../../components/atoms";
import Login from "./login";
import MemberProfile from "../../components/organisms/MemberProfile";

const CardView = () => {
  const { themeColors } = useContext(ThemeContext);
  const { data, logOut, updateSelf, getSessionData } =
    useContext(SessionContext);

  useEffect(() => {
    if (!!data) getSessionData();
    if (!data?.member?.message?.read)
      updateSelf({
        message: { read: true, text: data?.member?.message?.text },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileComponent theme={themeColors} className="">
      <OutlinedBox className="outlinedBox mx-auto mx-md-0">
        {!data ? (
          <Login />
        ) : (
          <MemberProfile
            onLogOut={logOut}
            onSave={updateSelf}
            member={data?.member}
          />
        )}
      </OutlinedBox>
    </ProfileComponent>
  );
};

export default CardView;
