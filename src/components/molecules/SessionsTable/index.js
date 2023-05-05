import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeProvider";
import { SessionContext } from "../../../context/SessionProvider";
import { getColumns } from "./columns";
import { HourDisplayer } from "../../atoms";
import EditSessionModal from "../EditSessionModal";

import { HoursSumAndTablesArea } from "./styles";
import { Collapse, Table } from "antd";

const SessionsTable = ({
  sessions,
  formatedTotal,
  formatedPresentialTotal,
  memberId,
}) => {
  const { themeColors } = useContext(ThemeContext);
  const { data } = useContext(SessionContext);
  const [editSessionModal, setEditSessionModal] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const columns = getColumns(themeColors, data.member, memberId, handleOpenEditSessionModal);

  function handleOpenEditSessionModal(sessionId) {
    setSelectedSessionId(sessionId)
    setEditSessionModal(true);
  };

  return (
    <HoursSumAndTablesArea>
      <div className="sum">
        <h6 className="m-0 me-2">Soma total:</h6>
        <HourDisplayer text={formatedTotal} hourColor={themeColors.yellow} />
      </div>
      <div className="sum">
        <h6 className="m-0 me-2">Soma presencial:</h6>
        <HourDisplayer
          text={formatedPresentialTotal}
          hourColor={themeColors.yellow}
        />
      </div>
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
      <EditSessionModal
        isVisible={true}
      />
    </HoursSumAndTablesArea>
  );
};

export default SessionsTable;
