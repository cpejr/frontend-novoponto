import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeProvider";
import { HourDisplayer, InfoDisplayer } from "../../atoms";
import moment from "moment";

import { JustificationTablesArea } from "./styles";
import { Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const HomeOfficeTable = ({ aditionalHours }) => {
  const { themeColors } = useContext(ThemeContext);

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

  return (
    <JustificationTablesArea>
      <h3>Horários adicionais: </h3>

      <table className="justificationTable">
        <thead>
          <tr>
            <th className="dayColumn">Dia</th>
            <th className="typeArea">Tipo</th>
            <th className="timeArea">Tempo</th>
            <th className="timeArea">O que fez</th>
          </tr>
        </thead>
        <tbody>
          {aditionalHours?.map((item, index) => (
            <tr key={index}>
              <td className="dayColumn">
                {moment(item.date).format("DD/MM/yy")}
              </td>
              <td className="typeArea">
                <InfoDisplayer
                  info={getOperation(item.action).text}
                  infoColor={themeColors[getOperation(item.action).color]}
                />
              </td>
              <td className="timeArea">
                <HourDisplayer
                  dateOrTime={"time"}
                  hour={item.formatedAmount}
                  hourColor={themeColors.yellow}
                />
              </td>
              <td className="descriptionArea">
                <Popover content={item.description} title="O que eu fiz">
                  <InfoCircleOutlined style={{ fontSize: '2em', color: themeColors.yellow }}/>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </JustificationTablesArea>
  );
};

export default HomeOfficeTable;
