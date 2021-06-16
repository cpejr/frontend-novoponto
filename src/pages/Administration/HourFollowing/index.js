import React, { useContext, useState } from "react";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import { useMutation } from "@apollo/client";
import { UpdateMember } from "../../../graphql/Member";

import { message, Skeleton } from "antd";
import { HourFollowingContainer } from "./styles";
import MembersSelectBox from "../../../components/molecules/MembersSelectBox";
import MemberProfile from "../../../components/organisms/MemberProfile";
import { OutlinedBox } from "../../../components/atoms";
import MemberHistory from "../../../components/organisms/MemberHistory";

const HourFollowing = () => {
  const [selected, setSelected] = useState();

  const [updateMember] = useMutation(UpdateMember);
  const { membersLoading, membersError, membersData, refetchMembers } =
    useContext(GlobalsContext);

  const selectMember = (memberId) => {
    const member = membersData.members.find(
      (member) => member._id === memberId
    );

    setSelected(member);
  };

  const saveData = async (newFields) => {
    var hide = message.loading("Salvando");
    try {
      await updateMember({
        variables: { memberId: selected._id, data: newFields },
      });
      hide();
      message.success("Salvo com sucesso", 2.5);
      refetchMembers();
    } catch (err) {
      console.log(err);
      message.error("Houve um problema, tente novamente", 2.5);
    }
  };

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
      <HourFollowingContainer className="container">
        <div className="select">
          <MembersSelectBox onChange={selectMember} />
        </div>
        {selected && (
          <>
            <OutlinedBox className="outlinedBox mt-4">
              <MemberProfile
                member={selected}
                showAsAdministrator
                onSave={saveData}
              />
            </OutlinedBox>
            <div className="mt-4 d-flex flex-column">
              <MemberHistory memberId={selected?._id} />
            </div>
          </>
        )}
      </HourFollowingContainer>
    );
  }
};

export default HourFollowing;
