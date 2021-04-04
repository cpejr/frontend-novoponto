import React, { useContext } from "react";

import { ProfileComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { SessionContext } from "../../context/SessionProvider";
import { OutlinedBox } from "../../components/atoms";
import Login from "./login";
import Profile from "./profile";

const CardView = () => {
  const { themeColors } = useContext(ThemeContext);
  const { data } = useContext(SessionContext);

  return (
    <ProfileComponent theme={themeColors}>
      <OutlinedBox className="outlinedBox">
        {!!!data ? <Login /> : <Profile />}
      </OutlinedBox>
    </ProfileComponent>
  );
};

export default CardView;
