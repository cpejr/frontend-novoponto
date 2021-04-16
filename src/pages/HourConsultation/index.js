import React, { useContext, useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import moment from "moment";

import { HoursConsultationComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { DatePicker, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { FetchMemberForHC, FetchCompiledForHC } from "../../graphql/Member";

import MembersSelectBox from "../../components/molecules/MembersSelectBox";
import {
  HourDisplayer,
  InfoDisplayer,
  CommonSelectBox,
} from "../../components/atoms";

import LoggedMembers from "../../components/molecules/LoggedMembersSection";

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

  const [rangeDate, setRangeDate] = useState();
  const [selectedId, setSelectedId] = useState();
  const [memberSelected, setMemberSelected] = useState();
  const [mandatoryHoursOptions, setMandatoryHoursOptions] = useState();
  const [compiledDirectData, setCompiledDirectData] = useState();
  const [sessions, setSessions] = useState();
  const [aditionalHours, setAditionalHours] = useState();

  console.log("Renderizou!");

  const [
    loadMember,
    {
      loading: memberLoading,
      error: memberError,
      data: memberData,
      refetch: refetchMember,
    },
  ] = useLazyQuery(FetchMemberForHC, {
    variables: { _id: selectedId },
  });

  const [
    loadCompiled,
    {
      loading: compiledLoading,
      error: compiledError,
      data: compiledData,
      refetch: refetchCompiled,
    },
  ] = useLazyQuery(FetchCompiledForHC, {
    variables: {
      memberId: selectedId,
      startDate: rangeDate
        ? rangeDate[0]
          ? rangeDate[0]
          : undefined
        : undefined,
      endDate: rangeDate
        ? rangeDate[1]
          ? rangeDate[1]
          : undefined
        : undefined,
    },
  });

  function handleSelectMember(value) {
    setSelectedId(value);
  }

  function handleCompiled(compiledData) {
    const { compiled } = compiledData;
    setSessions(compiled.sessions);
    setAditionalHours(compiled.aditionalHours);
    setCompiledDirectData(compiled);
  }

  useEffect(() => {
    if (selectedId) {
      loadMember();
      loadCompiled();
    }
    if (memberData) {
      setMemberSelected(memberData.member);
    }
    if (compiledData) {
      handleCompiled(compiledData);
    }
  }, [selectedId, memberData, compiledData]);

  useEffect(() => {
    if (memberSelected) {
      setMandatoryHoursOptions(memberSelected.mandatories);
    }
  }, [memberSelected]);

  function handleSelectDate(value, dateString) {
    setRangeDate([dateString[0], dateString[1]]);
    refetchCompiled();
  }

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
    <HoursConsultationComponent theme={themeColors}>
      <div className="selectMemberArea">
        <MembersSelectBox onChange={handleSelectMember} />
        {memberLoading ? (
          <Spin indicator={antIcon} className="loadIcon" />
        ) : (
          <div className="loadIcon"></div>
        )}
      </div>

      {memberSelected && (
        <div className="memberArea">
          <LoggedMembers
            name={memberSelected.name || "Lampinho"}
            role={memberSelected.role?.name}
            description={
              memberSelected.status || "Trabalhe enquanto eles dormem"
            }
            imageLink={memberSelected.imageLink}
          />
        </div>
      )}

      {memberSelected &&
        mandatoryHoursOptions &&
        mandatoryHoursOptions.length > 0 && (
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
                {mandatoryHoursOptions.map((item, index) => (
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
          </div>
        )}

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

      {compiledDirectData && (
        <div className="hoursSumAndTablesArea">
          <h2>Soma: {compiledDirectData.formatedTotal}</h2>

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
              {sessions.length > 0 &&
                sessions.map((item, index) => (
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
      )}

      {compiledDirectData && (
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
              {aditionalHours.length > 0 &&
                aditionalHours.map((item, index) => (
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
                        hour={item.amount}
                        hourColor={themeColors.yellow}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </HoursConsultationComponent>
  );
};

export default HoursConsultation;
