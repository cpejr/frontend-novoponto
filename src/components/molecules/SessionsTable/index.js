import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeProvider";
import { getColumns } from "./columns";
import { HourDisplayer } from "../../atoms";

import { HoursSumAndTablesArea } from "./styles";
import { Collapse, Table, message } from "antd";
import ConfirmationModal from "../ConfirmationModal";
import { DELETE_SESSION } from "../../../graphql/Sessions";
import { useMutation } from "@apollo/client";

const SessionsTable = ({
  refetch,
  sessions,
  formatedTotal,
  formatedPresentialTotal,
}) => {
  const { themeColors } = useContext(ThemeContext);

  const [openModalExcludeSession, setOpenModalExcludeSession] = useState(false);
  const [excludeSession, setExcludeSession] = useState({});

  const [deleteSessionMutation] = useMutation(DELETE_SESSION);

  const handleOpenModal = (session) => {
    setExcludeSession(session);
    setOpenModalExcludeSession(true);
  };

  const columns = getColumns(themeColors, handleOpenModal);

  const handleCloseModal = () => {
    setOpenModalExcludeSession(false);
  };

  const handleExcludeSession = async (session) => {
    var hide = message.loading("Excluindo");
    try {
      await deleteSessionMutation({ variables: { sessionId: session } });
      hide();
      message.success("Excluido com sucesso", 2.5);
      refetch();
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    setOpenModalExcludeSession(false);
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
      <ConfirmationModal
          title="Apagar cargo"
          content={`Deseja mesmo apagar o cargo esse horário?`}
          isVisible={openModalExcludeSession}
          handleOk={() => handleExcludeSession(excludeSession)}
          handleCancel={handleCloseModal}
      />
    </HoursSumAndTablesArea>
  );
};

export default SessionsTable;
