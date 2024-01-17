import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { SessionContext } from "../../context/SessionProvider";
import { OutlinedBox } from "../../components/atoms";
import MemberProfile from "../../components/organisms/MemberProfile";
import useGoogleAuth from "../../services/firebase";

import MemberHistory from "../../components/organisms/MemberHistory";

import { ProfileComponent } from "./styles";
import { FetchCompiledForHC } from "../../graphql/Member";
import moment from "moment";
import { useLazyQuery } from "@apollo/client";

const CardView = () => {
  const { themeColors } = useContext(ThemeContext);
  const { data, updateSelf, getSessionData } = useContext(SessionContext);
  const { googleLogout } = useGoogleAuth();
  const [rangeDate, setRangeDate] = useState([
    moment().startOf("isoWeek"),
    moment().endOf("day"),
  ]);

  const { member } = data || {};
  const startDate = rangeDate && rangeDate[0];
  const endDate = rangeDate && rangeDate[1];

  const [loadCompiled, { loading, data : dataSessions, error, refetch }] = useLazyQuery(FetchCompiledForHC, {
    fetchPolicy: "network-only",
  });

  async function loadData() {
    loadCompiled({
      variables: {
        memberId: member._id,
        startDate: moment(startDate)?.startOf("day").toISOString(),
        endDate: moment(endDate)?.endOf("day").toISOString(),
      },
    });
  }

  useEffect(() => {
    if (!!data) getSessionData();
    if (data && !data?.member?.message?.read)
      updateSelf({
        message: { read: true, text: data?.member?.message?.text },
      });
  }, []);

  return (
    <div>
      <ProfileComponent theme={themeColors} className="">
        <OutlinedBox className="outlinedBox">
          <MemberProfile
            onLogOut={googleLogout}
            onSave={updateSelf}
            member={data?.member}
            refetch={refetch}
          />
        </OutlinedBox>
      </ProfileComponent>

      <div className="mt-4 d-flex flex-column m-lg-5">
        <MemberHistory memberId={member?._id} rangeDate={rangeDate} data={dataSessions}
        setRangeDate={setRangeDate} loadData={loadData} loading={loading} refetch={refetch} />
      </div>
    </div>
  );
};

export default CardView;
