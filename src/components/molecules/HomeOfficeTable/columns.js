import React from "react";
import { HourDisplayer, InfoDisplayer, DefaultText } from "../../atoms";
import moment from "moment";

import { FlexDiv } from "./styles";

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

function getColumns(themeColors, hasComment) {
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
            infoColor={themeColors[getOperation(action).color]}
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
            text={formatedAmount}
            hourColor={themeColors.yellow}
          />
        </FlexDiv>
      ),
    },
  ];

  if (hasComment)
    columns.push({
      title: "O que fez",
      dataIndex: "description",
      key: "description",
      render: (description) => <DefaultText>{description}</DefaultText>,
    });
  return columns;
}

export { getColumns };
