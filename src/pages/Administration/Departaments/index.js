import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_DEPARTAMENTS,
  DELETE_DEPARTAMENT,
  UPDATE_DEPARTAMENT,
  CREATE_DEPARTAMENT,
} from "../../../graphql/Departaments";
import { message, Skeleton } from "antd";
import { DepartamentsComponent } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";
import { GlobalsContext } from "../../../context/GlobalsProvider";

import { CommonButton } from "../../../components/atoms";
import ConfirmationModal from "../../../components/molecules/ConfirmationModal";
import FormModal from "../../../components/organisms/FormModal";

import { RocketOutlined } from "@ant-design/icons";

import validators from "../../../services/validators";
import DepartamentRow from "./DepartamentRow";

const Departaments = () => {
  const { themeColors } = useContext(ThemeContext);
  const { refetchMembers } = useContext(GlobalsContext);

  const [openModalExcludeDepartament, setOpenModalExcludeDepartament] = useState(false);
  const [excludeDepartament, setExcludeDepartament] = useState({});
  const [editOrCreateModalInfo, setEditOrCreateModalInfo] = useState({
    open: false,
  });

  const handleOpenModal = (departament) => {
    setExcludeDepartament(departament);
    setOpenModalExcludeDepartament(true);
  };

  const handleCloseModal = () => {
    setOpenModalExcludeDepartament(false);
  };

  const handleCloseEditOrCreate = () => {
    setEditOrCreateModalInfo({ open: false });
  };

  const handleExcludeDepartament = async (departament) => {
    var hide = message.loading("Excluindo");
    try {
      await deleteDepartamentMutation({ variables: { departamentId: departament._id } });
      hide();
      message.success("Excluido com sucesso", 2.5);
      refetchMembers();
      refetch();
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    setOpenModalExcludeDepartament(false);
  };

  const editOrCreateDepartament = (method, departament) => {
    const withInitialValue = method === "edit";

    var fields = [
      {
        key: "name",
        type: "text",
        label: "Departamento",
        placeholder: "Escolha o nome",
        rules: [validators.antdRequired()],
        initialValue: withInitialValue ? departament.name : undefined,
      },
      {
        key: "color",
        type: "text",
        label: "Cor",
        placeholder: "Escreva a cor em código hexadecimal",
        rules: [validators.antdRequired(), validators.notHexColor()],
        initialValue: withInitialValue ? departament.color : undefined,
      },
      {
        key: "segmento",
        type: "text",
        label: "Segmento",
        placeholder: "Escreva o principal segmento",
        rules: [validators.antdRequired(), validators.charLimit(50)],
        initialValue: withInitialValue ? departament.segment : undefined,
      },
    ];

    const modalData = {
      title: "",
      fields: fields,
      open: true,
      cancel: handleCloseEditOrCreate,
    };

    if (method === "edit") {
      modalData.title = "Editar Departamento";
      modalData.onSubmit = updateDepartament(departament._id);
    } else {
      modalData.title = "Criar Departamento";
      modalData.onSubmit = createDepartament;
    }

    setEditOrCreateModalInfo(modalData);
  };

  const updateDepartament = (departamentId) => async (updatedDepartament) => {
    const { Departamento, Cor, Segmento } = updatedDepartament;
    const newDepartament = {
      name: Departamento,
      color: Cor,
      segment: Segmento,
    };

    var hide = message.loading("Atualizando");
    try {
      await updateDepartamentMutation({ variables: { departamentId, data: newDepartament } });
      hide();
      message.success("Alterado com sucesso", 2.5);
      refetch();
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    handleCloseEditOrCreate();
  };

  const createDepartament = async (departament) => {
    var hide = message.loading("Criando");

    const { Departamento, Cor, Segmento } = departament;
    const newDepartament = {
      name: Departamento,
      color: Cor,
      segment: Segmento,
    };
    console.log(departament);
    try {
      await createDepartamentMutation({ variables: { data: newDepartament } });
      hide();
      message.success("Criado com sucesso", 2.5);
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    refetch();
    handleCloseEditOrCreate();
  };

  const [deleteDepartamentMutation] = useMutation(DELETE_DEPARTAMENT);
  const [updateDepartamentMutation] = useMutation(UPDATE_DEPARTAMENT);
  const [createDepartamentMutation] = useMutation(CREATE_DEPARTAMENT);
  const { loading, error, data, refetch } = useQuery(GET_DEPARTAMENTS);

  if (loading)
    return (
      <Skeleton
        paragraph={{ rows: 4 }}
        size={"large"}
        active={loading}
        loading={loading}
      />
    );

  /*if (error) {
    console.log(error);
    message.error("Houve um problema, tente recarregar a pagina", 2.5);
    return <h1>Erro, recarregue a pagina</h1>;
  }*/

  if (data) {
    const { departaments } = data;
    console.log("🚀 ~ file: index.js:178 ~ Departaments ~ departaments:", departaments)

    return (
      <DepartamentsComponent theme={themeColors}>
        <div className="iconWithTitle">
          <RocketOutlined className="svgIcon" />
          <h1>Departamentos</h1>
        </div>
        <div className="addNewDepartamentButtonArea">
          <CommonButton
            buttonLabel="Adicionar novo departamento"
            color={themeColors.green}
            width="223px"
            onClick={() => editOrCreateDepartament("create")}
          />
        </div>

        <table className="departamentTable">
          <thead>
            <tr>
              <th className="departamentColumn">Departamento</th>
              <th className="departamentColumn">Cor</th>
              <th className="departamentColumn">Segmento</th>
              <th className="editColumn" />
              <th className="garbageColumn" />
            </tr>
          </thead>
          <tbody>
            {departaments? (
              departaments.map((departament) => (
                <DepartamentRow
                  key={departament._id}
                  departament={departament}
                  onEdit={() => editOrCreateDepartament("edit", departament)}
                  onDelete={() => handleOpenModal(departament)}
                />
              ))
            ) : (
              <tr>
                <th>Nenhum Departamento cadastrado</th>
              </tr>
            )}
          </tbody>
        </table>
        <ConfirmationModal
          title="Apagar departamento"
          content={`Deseja mesmo apagar o departamento "${excludeDepartament.name}"?`}
          isVisible={openModalExcludeDepartament}
          handleOk={() => handleExcludeDepartament(excludeDepartament)}
          handleCancel={handleCloseModal}
        />
        <FormModal {...editOrCreateModalInfo} />
      </DepartamentsComponent>
    );
  }
};

export default Departaments;
