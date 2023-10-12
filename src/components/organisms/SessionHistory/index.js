import { DatePicker } from "antd";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { ALL_SESSIONS } from "../../../graphql/Sessions";
import { useLazyQuery } from "@apollo/client";
import { ThemeContext } from "../../../context/ThemeProvider";
import { HourDisplayer } from "../../atoms";
import { ContainerTable, HeadTable, HourDisplay, SumTotalTitle } from "./styles";
import TrackingTable from "../../molecules/TrackingTable";
import TribeTable from "../../molecules/TribeTable";
const { RangePicker } = DatePicker;

const SessionHistory = () => {
  const { themeColors } = useContext(ThemeContext);

  const [hashtableArray, setHashtableArray] = useState([]);
  const [sessionsData, setSessionsData] = useState();
  const [formatedTotalData, setFormatedTotalData] = useState();

  const today = moment();
  const fourWeeksAgo = moment().subtract(4, 'weeks');

  const [rangeDate, setRangeDate] = useState([
    fourWeeksAgo.startOf('day'),
    today.endOf('day'),
  ]);

  const startDate = rangeDate && rangeDate[0];
  const endDate = rangeDate && rangeDate[1];

  function disabledDate(current) {
    return current && current > moment().endOf("day");
  }

  const [loadCompiled, { loading, data, error, refetch }] = useLazyQuery(ALL_SESSIONS, {
    variables: {
      startDate: moment(startDate)?.startOf("day").toISOString(),
      endDate: moment(endDate)?.endOf("day").toISOString(),
    }
  });

  const {sessions, formatedTotal } =
        data?.allSessions || {};


  function loadData() {
      loadCompiled({
        variables: {
          startDate: moment(startDate)?.startOf("day").toISOString(),
          endDate: moment(endDate)?.endOf("day").toISOString(),
        },
      });

      setSessionsData();
      setFormatedTotalData();
  }

  function loadingData() {
    setSessionsData(sessions);
    setFormatedTotalData(formatedTotal);

  
    if (sessions) {
      let hashtable = {};
      sessions.map(v => {
        if (v.member?.tribe?.name !== undefined) {
          if (hashtable[v.member?.tribe?.name] === undefined) {
            hashtable[v.member?.tribe?.name] = v.duration;
          } else {
            hashtable[v.member?.tribe?.name] += v.duration;
          }
        }
    });
    setHashtableArray(Object.entries(hashtable).map(([key, value]) => ({ key, value })));
    }
  }

 
  useEffect(() => {
    loadData();
  }, [rangeDate]);

  useEffect(() => {
    setTimeout(loadingData, 500)
  }, [data]);

  return (
    <>
      <ContainerTable>
      <HeadTable>
        <HourDisplay>
          <SumTotalTitle>Soma total:</SumTotalTitle>
          {formatedTotalData && (
            <HourDisplayer text={formatedTotalData} hourColor={themeColors.yellow} />
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
      <TribeTable tribes={hashtableArray} />
      </ContainerTable>
    </>
  )
};

export default SessionHistory;