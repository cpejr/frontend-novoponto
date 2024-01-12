import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import moment from "moment";

import { message, Skeleton } from "antd";
import { DatePicker } from "antd";
import { AverageHoursComponent } from "./styles";
import { RocketOutlined } from "@ant-design/icons";
import { ThemeContext } from "../../../context/ThemeProvider";

import AverageHoursRow from "./AverageHoursRow";
import { GET_DEPARTAMENTS } from "../../../graphql/Departaments";

const { RangePicker } = DatePicker;

const AverageHours = () => {
  const { themeColors } = useContext(ThemeContext);

  const today = moment();
  const fourWeeksAgo = moment().subtract(4, "weeks");
  const [rangeDate, setRangeDate] = useState([
    fourWeeksAgo.startOf("day"),
    today.endOf("day"),
  ]);

  function disabledDate(current) {
    return current && current > moment().endOf("day");
  }

  const { loading, error, data } = useQuery(GET_DEPARTAMENTS);

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
    const { departament: departaments } = data;
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
              {departaments ? (
                departaments.map((departament) => (
                  <AverageHoursRow
                    key={departament._id}
                    averageHours={departament}
                  />
                ))
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
              {departaments ? (
                departaments.map((organizacional) => (
                  <AverageHoursRow
                    key={organizacional._id}
                    averageHours={organizacional}
                  />
                ))
              ) : (
                <tr>
                  <th>Nenhum Departamento cadastrado</th>
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
