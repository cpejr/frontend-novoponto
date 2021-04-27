import React, { useContext, useEffect, useState } from "react";

import { ThemeContext } from "../../context/ThemeProvider";
import {
  DefaultLabel,
  DefaultText,
  LogoutPointButton,
  MemberAvatar,
  MemberName,
  TextArea,
} from "../../components/atoms";
import { SessionContext } from "../../context/SessionProvider";
import SaveButton from "../../components/molecules/SaveButton";
import ConfirmationModal from "../../components/molecules/Modal";

const Profile = () => {
  const { data, logOut, updateSelf, getSessionData } = useContext(
    SessionContext
  );
  const [isConfirmationVis, setIsConfirmationVis] = useState(false);

  const [status, setStatus] = useState(data?.member?.status || "");

  async function handleSave() {
    updateSelf({ status });
  }

  function handleOnChange(e) {
    setStatus(e.target.value);
  }

  function handleLogOut() {
    setIsConfirmationVis(true);
  }

  function handleCloseModal() {
    setIsConfirmationVis(false);
  }

  useEffect(() => {
    getSessionData();
  }, []);

  const saved = status === data?.member?.status;

  return (
    <>
      <div className="row">
        <MemberAvatar src={data?.member?.imageLink} />
        <div className="col-1">
          <MemberName name={data?.member?.name} className="namePart" />
          {data?.member?.role && (
            <DefaultLabel
              labelText={data?.member?.role?.name}
              labelColor="#FFD100"
            />
          )}
        </div>
        <LogoutPointButton className="exitButton" onClick={handleLogOut} />
      </div>
      <div>
        <DefaultText>Assessor: {data?.member?.responsible?.name}</DefaultText>
      </div>
      <DefaultText>Mensagem do acompanhamento:</DefaultText>
      <div className="message">
        <DefaultText>{data?.member?.message}</DefaultText>
      </div>
      <div className="quote">
        <DefaultText>Frase:</DefaultText>
        <TextArea
          maxLength={50}
          resize={"none"}
          onChange={handleOnChange}
          value={status}
        />
        <SaveButton saved={saved} onClick={handleSave} />
      </div>
      <ConfirmationModal
        title="Log out"
        content={`${data?.member?.name}, Você deseja mesmo fazer logout?`}
        isVisible={isConfirmationVis}
        handleOk={() => {
          logOut();
          setIsConfirmationVis(false);
        }}
        handleCancel={handleCloseModal}
      />
    </>
  );
};

export default Profile;
