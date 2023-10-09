import React, { useEffect, useState } from "react";

import {
  DefaultLabel,
  DefaultSubTitle,
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
  });

  useEffect(() => {
    if (showAsAdministrator)
      setNewData({
        status: member?.status || "",
        message: member?.message || { text: "", read: true },
      });
    else
      setNewData({
        status: member?.status || "",
      });
  }, [member]);
  const isAdm = showAsAdministrator;

  async function handleSave() {
    onSave(newData);
  }

  function handleOnChange(field) {
    setNewData({ ...newData, ...field });
  }

  function handleLogOutRequest() {
    setIsConfirmationVis(true);
  }

  function handleCloseModal() {
    setIsConfirmationVis(false);
  }

  return (
    <MemberProfileContainer>
      <div className="d-flex flex-column-reverse flex-sm-row mb-2 custom_margin">
        <div className="botaoLogOut">
          <Row>
            <div className="imagemNomeCargo">
              <MemberAvatar src={member?.imageLink} className="col-auto" />
              <div className="d-flex flex-column justify-content-around ms-2">
                <MemberName name={member?.name} className="namePart" />
                {member?.role && (
                  <DefaultLabel
                    labelText={member?.role?.name}
                    labelColor="#9fbfb9"
                  />
                )}
              </div>
            </div>
          </Row>

          {!isAdm && (
            <LogoutPointButton
              className="col-md-12 col-sm-3 mb-3 mb-sm-0"
              onClick={handleLogOutRequest}
            />
          )}
        </div>
      </div>
      <div className="titulo1">
        <DefaultText>Assessor: {member?.responsible?.name}</DefaultText>
      </div>
      <div className="messageAndFrase">
        <div className="row align-items-end">
          <div className="col-md-6">
            <div className="quote mt-2">
              <DefaultSubTitle>Mensagem do acompanhamento:</DefaultSubTitle>
              {!isAdm ? (
                <TextArea
                  maxLength={50}
                  className="non-resizable-textarea"
                  value={member?.message?.text}
                  inputMode="none"
                />
              ) : (
                <>
                  <TextArea
                    className="non-resizable-textarea"
                    onChange={(e) =>
                      handleOnChange({
                        message: { text: e.target.value, read: false },
                      })
                    }
                    value={newData?.message?.text}
                  />
                  <SaveButton
                    saved={newData?.message?.text === member?.message?.text}
                    onClick={handleSave}
                  />
                </>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="quote mt-2">
              <DefaultSubTitle>Frase:</DefaultSubTitle>
              <TextArea
                maxLength={50}
                className="non-resizable-textarea"
                onChange={(e) => handleOnChange({ status: e.target.value })}
                value={newData?.status}
              />
              <SaveButton
                saved={newData?.status === member?.status}
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
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

