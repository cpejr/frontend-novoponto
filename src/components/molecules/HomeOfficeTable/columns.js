import React, { useEffect } from "react";
import { HourDisplayer, InfoDisplayer, DefaultText } from "../../atoms";
import moment from "moment";

import { FlexDiv, ActionsDivContainer } from "./styles";
import { message, Tooltip } from "antd";
import { RestOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { DeleteAditionalHour } from "../../../graphql/AditionalHour";

function getOperation(op) {
  switch (op) {
    case "ADD":
      return { text: "Adicionar", color: "green" };
    case "REMOVE":
      return { text: "Remover", color: "red" };
    default:
      return { text: "Erro...", color: "yellow" };
  }
}

function getColumns(themeColors, hasComment, onDelete) {
  const columns = [
    {
      title: "Dia",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <DefaultText style={{ margin: 0 }}>
          {" "}
          {moment(text).format("DD/MM/yy")}
        </DefaultText>
      ),
    },
    {
      title: "Tipo",
      dataIndex: "action",
      key: "action",
      render: (action) => (
        <FlexDiv>
          <InfoDisplayer
            info={getOperation(action).text}
            infoColor={themeColors.estatPrimaryColor}
          />
        </FlexDiv>
      ),
    },
    {
      title: "Tempo",
      dataIndex: "formatedAmount",
      key: "formatedAmount",
      render: (formatedAmount) => (
        <FlexDiv>
          <HourDisplayer
            dateOrTime={"time"}
            hour={formatedAmount}
            hourColor={themeColors.equiColor}
          />
        </FlexDiv>
      ),
    },
    {
      title: "Modalidade",
      dataIndex: "isPresential",
      key: "isPresential",
      render: (isPresential) => (
        <FlexDiv>
          <InfoDisplayer
            info={isPresential ? "Presencial" : "Remoto"}
            infoColor={themeColors.equiColor}
          />
        </FlexDiv>
      ),
    },
  ];

  if (hasComment) {
    columns.push({
      title: "O que fez",
      dataIndex: "description",
      key: "description",
      render: (description) => <DefaultText>{description}</DefaultText>,
    });

    columns.push({
      key: "actions",
      render: (data) => (
        <ActionsDiv onDelete={onDelete} additionalHour={data} />
      ),
    });
  }
  return columns;
}

function ActionsDiv({ additionalHour, onDelete, ...props }) {
  const [deleteAdditionalHourMutation] = useMutation(DeleteAditionalHour);

  async function handleDelete() {
    const hide = message.loading("Deletando...");
    try {
      await deleteAdditionalHourMutation({
        variables: { _id: additionalHour._id },
      });
      hide();

      onDelete && onDelete(additionalHour._id);
      message.success("Deletado com sucesso!");
    } catch (error) {
      hide();
      message.error("Ocorreu um erro, tente novamente mais tarde.");
    }
  }

  return (
    <ActionsDivContainer>
      <Tooltip placement="topLeft" title={"Excluir"}>
        <RestOutlined onClick={handleDelete} />
      </Tooltip>
    </ActionsDivContainer>
  );
}

export { getColumns };
