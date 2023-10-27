import React, { useEffect, useState } from "react";
import { ConfigProvider, DatePicker } from "antd";
import moment from "moment";
import HomeOfficeTable from "../../molecules/HomeOfficeTable";
import SessionsTable from "../../molecules/SessionsTable";
import { MemberHistoyContainer } from "./styles";
import customizeRenderEmpty from "../../molecules/CustomizeEmpty";
const { RangePicker } = DatePicker;

const MemberHistory = ({ memberId, rangeDate, setRangeDate, loadData, loading, data, refetch }) => {

  const startDate = rangeDate && rangeDate[0];
  const endDate = rangeDate && rangeDate[1];

  const { aditionalHours, sessions, formatedTotal, formatedPresentialTotal } =
  data?.compiled || {};

  useEffect(() => {
    if (startDate && endDate && memberId) loadData();
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

        {sessions && (
          <div className="mt-4">
            <SessionsTable
              refetch={refetch}
              sessions={sessions}
              formatedTotal={formatedTotal}
              formatedPresentialTotal={formatedPresentialTotal}
            />
            <ConfigProvider renderEmpty={() => customizeRenderEmpty('A partir de agora, novas adições serão diretamente incorporadas como novas sessões!')}>
              <HomeOfficeTable
                aditionalHours={aditionalHours}
                onDelete={loadData}
              />
            </ConfigProvider>
          </div>
        )}
      </MemberHistoyContainer>
    );
  else return <></>;
};

export default MemberHistory;
