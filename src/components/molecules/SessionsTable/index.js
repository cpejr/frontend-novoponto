import react from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeProvider";
import { getColumns } from "./columns";
import { HourDisplayer } from "../../atoms"

import { HoursSumAndTablesArea } from "./styles";

import { Collapse, Table } from "antd";

const SessionsTable = ({ sessions, formatedTotal }) => {
  const { themeColors } = useContext(ThemeContext);
  const columns = getColumns(themeColors);

  return (
    <HoursSumAndTablesArea>
      <div className="sum">
        <h6 className="m-0 me-2">Soma:</h6>
        <HourDisplayer text={formatedTotal} hourColor={themeColors.yellow} />
      </div>
      <Collapse ghost defaultActiveKey={"1"}>
        <Collapse.Panel header={<h6>Sessões: </h6>} key="1">
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
