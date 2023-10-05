import { ThemeContext } from "styled-components";
import { getColumns } from "./columns"
import { Table } from "antd";
import { useContext } from "react";

const TrackingTable = ({sessions}) => {

  return (
    <Table
      columns={getColumns}
      dataSource={sessions?.map((session) => ({
        key: session._id,
        ...session,
      }))}
    />
  )
};

export default TrackingTable;