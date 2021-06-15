import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../context/ThemeProvider";
import { SessionContext } from "../../../context/SessionProvider";

import { AditionalHourTableArea } from "./styles";
import { Table, Collapse } from "antd";
import { getColumns } from "./columns";

const HomeOfficeTable = ({ aditionalHours, onDelete }) => {
  const { themeColors } = useContext(ThemeContext);
  const { data } = useContext(SessionContext);

  const [columns, setColums] = useState();

  useEffect(() => {
    const visible =
      data?.member?.role?.access > 0 ||
      !!aditionalHours?.find((item) => !!item.description);

    setColums(getColumns(themeColors, visible, onDelete));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aditionalHours, themeColors]);

  return (
    <AditionalHourTableArea>
      <Collapse ghost defaultActiveKey={"1"}>
        <Collapse.Panel header={<h6>Horas Adicionais: </h6>} key="1">
          <Table
            columns={columns}
            dataSource={aditionalHours?.map((aditional) => ({
              key: aditional._id,
              ...aditional,
            }))}
          />
        </Collapse.Panel>
      </Collapse>
    </AditionalHourTableArea>
  );
};

export default HomeOfficeTable;
