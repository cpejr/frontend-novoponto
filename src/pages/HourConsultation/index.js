import React, { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";

import { HoursConsultationComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { DatePicker, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { FetchMemberForHC } from "../../graphql/Member";
import MembersSelectBox from "../../components/molecules/MembersSelectBox";

import {
  HourDisplayer,
  InfoDisplayer,
  CommonSelectBox,
} from "../../components/atoms";

import LoggedMembers from "../../components/molecules/LoggedMembersSection";

const membersOptions = [
  {
    value: "Diogo",
    role: "Gerente de Produtos",
    description: "Uma descrição",
    label: "Diogo",
  },
  {
    value: "Arthur Lima",
    role: "Head de Projetos",
    description: "Uma descrição teste",
    label: "Arthur Lima",
  },
  {
    value: "Arthur Braga",
    role: "Head de Marketing",
    description: "Uma descrição teste 2",
    label: "Arthur Braga",
  },
  {
    value: "João Prates",
    role: "Consultor de Vendas",
    description: "Vendas",
    label: "João Prates",
  },
];

const mandatoryHoursOptions = [
  {
    dia: "Segunda",
    inicio: "10:30",
    fim: "12:30",
  },
  {
    dia: "Terça",
    inicio: "17:30",
    fim: "19:30",
  },
];

const historicHoursOptions = [
  {
    dia: "18/01/2021",
    chegada: "10:30",
    saida: "12:30",
    tempo: "19:30",
  },
  {
    dia: "19/02/2021",
    chegada: "14:30",
    saida: "16:30",
    tempo: "02:30",
  },
];

const justificativeOptions = [
  {
    dia: "18/01/2021",
    tipo: "10:30",
    tempo: "19:30",
  },
  {
    dia: "19/02/2021",
    tipo: "14:30",
    tempo: "02:30",
  },
];

const HoursConsultation = () => {
  const { RangePicker } = DatePicker;
  const { themeColors } = useContext(ThemeContext);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const inputSelect = useRef(null);

  const [rangeDate, setRangeDate] = useState([]);
  const [memberSelected, setMemberSelected] = useState([]);
  const [memberPageLoading, setMemberPageLoading] = useState(false);
  const [resultSumHistoricHours, setResultSumHistoricHours] = useState(0);

  const {
    loading: memberLoading,
    error: memberError,
    data: memberData,
    refetch: refetchMember,
  } = useQuery(FetchMemberForHC);

  function handleSelectMember(value) {
    function checkForError(loading, error, setLoading) {
      console.log("Check error");
      setLoading(true);
      while (loading) {
        console.log(
          "🚀 ~ file: index.js ~ line 109 ~ checkForError ~ loading",
          loading
        );
      }
      setLoading(false);
      return error;
    }

    console.log("handleSelectMember!");
    const response = checkForError(
      memberLoading,
      memberError,
      setMemberPageLoading
    );
    if (!response)
      setMemberSelected(
        memberData && memberData.filter((item) => item.value === value)
      );
  }

  function handleSelectDate(value, dateString) {
    console.log("Selected Time: ", value);
    setRangeDate([dateString[0], dateString[1]]);
    console.log("Formatted Selected Time: ", dateString);
  }

  // Somente para inicializar, depois retiraremos o useEffect
  useEffect(() => {
    setResultSumHistoricHours("100:00");
  }, []);

  return (
    <HoursConsultationComponent theme={themeColors}>
      <div className="selectMemberArea">
        <MembersSelectBox onChange={handleSelectMember} />
        {memberPageLoading && <Spin indicator={antIcon} className="loadIcon" />}
      </div>

      <div className="memberArea">
        <LoggedMembers
          name={memberSelected[0]?.label || "Lampinho"}
          role={memberSelected[0]?.role || "Mascote"}
          description={
            memberSelected[0]?.description || "Trabalhe enquanto eles dormem"
          }
        />
      </div>

      <div className="mandatoryHours">
        <h2>Horários Obrigatórios</h2>

        <table className="mandatoryHoursTable">
          <thead>
            <tr>
              <th className="dayColumn">Dia</th>
              <th className="startTime">Início</th>
              <th className="finishTime">Fim</th>
            </tr>
          </thead>
          <tbody>
            {mandatoryHoursOptions.length > 0 ? (
              mandatoryHoursOptions.map((item, index) => (
                <tr key={index}>
                  <td className="dayColumn">{item.dia}</td>
                  <td className="startTime">
                    <HourDisplayer
                      hour={new Date()}
                      hourColor={themeColors.green}
                    />
                  </td>
                  <td className="finishTime">
                    <HourDisplayer
                      hour={new Date().getTime()}
                      hourColor={themeColors.yellow}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <h1 style={{ color: "#fff", fontSize: "30px" }}>
                  Seja mais Braga
                </h1>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pointHistoric">
        <h2>Histórico Ponto</h2>

        <Space direction="vertical" size={12}>
          <RangePicker
            format="YYYY-MM-DD"
            onChange={handleSelectDate}
            placeholder={["Inicio", "Fim"]}
          />
        </Space>
      </div>

      <div className="hoursSumAndTablesArea">
        <h2>Soma: {resultSumHistoricHours}</h2>

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
            {historicHoursOptions.length > 0 ? (
              historicHoursOptions.map((item, index) => (
                <tr key={index}>
                  <td className="dayColumn">{item.dia}</td>
                  <td className="startTime">
                    <HourDisplayer
                      hour={new Date()}
                      hourColor={themeColors.green}
                    />
                  </td>
                  <td className="finishTime">
                    <HourDisplayer
                      hour={new Date().getTime()}
                      hourColor={themeColors.green}
                    />
                  </td>
                  <td className="timeArea">
                    <InfoDisplayer
                      info={"10:00"}
                      infoColor={themeColors.yellow}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <h1 style={{ color: "#fff", fontSize: "30px" }}>
                  Seja mais Braga
                </h1>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="justificationTablesArea">
        <h2>Justificativas</h2>

        <table className="justificationTable">
          <thead>
            <tr>
              <th className="dayColumn">Dia</th>
              <th className="typeArea">Tipo</th>
              <th className="timeArea">Tempo</th>
            </tr>
          </thead>
          <tbody>
            {justificativeOptions.length > 0 ? (
              justificativeOptions.map((item, index) => (
                <tr key={index}>
                  <td className="dayColumn">{item.dia}</td>
                  <td className="typeArea">
                    <InfoDisplayer
                      info={"Adicionar"}
                      infoColor={themeColors.green}
                    />
                  </td>
                  <td className="timeArea">
                    <HourDisplayer
                      hour={"10:00"}
                      hourColor={themeColors.yellow}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <h1 style={{ color: "#fff", fontSize: "30px" }}>
                  Seja mais Braga
                </h1>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </HoursConsultationComponent>
  );
};

export default HoursConsultation;
