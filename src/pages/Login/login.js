import React, { useContext } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { CommonButton } from "../../components/atoms";
import { GoogleLogin } from "react-google-login";
import { SessionContext } from "../../context/SessionProvider";

const CLIENT_ID =
  process.env.REACT_APP_CLIENT_ID ||
  "927681508740-6avqgv44im25umcj7ji2856o84fcrhje.apps.googleusercontent.com";

const LoginButton = () => {
  const { loading, data, login } = useContext(SessionContext);

  async function handleLogin(googleData) {
    const { tokenId } = googleData;
    login(tokenId);
  }

  return (
    <>
      {!!!data && !loading && (
        <div className="loginButton">
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
        </div>
      )}
    </>
  );
};

export default LoginButton;
