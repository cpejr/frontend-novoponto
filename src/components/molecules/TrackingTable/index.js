import { getColumns } from "./columns"
import { Table } from "antd";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { ALL_SESSIONS } from "../../../graphql/Sessions";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ThemeContext } from "../../../context/ThemeProvider";
import { HourDisplayer } from "../../atoms";
import { ContainerTable } from "./styles";

const TrackingTable = () => {
  const { themeColors } = useContext(ThemeContext);

  const today = moment();
  const fourWeeksAgo = moment().subtract(4, 'weeks');

  const [rangeDate, setRangeDate] = useState([
    fourWeeksAgo.startOf('day'),
    today.endOf('day'),
  ]);

  const startDate = rangeDate && rangeDate[0];
  const endDate = rangeDate && rangeDate[1];

  const { loading, data, error, refetch } = useQuery(ALL_SESSIONS, {
    variables: {
      startDate: moment(startDate)?.startOf("day").toISOString(),
      endDate: moment(endDate)?.endOf("day").toISOString(),
    }
  });
  const {sessions, formatedTotal } =
    data?.allSessions || {};

  const columns = getColumns(themeColors);

  console.log(data);

  return (
    <>
    {sessions && (
      <ContainerTable>
      <div className="sum">
        <h6 className="m-0 me-2">Soma total:</h6>
        <HourDisplayer text={formatedTotal} hourColor={themeColors.yellow} />
      </div>
        <Table
          columns={columns}
          dataSource={sessions?.slice().reverse().map((session) => ({
            key: session._id,
            ...session,
          }))}
        />
      </ContainerTable>
    )}
    </>
  )
};

export default TrackingTable;