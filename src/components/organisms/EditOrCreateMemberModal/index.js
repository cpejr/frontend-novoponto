import React, { useState, useEffect } from "react";
import { FormContainer } from "./styles";
import Modal from "../../molecules/Modal";
import AutoCompleteInput from "../../molecules/AutocompleteInput";
import { InputText } from "../../atoms";
import validators from "../../../services/validators";

const EditOrCreateModal = ({ properties, cancel, roles, members }) => {
  const [member, setMember] = useState({});
  const [reset, setReset] = useState({});

  const [error, setError] = useState({
    memberName: { error: false, errorMessage: "" },
    responsableName: { error: false, errorMessage: "" },
    roleName: { error: false, errorMessage: "" },
  });

  const handleChangeMember = (key, value) => {
    reset[key] = true;
    setReset(reset);
    member[key] = value;
    setMember(member);
    error[key] = { error: false, errorMessage: "" };
    setError({ ...error });
  };

  useEffect(() => {
    setMember({ ...properties.member });
  }, [properties]);

  const handleConfirm = () => {
    var validationName = validators.notEmpity(member.memberName);
    const validationResponsable = validators.notEmpityAndInsideArray(
      member.responsableName,
      members.map((memberMap) => memberMap.memberName)
    );
    const validationRole = validators.notEmpityAndInsideArray(
      member.roleName,
      roles
    );
    if (
      validationName === "ok" &&
      validationRole === "ok" &&
      validationResponsable === "ok"
    ) {
      properties.callback(member);
      return;
    }
    if (validationName !== "ok") {
      error.memberName = { error: true, errorMessage: validationName };
      setError({ ...error });
    }
    if (validationResponsable !== "ok") {
      error.responsableName = {
        error: true,
        errorMessage: validationResponsable,
      };
      setError({ ...error });
    }
    if (validationRole !== "ok") {
      error.roleName = { error: true, errorMessage: validationRole };
      setError({ ...error });
    }
  };

  return (
    <Modal
      isVisible={properties.open}
      handleCancel={cancel}
      handleOk={handleConfirm}
      title={
        properties.method === "edit" ? "Edição de membro" : "Criação de membro"
      }
    >
      <FormContainer>
        Nome:
        <InputText
          value={member.memberName}
          onChange={(e) => handleChangeMember("memberName", e.target.value)}
          error={error.memberName.error}
          errorMessage={error.memberName.errorMessage}
        />
        Cargo:
        <AutoCompleteInput
          options={roles}
          callback={(role) => handleChangeMember("roleName", role)}
          resetAutocompleteField={reset.role}
          initValue={member && member.roleName}
          error={error.roleName.error}
          errorMessage={error.roleName.errorMessage}
        />
        Assessor:
        <AutoCompleteInput
          options={members.map((member) => member.memberName)}
          callback={(responsable) =>
            handleChangeMember("responsableName", responsable)
          }
          resetAutocompleteField={reset.responsable}
          initValue={member && member.responsableName}
          error={error.responsableName.error}
          errorMessage={error.responsableName.errorMessage}
        />
      </FormContainer>
    </Modal>
  );
};

export default EditOrCreateModal;
