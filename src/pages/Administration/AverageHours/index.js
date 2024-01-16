import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import moment from "moment";

import { message, Skeleton } from "antd";
import { DatePicker } from "antd";
import { AverageHoursComponent } from "./styles";
import { RocketOutlined } from "@ant-design/icons";
import { ThemeContext } from "../../../context/ThemeProvider";

import AverageHoursRow from "./AverageHoursRow";
import { GET_AVERAGEHOURS } from "../../../graphql/AverageHours";

const { RangePicker } = DatePicker;

const AverageHours = () => {
  const { themeColors } = useContext(ThemeContext);
  const [departamentHours, setDepartamentHours] = useState([]);
  const [levelHours, setLevelHours] = useState([]);

  const today = moment();
  const fourWeeksAgo = moment().subtract(4, "weeks");
  const [rangeDate, setRangeDate] = useState([
    fourWeeksAgo.startOf("day"),
    today.endOf("day"),
  ]);
  function disabledDate(current) {
    return current && current > moment().endOf("day");
  }

  const { loading, error, data } = useQuery(GET_AVERAGEHOURS, {
    variables: { end: rangeDate[1]._d, start: rangeDate[0]._d },
  });

  useEffect(() => {
    separateHourData();
  }, [data]);

  function separateHourData() {
    if (data) {
      const { averageHours } = data;
      averageHours.forEach((hour) => {
        if (hour.type === "departament")
          setDepartamentHours((departamentHours) => [
            ...departamentHours,
            hour,
          ]);
        else setLevelHours((levelHours) => [...levelHours, hour]);
      });
    }
  }
  console.log(data);
  console.log(departamentHours);
  console.log(levelHours);

  if (loading)
    return (
      <Skeleton
        paragraph={{ rows: 4 }}
        size={"large"}
        active={loading}
        loading={loading}
      />
    );

  if (error) {
    console.log(error);
    message.error("Houve um problema, tente recarregar a pagina", 2.5);
    return <h1>Erro, recarregue a pagina</h1>;
  }

  if (data) {
    return (
      <AverageHoursComponent theme={themeColors}>
        <div className="iconWithTitle">
          <RocketOutlined className="svgIcon" />
          <h1>Média de horas</h1>
        </div>

        <RangePicker
          className="rangePicker"
          format="DD-MM-yyyy"
          disabledDate={disabledDate}
          onChange={setRangeDate}
          value={rangeDate}
          placeholder={["Inicio", "Fim"]}
        />

        <div className="tables">
          <table className="departamentHoursTable">
            <thead>
              <tr>
                <th className="avgHoursColumn">Departamento</th>
                <th className="avgHoursColumn">Média de horas</th>
              </tr>
            </thead>
            <tbody>
              {departamentHours ? (
                departamentHours.map((departament) => {
                  console.log(departament);
                  return (
                    <AverageHoursRow
                      key={departament._id}
                      averageHour={departament}
                    />
                  );
                })
              ) : (
                <tr>
                  <th>Nenhum Departamento cadastrado</th>
                </tr>
              )}
            </tbody>
          </table>

          <table className="roleHoursTable">
            <thead>
              <tr>
                <th className="avgHoursColumn">Nível organizacional</th>
                <th className="avgHoursColumn">Média de horas</th>
              </tr>
            </thead>
            <tbody>
              {levelHours ? (
                levelHours.map((level) => (
                  <AverageHoursRow key={level.name} averageHour={level} />
                ))
              ) : (
                <tr>
                  <th>Nenhum nível cadastrado</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AverageHoursComponent>
    );
  }
};

export default AverageHours;

