import React, { useEffect, useState } from "react";

import {
  DefaultLabel,
  DefaultText,
  LogoutPointButton,
  MemberAvatar,
  MemberName,
  TextArea,
} from "../../atoms";
import SaveButton from "../../molecules/SaveButton";
import ConfirmationModal from "../../molecules/ConfirmationModal";
import { Row } from "antd";
import { MemberProfileContainer } from "./styles";

const MemberProfile = ({
  member,
  onLogOut,
  onSave,
  showAsAdministrator = false,
}) => {
  const [isConfirmationVis, setIsConfirmationVis] = useState(false);

  const [newData, setNewData] = useState({
    status: member?.status || "",
    message: member?.message || "",
  });

  useEffect(() => {
    setNewData({
      status: member?.status || "",
      message: member?.message || "",
    });
  }, [member]);

  const isAdm = showAsAdministrator;

  async function handleSave() {
    onSave(newData);
  }

  function handleOnChange(e, field) {
    const value = e.target.value;
    setNewData({ ...newData, [field]: value });
  }

  function handleLogOutRequest() {
    setIsConfirmationVis(true);
  }

  function handleCloseModal() {
    setIsConfirmationVis(false);
  }

  function getIsSaved(field) {
    return newData[field] === member[field];
  }

  return (
    <MemberProfileContainer>
      <div className="d-flex flex-column-reverse flex-sm-row mb-2 justify-content-between">
        <Row>
          <MemberAvatar src={member?.imageLink} className="col-auto" />
          <div className="d-flex flex-column justify-content-around ms-2">
            <MemberName name={member?.name} className="namePart" />
            {member?.role && (
              <DefaultLabel
                labelText={member?.role?.name}
                labelColor="#FFD100"
              />
            )}
          </div>
        </Row>
        {!isAdm && (
          <LogoutPointButton
            className="col-12 col-sm-3 mb-3 mb-sm-0"
            onClick={handleLogOutRequest}
          />
        )}
      </div>
      <div>
        <DefaultText>Assessor: {member?.responsible?.name}</DefaultText>
      </div>
      <div className="message">
        <DefaultText>Mensagem do acompanhamento:</DefaultText>
        {!isAdm ? (
          <div className="messageBox">{member?.message}</div>
        ) : (
          <>
            <TextArea
              resize={true}
              maxLength={50}
              onChange={(e) => handleOnChange(e, "message")}
              value={newData?.message}
            />
            <SaveButton saved={getIsSaved("message")} onClick={handleSave} />
          </>
        )}
      </div>
      <div className="quote mt-2">
        <DefaultText>Frase:</DefaultText>
        <TextArea
          maxLength={50}
          resize={"none"}
          onChange={(e) => handleOnChange(e, "status")}
          value={newData?.status}
        />
        <SaveButton saved={getIsSaved("status")} onClick={handleSave} />
      </div>
      <ConfirmationModal
        title="Log out"
        content={`${member?.name}, Você deseja mesmo fazer logout?`}
        isVisible={isConfirmationVis}
        handleOk={() => {
          onLogOut();
          setIsConfirmationVis(false);
        }}
        handleCancel={handleCloseModal}
      />
    </MemberProfileContainer>
  );
};

export default MemberProfile;
