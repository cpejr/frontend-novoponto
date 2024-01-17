import { Table } from "antd"
import { getColumns } from "./columns";
import { ThemeContext } from "../../../context/ThemeProvider";
import { useContext } from "react";
import { ContainerTable } from "./styles";

const TribeTable = ({ tribes }) => {
  const { themeColors } = useContext(ThemeContext);

  const columns = getColumns(themeColors);

  return (
    <ContainerTable>
    <Table
    columns={columns}
    loading={tribes ? false : true}
    dataSource={tribes?.slice().reverse().map((session) => ({
      key: session._id,
      ...session,
    }))}
    />
    </ContainerTable>
  )
}

export default TribeTable;