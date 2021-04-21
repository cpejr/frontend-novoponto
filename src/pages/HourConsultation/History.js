import React, { useContext, useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { useLazyQuery } from "@apollo/client";

import { FetchCompiledForHC } from "../../graphql/Member";
import { ThemeContext } from "../../context/ThemeProvider";
import HomeOfficeTable from "../../components/molecules/HomeOfficeTable";
import SessionsTable from "../../components/molecules/SessionsTable";

const { RangePicker } = DatePicker;

const History = ({ memberId, ...props }) => {
  const { themeColors } = useContext(ThemeContext);

  const [rangeDate, setRangeDate] = useState([
    moment().startOf("isoWeek"),
    moment(),
  ]);

  const startDate = rangeDate && rangeDate[0];
  const endDate = rangeDate && rangeDate[1];

  const [loadCompiled, { loading, data }] = useLazyQuery(FetchCompiledForHC);

  const { aditionalHours, sessions, formatedTotal } = data?.compiled || {};

  useEffect(() => {
    if (startDate && endDate && memberId)
      loadCompiled({
        variables: {
          memberId,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, rangeDate]);

  function disabledDate(current) {
    // Can not select days after today
    return current && current > moment().endOf("day");
  }
  if (memberId && !loading)
    return (
      <>
        <div className="pointHistoric">
          <h3>Histórico Ponto</h3>

          <Space direction="vertical" size={12}>
            <RangePicker
              format="DD-MM-yyyy"
              disabledDate={disabledDate}
              onChange={setRangeDate}
              value={rangeDate}
              placeholder={["Inicio", "Fim"]}
            />
          </Space>
        </div>

        {startDate && endDate && (
          <>
            <SessionsTable sessions={sessions} formatedTotal={formatedTotal} />
            <HomeOfficeTable aditionalHours={aditionalHours} />
          </>
        )}
      </>
    );
  else
    return <></>;
};

export default History;
