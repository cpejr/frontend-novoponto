import React, { useContext } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { CommonButton } from "../../components/atoms";
import { SessionContext } from "../../context/SessionProvider";
import useGoogleAuth from "../../services/firebase";

const LoginButton = () => {
  const { loading, data } = useContext(SessionContext);
  const { googleLogin, isLoading: loadingLogin } = useGoogleAuth();

  return (
    <>
      {!!!data && !loading && (
        <div
          className="loginButton"
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <CommonButton
            onClick={googleLogin}
            disabled={loadingLogin}
            buttonLabel="Login com google"
            color="#166D63"
            width="200px"
            icon={<GoogleOutlined />}
          />
        </div>
      )}
    </>
  );
};

export default LoginButton;
