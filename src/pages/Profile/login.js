import React, { useContext } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { CommonButton, DefaultText } from "../../components/atoms";
import { GoogleLogin } from "react-google-login";
import { Skeleton } from "antd";
import { SessionContext } from "../../context/SessionProvider";

const CLIENT_ID =
  process.env.REACT_APP_CLIENT_ID ||
  "927681508740-6avqgv44im25umcj7ji2856o84fcrhje.apps.googleusercontent.com";

const Login = () => {
  const { loading, error, data, login } = useContext(SessionContext);

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
