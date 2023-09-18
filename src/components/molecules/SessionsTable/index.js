import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeProvider";
import { getColumns } from "./columns";
import { HourDisplayer } from "../../atoms";

import { HoursSumAndTablesArea, ExportButtonContainer } from "./styles";
import { Collapse, Table } from "antd";
import ExportExcel from "../ExportExcelButton";

const SessionsTable = ({
  sessions,
  formatedTotal,
  formatedPresentialTotal,
}) => {
  const { themeColors } = useContext(ThemeContext);
  const columns = getColumns(themeColors);

  return (
    <HoursSumAndTablesArea>
      <div className="sum">
        <h6 className="m-0 me-2">Soma total:</h6>
        <HourDisplayer text={formatedTotal} hourColor={themeColors.yellow} />
      </div>
      <ExportButtonContainer>
        <div className="sum">
          <h6 className="m-0 me-2">Soma presencial:</h6>
          <HourDisplayer
            text={formatedPresentialTotal}
            hourColor={themeColors.yellow}
          />
        </div>
        <ExportExcel
          jsonData={sessions}
          archiveName="Sessões"
        ></ExportExcel>
       
      </ExportButtonContainer>
      <Collapse ghost defaultActiveKey={"1"}>
        <Collapse.Panel header={<h6>Sessões:</h6>} key="1">
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
