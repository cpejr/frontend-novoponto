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
  const [hashtableMemberHours, setHashtableMemberHours] = useState([]);
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

  const [loadCompiled, { loading, data, error, refetch }] = useLazyQuery(
    ALL_SESSIONS,
    {
      variables: {
        startDate: moment(startDate)?.startOf("day").toISOString(),
        endDate: moment(endDate)?.endOf("day").toISOString(),
      },
    }
  );

  const { sessions, formatedTotal, aditionalHours } = data?.allSessions || {};

  function getData() {
    loadCompiled({
      variables: {
        taskIds: filter.tasks,
        projectIds: filter.projects,
        tribeIds: filter.departaments,
        memberIds: filter.members,
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

    let hashtableMemberHoursConstruct = {};

    if (sessions) {
      sessions.forEach((session) => {
        if (session.member !== undefined && session.task !== undefined) {
          const memberName = session.member.name;
          const taskName = session.task.name;
          const duration = session.duration;

          if (!hashtableMemberHoursConstruct[memberName]) {
            hashtableMemberHoursConstruct[memberName] = {};
          }

          if (!hashtableMemberHoursConstruct[memberName][taskName]) {
            hashtableMemberHoursConstruct[memberName][taskName] = duration;
          } else {
            hashtableMemberHoursConstruct[memberName][taskName] += duration;
          }
        }
      });
    }
    Object.keys(hashtableMemberHoursConstruct).forEach((memberName) => {
      const tasksArray = Object.entries(
        hashtableMemberHoursConstruct[memberName]
      ).map(([name, value]) => ({
        name,
        value,
      }));
      hashtableMemberHoursConstruct[memberName] = tasksArray;
    });
    setHashtableMemberHours(hashtableMemberHoursConstruct);

    let hashtableTribe = {};
    if (sessions) {
      sessions.forEach((session) => {
        const memberTribeName = session.member?.tribe?.name;
        const duration = session.duration;

        if (memberTribeName !== undefined) {
          if (!hashtableTribe[memberTribeName]) {
            hashtableTribe[memberTribeName] = duration;
          } else {
            hashtableTribe[memberTribeName] += duration;
          }
        }
      });
    }

    if (aditionalHours) {
      aditionalHours.forEach((aditionalHour) => {
        const memberTribeName = aditionalHour.member?.tribe?.name;
        const amount = aditionalHour.amount;

        if (memberTribeName !== undefined) {
          if (!hashtableTribe[memberTribeName]) {
            hashtableTribe[memberTribeName] = amount;
          } else {
            hashtableTribe[memberTribeName] += amount;
          }
        }
      });
    }
    setTribeArray(
      Object.entries(hashtableTribe).map(([key, value]) => ({ key, value }))
    );
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
        <TrackingTable
          sessions={sessionsData}
          hashtableMemberHours={hashtableMemberHours}
        />
        <TribeTable tribes={tribeArray} />
      </ContainerTable>
    </>
  );
};

export default SessionHistory;

