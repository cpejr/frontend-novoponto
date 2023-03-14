import { Collapse } from "antd";
import React, { useContext } from "react";
import {
  HourDisplayer,
  DefaultText,
} from "../../components/atoms";
import { ThemeContext } from "../../context/ThemeProvider";

import { Table } from "antd";

import { FlexDiv } from "./styles";

function getWeekDay(daynumber) {
  const days = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];
  return days[daynumber];
}

const Mandatories = ({ mandatories, ...props }) => {
  const { themeColors } = useContext(ThemeContext);

  const columns = [
    {
      title: "Dia",
      dataIndex: "weekDay",
      key: "weekDay",
      render: (weekDay) => (
        <DefaultText style={{ margin: 0 }}>{getWeekDay(weekDay)}</DefaultText>
      ),
    },
    {
      title: "Inicio",
      dataIndex: "startAt",
      key: "startAt",
      render: (startAt) => (
        <FlexDiv>
          <HourDisplayer hour={startAt} hourColor={themeColors.multPrimaryColor} />
        </FlexDiv>
      ),
    },
    {
      title: "Fim",
      dataIndex: "endAt",
      key: "endAt",
      render: (endAt) => (
        <FlexDiv>
          <HourDisplayer hour={endAt} hourColor={themeColors.multColor} />
        </FlexDiv>
      ),
    },
  ];

  if (mandatories)
    return (
      <Collapse ghost>
        <Collapse.Panel header={<h6>Horários Obrigatórios</h6>} key="1">
          <Table
            columns={columns}
            dataSource={mandatories?.map((mandatory) => ({
              key: mandatory._id,
              ...mandatory,
            }))}
          />
        </Collapse.Panel>
      </Collapse>
    );
  else return <></>;
};

export default Mandatories;
