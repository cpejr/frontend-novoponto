import { Collapse, Tooltip } from "antd";
import { HourDisplayer, InfoDisplayer, DefaultText } from "../../atoms";
import { FlexDiv } from "./styles";
import moment from "moment";
import { EditOutlined, RestOutlined } from "@ant-design/icons";
import { useState } from "react";
import React from "react";

function getColumns(themeColors, activeKey, setActiveKey) {
  const columns = [
    {
      title: "Departamento",
      dataIndex: "member",
      key: "member",
      render: (member) => (
        <DefaultText className="columnText">{member?.tribe?.name}</DefaultText>
      ),
    },
    {
      title: "Usuário",
      dataIndex: "member",
      key: "member",
      render: (member) => (
        <DefaultText className="columnText">{member?.name}</DefaultText>
      ),
    },
    {
      title: "Dia",
      dataIndex: "start",
      key: "start",
      render: (start) => (
        <DefaultText style={{ margin: 0 }}>
          {" "}
          {moment(start).format("DD/MM/yy")}
        </DefaultText>
      ),
    },
    {
      title: "Chegada",
      dataIndex: "start",
      key: "start",
      render: (start) => (
        <FlexDiv>
          <HourDisplayer hour={start} hourColor={themeColors.green} />
        </FlexDiv>
      ),
    },
    {
      title: "Saída",
      dataIndex: "end",
      key: "end",
      render: (end) => (
        <FlexDiv>
          <HourDisplayer hour={end} hourColor={themeColors.green} />
        </FlexDiv>
      ),
    },
    {
      title: "Tempo",
      dataIndex: "formatedDuration",
      key: "formatedDuration",
      render: (formatedDuration) => (
        <FlexDiv>
          <InfoDisplayer
            info={formatedDuration}
            infoColor={themeColors.yellow}
          />
        </FlexDiv>
      ),
    },
  ];
  return columns;
}

export { getColumns };
