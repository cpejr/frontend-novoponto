import { getColumns } from "./columns"
import { Table } from "antd";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { ALL_SESSIONS } from "../../../graphql/Sessions";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ThemeContext } from "../../../context/ThemeProvider";

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
  const { aditionalHours, sessions, formatedTotal, formatedPresentialTotal } =
    data?.allSessions || {};

  const columns = getColumns(themeColors);

  return (
    <>
    {sessions && (
      <Table
        columns={columns}
        dataSource={sessions?.map((session) => ({
          key: session._id,
          ...session,
        }))}
      />
    )}
    </>
  )
};

export default TrackingTable;