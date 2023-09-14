import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { useLazyQuery } from "@apollo/client";
import { FetchCompiledForHC } from "../../../graphql/Member";
import HomeOfficeTable from "../../molecules/HomeOfficeTable";
import SessionsTable from "../../molecules/SessionsTable";
import { MemberHistoyContainer } from "./styles";
import ExportExcel from "../../atoms/ExportExcelButton";
const { RangePicker } = DatePicker;
const nomeDoArquivo = "PlanilhaSessões";

const MemberHistory = ({ memberId }) => {
  const [rangeDate, setRangeDate] = useState([
    moment().startOf("isoWeek"),
    moment().endOf("day"),
  ]);

  const startDate = rangeDate && rangeDate[0];
  const endDate = rangeDate && rangeDate[1];

  const [dadosJson, setDadosJson] = useState([]);

  const [loadCompiled, { loading, data }] = useLazyQuery(FetchCompiledForHC, {
    fetchPolicy: "network-only",
  });
  const { aditionalHours, sessions, formatedTotal, formatedPresentialTotal } =
    data?.compiled || {};


  async function loadData() {
    return loadCompiled({
      variables: {
        memberId,
        startDate: moment(startDate)?.startOf("day").toISOString(),
        endDate: moment(endDate)?.endOf("day").toISOString(),
      },
    }, 
    );
  }

  useEffect(() => {
    if (startDate && endDate && memberId) loadData();
    setDadosJson(sessions);
    console.log(dadosJson);
    console.log(sessions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, rangeDate, ]);

  function disabledDate(current) {
    // Can not select days after today
    return current && current > moment().endOf("day");
  }


  if (memberId && !loading)
    return (
      <MemberHistoyContainer>
        <h5>Histórico Ponto</h5>
        <ExportExcel dadosJson={dadosJson} nomeDoArquivo={nomeDoArquivo}></ExportExcel>

        <RangePicker
          format="DD-MM-yyyy"
          disabledDate={disabledDate}
          onChange={setRangeDate}
          value={rangeDate}
          placeholder={["Inicio", "Fim"]}
        />

        {startDate && endDate && (
          <div className="mt-4">
            <SessionsTable
              sessions={sessions}
              formatedTotal={formatedTotal}
              formatedPresentialTotal={formatedPresentialTotal}
            />
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
