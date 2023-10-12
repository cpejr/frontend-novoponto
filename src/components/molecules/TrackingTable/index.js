import { Table } from "antd"
import { getColumns } from "./columns";
import { ThemeContext } from "../../../context/ThemeProvider";
import { useContext } from "react";

const TrackingTable = ({ sessions }) => {
  const { themeColors } = useContext(ThemeContext);

  const columns = getColumns(themeColors);

  return (
    <Table
    columns={columns}
    loading={sessions ? false : true}
    dataSource={sessions?.slice().reverse().map((session) => ({
      key: session._id,
      ...session,
    }))}
    />
  )
}

export default TrackingTable;