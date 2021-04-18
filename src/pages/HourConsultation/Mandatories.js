import { Collapse } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { HourDisplayer } from "../../components/atoms";
import { ThemeContext } from "../../context/ThemeProvider";

function getWeekDay(daynumber) {
  const days = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];
  return days[daynumber];
}

const Mandatories = ({ mandatories, ...props }) => {
  const { themeColors } = useContext(ThemeContext);

  if (mandatories)
    return (
      <Collapse ghost>
        <Collapse.Panel header={<h3>Horários Obrigatórios</h3>} key="1">
          <table className="mandatoryHoursTable">
            <thead>
              <tr>
                <th className="dayColumn">Dia</th>
                <th className="startTime">Início</th>
                <th className="finishTime">Fim</th>
              </tr>
            </thead>
            <tbody>
              {mandatories?.map((item, index) => (
                <tr key={index}>
                  <td className="dayColumn">{getWeekDay(item.weekDay)}</td>
                  <td className="startTime">
                    <HourDisplayer
                      hour={item.startAt}
                      hourColor={themeColors.green}
                    />
                  </td>
                  <td className="finishTime">
                    <HourDisplayer
                      hour={item.endAt}
                      hourColor={themeColors.yellow}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Collapse.Panel>
      </Collapse>
    );
  else return <></>;
};

export default Mandatories;
