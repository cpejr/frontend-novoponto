import React, { useContext, useEffect } from "react";
import { GoogleOutlined, LogoutOutlined } from "@ant-design/icons";
import { ProfileComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import {
  CommonButton,
  DefaultLabel,
  DefaultText,
  InputText,
  LogoutPointButton,
  MemberAvatar,
  MemberName,
  OutlinedBox,
  TextArea,
} from "../../components/atoms";
import { GoogleLogin } from "react-google-login";
import { gql, useMutation } from "@apollo/client";
import { Skeleton } from "antd";
import { SessionContext } from "../../context/SessionProvider";

const CLIENT_ID =
  "927681508740-6avqgv44im25umcj7ji2856o84fcrhje.apps.googleusercontent.com";

const Login = () => {
  const { themeColors } = useContext(ThemeContext);
  const { loading, error, data, login } = useContext(SessionContext);
  console.log(error);
  function handleLogin(googleData) {
    const { tokenId } = googleData;
    login(tokenId);
  }

  return (
    <>
      {!!!data && !loading && (
        <div className="centralize">
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
          {error && (
            <DefaultText className="errorText">
              {error?.graphQLErrors[0]?.message}
            </DefaultText>
          )}
        </div>
      )}
      <Skeleton
        avatar
        paragraph={{ rows: 1 }}
        size={"large"}
        active={loading}
        loading={loading}
      />
      <Skeleton
        paragraph={{ rows: 4 }}
        size={"large"}
        active={loading}
        loading={loading}
      />
    </>
  );
};

export default Login;
