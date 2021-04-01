import React, { useContext } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { ProfileComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { CommonButton } from "../../components/atoms";

const Profile = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <ProfileComponent theme={themeColors}>
      <CommonButton
        buttonLabel="Login com google"
        buttonColor="#454545"
        buttonWidth="200px"
        icon={<GoogleOutlined />}
      />
    </ProfileComponent>
  );
};

export default Profile;
