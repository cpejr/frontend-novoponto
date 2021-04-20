import React, { useContext, useEffect, useState } from "react";
import { Space } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { useLazyQuery } from "@apollo/client";

import { HourDisplayer, InfoDisplayer } from "../../components/atoms";
import { FetchCompiledForHC } from "../../graphql/Member";
import { ThemeContext } from "../../context/ThemeProvider";
import HomeOfficeTable from "../../components/molecules/HomeOfficeTable";

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

  function getOperation(op) {
    switch (op) {
      case "ADD":
        return { text: "Adicionar", color: "green" };
      case "REMOVE":
        return { text: "Remover", color: "red" };
      default:
        return { text: "Erro...", color: "yellow" };
    }
  }

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
            <div className="hoursSumAndTablesArea">
              <div className="sum">
                <h3>Soma:</h3>
                <HourDisplayer
                  text={formatedTotal}
                  hourColor={themeColors.yellow}
                />
              </div>
              <table className="hoursSumAndTable">
                <thead>
                  <tr>
                    <th className="dayColumn">Dia</th>
                    <th className="startTime">Chegada</th>
                    <th className="finishTime">Saída</th>
                    <th className="timeArea">Tempo</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions?.map((item, index) => (
                    <tr key={index}>
                      <td className="dayColumn">
                        {moment(item.start).format("DD/MM/yy")}
                      </td>
                      <td className="startTime">
                        <HourDisplayer
                          hour={item.start}
                          hourColor={themeColors.green}
                        />
                      </td>
                      <td className="finishTime">
                        <HourDisplayer
                          hour={item.end}
                          hourColor={themeColors.green}
                        />
                      </td>
                      <td className="timeArea">
                        <InfoDisplayer
                          info={item.formatedDuration}
                          infoColor={themeColors.yellow}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <HomeOfficeTable aditionalHours={aditionalHours}/>
          </>
        )}
      </>
    );
  else return <> </>;
};

export default History;
