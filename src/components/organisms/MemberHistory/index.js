import React, { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { useLazyQuery } from "@apollo/client";

import { FetchCompiledForHC } from "../../../graphql/Member";
import HomeOfficeTable from "../../molecules/HomeOfficeTable";
import SessionsTable from "../../molecules/SessionsTable";
import { MemberHistoyContainer } from "./styles";
const { RangePicker } = DatePicker;

const MemberHistory = ({ memberId, ...props }) => {
  const [rangeDate, setRangeDate] = useState([
    moment().startOf("isoWeek"),
    moment(),
  ]);

  const startDate = rangeDate && rangeDate[0];
  const endDate = rangeDate && rangeDate[1];

  const [loadCompiled, { loading, data }] = useLazyQuery(FetchCompiledForHC, {
    fetchPolicy: "network-only",
  });

  const { aditionalHours, sessions, formatedTotal } = data?.compiled || {};

  async function loadData() {
    return loadCompiled({
      variables: {
        memberId,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      },
    });
  }

  useEffect(() => {
    if (startDate && endDate && memberId) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, rangeDate]);

  function disabledDate(current) {
    // Can not select days after today
    return current && current > moment().endOf("day");
  }

  if (memberId && !loading)
    return (
      <MemberHistoyContainer>
        <h5>Histórico Ponto</h5>

        <RangePicker
          format="DD-MM-yyyy"
          disabledDate={disabledDate}
          onChange={setRangeDate}
          value={rangeDate}
          placeholder={["Inicio", "Fim"]}
        />

        {startDate && endDate && (
          <div className="mt-4">
            <SessionsTable sessions={sessions} formatedTotal={formatedTotal} />
            <HomeOfficeTable
              aditionalHours={aditionalHours}
              onDelete={loadData}
            />
          </div>
        )}
      </MemberHistoyContainer>
    );
  else return <></>;
};

export default MemberHistory;
