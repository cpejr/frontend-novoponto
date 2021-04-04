import React, { useContext, useEffect } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { ProfileComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { CommonButton, OutlinedBox } from "../../components/atoms";
import { GoogleLogin } from "react-google-login";
import { gql, useMutation } from "@apollo/client";

const CLIENT_ID =
  "927681508740-6avqgv44im25umcj7ji2856o84fcrhje.apps.googleusercontent.com";

const LOGIN = gql`
  mutation Login($tokenId: ID!) {
    login(tokenId: $tokenId) {
      accessToken
      member {
        name
        status
        imageLink
        responsibleId
        role {
          name
          access
        }
      }
    }
  }
`;

const Profile = () => {
  const { themeColors } = useContext(ThemeContext);
  const [login, { data, loading, error }] = useMutation(LOGIN);

  async function handleLogin(googleData) {
    const { tokenId } = googleData;

    const reuslt = await login({ variables: { tokenId } });
    console.log(reuslt);
  }

  return (
    <ProfileComponent theme={themeColors}>
      <OutlinedBox className="outlinedBox">
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login com google"
          onSuccess={handleLogin}
          onFailure={(res) => console.log(res)}
          render={(renderProps) => (
            <CommonButton
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              buttonLabel="Login com google"
              color="#454545"
              width="200px"
              icon={<GoogleOutlined />}
            />
          )}
        />
      </OutlinedBox>
    </ProfileComponent>
  );
};

export default Profile;
