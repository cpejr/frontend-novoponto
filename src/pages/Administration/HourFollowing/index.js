import React, { useContext, useEffect, useState } from "react";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UpdateMember } from "../../../graphql/Member";
import { AditionalHours } from "../../../graphql/AditionalHour";
import moment from "moment";

import MemberDataADM from "../../../components/organisms/MemberDataADM";

import { message, Skeleton, DatePicker } from "antd";
import { HourFollowingContainer } from "./styles";
import HomeOfficeTable from "../../../components/molecules/HomeOfficeTable";
import MembersSelectBox from "../../../components/molecules/MembersSelectBox";

const { RangePicker } = DatePicker;

const HourFollowing = () => {
  const [selected, setSelected] = useState();

  const [loadAdditional, { data }] = useLazyQuery(AditionalHours, {
    fetchPolicy: "network-only",
  });

  const aditionalHours = data?.aditionalHours || [];

  const [rangeDate, setRangeDate] = useState([
    moment().startOf("isoWeek"),
    moment(),
  ]);
  const startDate = rangeDate && rangeDate[0];
  const endDate = rangeDate && rangeDate[1];

  const [updateMember] = useMutation(UpdateMember);
  const {
    membersLoading,
    membersError,
    membersData,
    refetchMembers,
  } = useContext(GlobalsContext);

  const selectMember = (memberId) => {
    const member = membersData.members.find(
      (member) => member._id === memberId
    );

    setSelected(member);
  };

  const saveData = async (newMessage) => {
    var hide = message.loading("Salvando");
    try {
      await updateMember({
        variables: { memberId: selected._id, data: { message: newMessage } },
      });
      hide();
      message.success("Salvo com sucesso", 2.5);
      refetchMembers();
    } catch (err) {
      console.log(err);
      message.error("Houve um problema, tente novamente", 2.5);
    }
  };

  function loadData() {
    return loadAdditional({
      variables: {
        memberId: selected._id,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      },
    });
  }

  useEffect(() => {
    if (startDate && endDate && selected) loadData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, rangeDate]);

  if (membersLoading)
    return (
      <Skeleton
        paragraph={{ rows: 4 }}
        size={"large"}
        active={membersLoading}
        loading={membersLoading}
      />
    );
  else if (membersError) {
    console.log(membersError);
    message.error("Houve um problema, tente recarregar a pagina", 2.5);
    return <h1>Erro, recarregue a pagina</h1>;
  } else if (membersData) {
    return (
      <HourFollowingContainer>
        <MembersSelectBox onChange={selectMember} />
        {selected && (
          <>
            <MemberDataADM
              name={selected.name}
              responsable={
                selected.responsible ? selected.responsible.name : "Indefinido"
              }
              role={selected.role ? selected.role.name : "Indefinido"}
              initMessage={selected.message}
              callback={saveData}
            />
            <RangePicker
              format="DD-MM-yyyy"
              onChange={setRangeDate}
              value={rangeDate}
              placeholder={["Inicio", "Fim"]}
            />
            <HomeOfficeTable
              aditionalHours={aditionalHours}
              onDelete={loadData}
            />
          </>
        )}
      </HourFollowingContainer>
    );
  }
};

export default HourFollowing;
