import { DatePicker } from "antd";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { ALL_SESSIONS } from "../../../graphql/Sessions";
import { useLazyQuery } from "@apollo/client";
import { ThemeContext } from "../../../context/ThemeProvider";
import { HourDisplayer } from "../../atoms";
import {
  ContainerTable,
  HeadTable,
  HourDisplay,
  SumTotalTitle,
} from "./styles";
import TrackingTable from "../../molecules/TrackingTable";
import TribeTable from "../../molecules/TribeTable";
const { RangePicker } = DatePicker;

const SessionHistory = ({ filter }) => {
  const { themeColors } = useContext(ThemeContext);

  const [tribeArray, setTribeArray] = useState([]);
  const [sessionsData, setSessionsData] = useState();
  const [formatedTotalData, setFormatedTotalData] = useState();

  const today = moment();
  const fourWeeksAgo = moment().subtract(4, "weeks");

  const [rangeDate, setRangeDate] = useState([
    fourWeeksAgo.startOf("day"),
    today.endOf("day"),
  ]);

  const startDate = rangeDate && rangeDate[0];
  const endDate = rangeDate && rangeDate[1];

  function disabledDate(current) {
    return current && current > moment().endOf("day");
  }

  const [loadCompiled, { data }] = useLazyQuery(ALL_SESSIONS, {
    variables: {
      startDate: moment(startDate)?.startOf("day").toISOString(),
      endDate: moment(endDate)?.endOf("day").toISOString(),
    },
  });

  const { sessions, formatedTotal, aditionalHours } = data?.allSessions || {};

  function getData() {
    loadCompiled({
      variables: {
        taskIds: filter.tasks,
        projectIds: filter.projects,
        tribeIds: filter.tribes,
        memberIds: filter.members,
        departamentIds: filter.departaments,
        startDate: moment(startDate)?.startOf("day").toISOString(),
        endDate: moment(endDate)?.endOf("day").toISOString(),
      },
    });

    setSessionsData();
    setFormatedTotalData();
  }

  function loadData() {
    setSessionsData(sessions);
    setFormatedTotalData(formatedTotal);

    if (sessions) {
      let hashtableTribe = {};
      sessions.forEach((v) => {
        if (v.member?.tribe?.name !== undefined) {
          if (hashtableTribe[v.member?.tribe?.name] === undefined) {
            hashtableTribe[v.member?.tribe?.name] = v.duration;
          } else {
            hashtableTribe[v.member?.tribe?.name] += v.duration;
          }
        }
      });
      if (aditionalHours) {
        aditionalHours.forEach((aditionalHour) => {
          if (aditionalHour.member?.tribe?.name !== undefined) {
            hashtableTribe[aditionalHour.member?.tribe?.name] +=
              aditionalHour.amount;
          }
        });
      }
      setTribeArray(
        Object.entries(hashtableTribe).map(([key, value]) => ({ key, value }))
      );
    }
  }

  useEffect(() => {
    getData();
  }, [rangeDate, filter]);

  useEffect(() => {
    setTimeout(loadData, 500);
  }, [data]);

  return (
    <>
      <ContainerTable>
        <HeadTable>
          <HourDisplay>
            <SumTotalTitle>Soma total:</SumTotalTitle>
            {formatedTotalData && (
              <HourDisplayer
                text={formatedTotalData}
                hourColor={themeColors.yellow}
              />
            )}
          </HourDisplay>
          <RangePicker
            format="DD-MM-yyyy"
            disabledDate={disabledDate}
            onChange={setRangeDate}
            value={rangeDate}
            placeholder={["Inicio", "Fim"]}
          />
        </HeadTable>
        <TrackingTable sessions={sessionsData} />
        <TribeTable tribes={tribeArray} />
      </ContainerTable>
    </>
  );
};

export default SessionHistory;

