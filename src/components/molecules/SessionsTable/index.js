import react from "react";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../context/ThemeProvider";
import moment from "moment";

import { HoursSumAndTablesArea, FlexDiv } from "./styles";
import { HourDisplayer, InfoDisplayer, DefaultText } from "../../atoms";
import { Collapse, Table } from "antd";

const SessionsTable = ({ sessions, formatedTotal }) => {
  const { themeColors } = useContext(ThemeContext);

  const columns = [
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

  return (
    <HoursSumAndTablesArea>
      <div className="sum">
        <h3>Soma:</h3>
        <HourDisplayer text={formatedTotal} hourColor={themeColors.yellow} />
      </div>
      <Collapse ghost defaultActiveKey={"1"}>
        <Collapse.Panel header={<h3>Sessões: </h3>} key="1">
          <Table
            columns={columns}
            dataSource={sessions?.map((session) => ({
              key: session._id,
              ...session,
            }))}
          />
        </Collapse.Panel>
      </Collapse>
    </HoursSumAndTablesArea>
  );
};

export default SessionsTable;
