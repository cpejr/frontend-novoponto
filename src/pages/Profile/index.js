import React, { useContext } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { ProfileComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { CommonButton, OutlinedBox } from "../../components/atoms";
import { GoogleLogin } from "react-google-login";

const CLIENT_ID =
  "927681508740-6avqgv44im25umcj7ji2856o84fcrhje.apps.googleusercontent.com";

const Profile = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <ProfileComponent theme={themeColors}>
      <OutlinedBox className="outlinedBox">
        <CommonButton
          buttonLabel="Login com google"
          buttonColor="#454545"
          buttonWidth="200px"
          icon={<GoogleOutlined />}
        />
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login com google"
          onSuccess={(res) => console.log(res)}
          onFailure={(res) => console.log(res)}
          cookiePolicy={"single_host_origin"}
        />
      </OutlinedBox>
    </ProfileComponent>
  );
};

export default Profile;
