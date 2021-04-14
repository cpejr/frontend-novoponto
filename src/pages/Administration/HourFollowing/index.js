import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { SelectInput } from "../../../components/atoms";
import MemberDataADM from "../../../components/organisms/MemberDataADM";
import { message } from "antd";

import { HourFollowingContainer } from "./styles";

const GET_MEMBERS = gql`
  query GetMembers {
    members {
      name
      _id
      message
      responsible {
        name
      }
      role {
        name
      }
    }
  }
`;

const UPDATE_MEMBER = gql`
  mutation UPDATE_MEMBER($memberId: ID!, $data: MemberUpdate) {
    updateMember(memberId: $memberId, data: $data) {
      message
    }
  }
`;

const HourFollowing = () => {
  const [selected, setSelected] = useState();

  const selectMember = (memberSelected) => {
    var index = members.map((member) => member.name).indexOf(memberSelected);
    setSelected(members[index]);
  };

  const saveData = async (newMessage) => {
    var hide = message.loading("Salvando");
		try{
			await updateMember({
				variables: { memberId: selected._id, data: { message: newMessage } },
			});
			hide();
			message.success("Salvo com sucesso", 2.5);
			refetch();
		}
		catch (err) {
			console.log(err);
			message.error("Houve um problema, tente novamente", 2.5);
		}
  };

  const [updateMember] = useMutation(UPDATE_MEMBER);
  const { loading, error, data, refetch } = useQuery(GET_MEMBERS);

  if (loading) return "Loading...";
  else if (error) return `Error! ${error.message}`;
  else if (data) {
    var members = data.members;
    return (
      <HourFollowingContainer>
        <SelectInput
          options={members.map((member) => member.name)}
          callback={selectMember}
        />
        {selected && (
          <MemberDataADM
            name={selected.name}
            responsable={
              selected.responsible ? selected.responsible.name : "Indefinido"
            }
            role={selected.role ? selected.role.name : "Indefinido"}
            initMessage={selected.message}
            callback={saveData}
          />
        )}
      </HourFollowingContainer>
    );
  }
};

export default HourFollowing;
